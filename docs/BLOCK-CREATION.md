# How to Write a Webpack Block

This guide is going to show you how to create a custom webpack block. Don't worry, it's not hard!

Skip the *Hooks* section if you are in a hurry. You can create a lot of cool stuff without using them.


## Basics

A webpack block is *just a function* that returns a webpack config snippet and *requires no dependencies at all*.

Take the `babel6` webpack block for instance:

```js
/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function babel (options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (context) => ({
    module: {
      loaders: [
        {
          // we use a `MIME type => RegExp` abstraction here in order to have consistent regexs
          test: context.fileType('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel?cacheDirectory' ]
        }
      ]
    }
  })
}
```

Thus it is also super easy to unit test and generic enough to share it with the world.


## Context

The context object is an additional metadata object that is passed to every block. It is meant to contain any kind of data that is needed for webpack config creation, but not part of the webpack config itself.

Initially it will only contain the `fileType` mapping. If you are using [hooks](#hooks) you might want to put custom metadata into the context and use it in the `post` hook. If you are not using hooks you do not have to care about the context object, except for the `fileType`.

The `fileType` are a mapping from MIME type (`application/javascript`, `text/css`, ...) to a regular expression used for matching filenames. You can find the default file types and the extensions they match [here](https://github.com/andywer/webpack-blocks/blob/master/packages/core/src/defaultFileTypes.js).

To add a new `fileType` you can use the `fileType.add()` function. See its usage in the `typescript` block:
```
function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
```
__Every__ block using mime types that are not already in `core/src/defaultFileTypes.js` is __required__ to have a similar [Hook](#Hooks). If it is a rather common file type, you can add it to the `defaultFileTypes` *too*. That way, you are not required to update `@webpack-blocks/core` to use new blocks.

Additionally the `context` has a webpack object, so you do not have to `require('webpack')`, you can use `context.webpack`.


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

function postHook (context, config) {
  return { /* webpack config snippet */ }
}
```

Both `pre` and `post` hooks are optional and can either be a function or an array of functions.

Let's solve our constants definition example. We can now make the `blockFunction` store the constants in the `context` and make the `postHook` instantiate the DefinePlugin:

```js
function defineConstants (constants) {
  return Object.assign((context) => {
    context.defineConstants = Object.assign({}, context.defineConstants, constants)
    return {}
  }, { post })
}

function post (context) {
  return {
    plugins: [
      new webpack.DefinePlugin(context.defineConstants)
    ]
  }
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
