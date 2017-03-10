const { group } = require('@webpack-blocks/core')
const HappyPack = require('happypack');
const os = require('os');

module.exports = happypack

function happypack(blocks, configs = {}) {
  return group(blocks.map((block) => happyfyBlock(block, configs)))
}

/**
 * Returns a new block wrapping `block` that creates a happypack loader config.
 */
function happyfyBlock(block, config) {
  const happyBlock = happyfySetter(block, config)
  const pre = toArray(block.pre)
  const post = toArray(block.post).map(postHook => happyfySetter(postHook, config))

  return Object.assign(happyBlock, { pre, post })
}

/**
 * Takes a block or a post hook and returns a wrapping function that creates a happypack loader config.
 */
function happyfySetter(setter, happypackConfig) {
  return (context, config) => happyfyConfig(setter(context, config), context, happypackConfig)
}

/**
 * Transforms a non-happypack loader config into a happypack loader config.
 */
function happyfyConfig(configSnippet, _, happypackConfig) {
  if (configSnippet.module && configSnippet.module.loaders) {
    const plugins = [];
    const loaders = configSnippet.module.loaders.map((loader, id) => {
      const happypackplugin = new HappyPack(Object.assign({
        id: `loader${id}`,
        loaders: loader.loaders,
        threads: os.cpus().length,
      }, happypackConfig));

      plugins.push(happypackplugin);

      return {
        test: loader.test,
        loader: `happypack/loader?id=loader${id}`,
        exclude: loader.exclude || [],
      }
    });

    return {
      module: {
        loaders,
      },
      plugins,
    }
  }
  return {};
}

/**
 * Takes an array, a function or something falsy and returns the array, the
 * function wrapped in an array or an empty array, respectively.
 */
function toArray(value) {
  if (value) {
    return Array.isArray(value) ? value : [value]
  } else {
    return []
  }
}
