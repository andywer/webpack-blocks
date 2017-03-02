# How to Write a Webpack Block

This guide is going to show you how to create a custom webpack block. Don't worry, it's not hard!

Skip the *Hooks* section if you are in a hurry. You can create a lot of cool stuff without using them.


## Basics

A webpack block is *just a function* that returns an update function and *requires no dependencies at all*. The update function takes a webpack configuration object and returns an updated version of this webpack configuration.

Take the `babel6` webpack block for instance:

```js
/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function babel (options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (context, util) => prevConfig => ({
    ...prevConfig,
    module: {
      ...prevConfig.module,
      loaders: prevConfig.module.loaders.concat([
        {
          // we use a `MIME type => RegExp` abstraction here in order to have consistent regexs
          test: context.fileType('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel?cacheDirectory' ]
        }
      ])
    }
  })
}
```

Thus it is also super easy to unit test and generic enough to share it with the world.


## Block utilities

You might have recognized the second paramter `util` in the last example's block function. It is an object containing some convenience functions to make common tasks easier.

#### util.addLoader(loaderDefinition: object)

Returns an update function that adds the given loader definition to a webpack configuration. Use it like this:

```js
function sampleBlock () {
  return (context, { addLoader }) => addLoader({
    test: context.fileType('text/css'),
    loaders: [ 'style-loader', 'css-loader' ]
  })
}
```

#### util.addPlugin(plugin: WebpackPlugin)

Returns an update function that adds the given plugin instance to a webpack configuration. Use it like this:

```js
function sampleBlock () {
  return (context, { addPlugin }) => addPlugin(
    new webpack.DefinePlugin({ 'DEBUG': 'true' })
  )
}
```

#### util.merge(configSnippet: object)

Returns an update function that merges the given configuration snippet into a webpack configuration. Use it like this:

```js
function sampleBlock () {
  return (context, { merge }) => merge({
    resolve: {
      extensions: ['ts']
    }
  })
}
```


## Context

The context object is an additional metadata object that is passed to every block. It is meant to contain any kind of data that is needed for webpack config creation, but not part of the webpack config itself.

Initially it will contain the `fileType` mapping and a `webpack` instance. If you are using [hooks](#hooks) you might want to put custom metadata into the context and use it in the `post` hook.

The `context.fileType` is a mapping from MIME type (`application/javascript`, `text/css`, ...) to a regular expression used for matching filenames. You can find the default file types and the extensions they match [here](https://github.com/andywer/webpack-blocks/blob/master/packages/core/src/defaultFileTypes.js).

The `context.webpack` property is the webpack instance, so you do not have to `require('webpack')` in your blocks. Use `context.webpack` instead.

### Adding custom file types

To add a new `fileType` you can use the `fileType.add(mimeType: string, regex: RegExp)` function. See its usage in the `typescript` block:

```
function preHook (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
```

Every block using MIME types that are not already defined in `core/src/defaultFileTypes.js` needs to have a similar pre [hook](#Hooks) to register its custom types. If it is a rather common file type feel free to open a pull request for adding it to the `defaultFileTypes` as well.


## Hooks

Sometimes the simple *a block is a function* approach is not enough. Let's take the following example:

You want to define constants using the `webpack.DefinePlugin`. The DefinePlugin will run over your source files, look for occurences of the constants you defined and replace them by the value you set.

Sounds good. But wait... What if multiple blocks want to define constants using the DefinePlugin independently? You can write a tiny block `defineConstants` which takes the constants and creates a webpack snippet containing a configured DefinePlugin.

The problem is that using this block multiple times will result in multiple instances of the DefinePlugin! This is not what we want. We would like to define constants multiple times, store them somewhere and eventually add a single DefinePlugin instance for all those constants to the webpack config. *And this is where the hooks enter the stage.*

### So what is it?

Every block may have one or multiple `pre` hooks and one or multiple `post` hooks. You can set them like that:

```js
function myBlock () {
  const blockFunction = (context, config) => ({ /* webpack config snippet */ })

  return Object.assign(blockFunction, {
    pre: preHook,
    post: postHook
  })
}

function preHook (context) {
  // Manipulate the `context` here (register a new file type, for example)
}

function postHook (context, util) {
  return config => config   // Return your update function here
}
```

Both `pre` and `post` hooks are optional and can either be a function or an array of functions.

Let's solve our constants definition example. We can now make the `blockFunction` store the constants in the `context` and make the `postHook` instantiate the DefinePlugin:

```js
function defineConstants (constants) {
  return Object.assign((context) => {
    context.defineConstants = Object.assign({}, context.defineConstants, constants)
    return config => config   // Don't change the config here yet
  }, { post })
}

function post (context, { addPlugin }) {
  return addPlugin(
    new webpack.DefinePlugin(context.defineConstants)
  )
}
```

`createConfig()` will *deduplicate all hooks*, so our post hook is run once only and we end up having exactly one DefinePlugin instance containing all constant definitions.

In case you wonder, the `return Object.assign(blockFunction, { pre, post })` syntax is just syntactic sugar and semantically the same as `blockFunction.pre = pre; blockFunction.post = post; return blockFunction`.

### Lifecycle

So this is what happens under the hood when `createConfig()` processes the blocks:

- Run `pre` hooks (of all blocks)
- Run the actual block logic (of all blocks) and merge the config snippets
- Run `post` hooks (of all blocks) and merge the config snippets

That's it. The resulting merged config object is createConfig's return value.

### Best practices / Pitfalls

#### Static pre/post functions

`createConfig()` filters duplicate hooks, so you can call a block multiple times, but each of its hooks is only run once.

To make the deduplication work you have to make sure your hook functions are declared as static top-level functions as shown in the example. *Do not declare the hook functions inside your block function*, since this would mean that those hook functions are re-created on every call of the block and cannot be deduplicated.

#### Use the context for metadata

If you have got metadata that you need in a later lifecycle stage, but that is not part of the actual webpack config object then please store it in the `context` object.

That is what the context is for and making that metadata part of the webpack snippet you return is really bad practice, especially since webpack 2 is going to validate the webpack config against a fixed schema.


## Publishing

So you have written your first webpack block. Now what to do with it?

1. Write a small README
2. Add a `package.json` (add dependencies here, like loaders/plugins your block configures)
3. Open a pull request on webpack-blocks or `npm publish` your block

If you aren't sure whether your block should become part of the official webpack-blocks repository feel free to just open an issue and ask us!

Have fun.
