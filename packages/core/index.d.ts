// Type definitions for @webpack-blocks/core 1.0.0
// Project: webpack-blocks
// Definitions by: Stephan Schneider <https://github.com/zcei>

import { Configuration as WebpackConfig, Condition, Rule, Plugin } from 'webpack'

export function createConfig(configSetter: Block[]): object
export function group(configSetters: Block[]): Block
export function env(envName: string, configSetters: Block[]): Block
export function match(test: Condition | Condition[], configSetters: Block[]): Block
export function when(condition: boolean, configSetter: Block[]): Block

export interface BlockCreator {
  (...args: any[]): Block
}

export interface Block {
  (context: Object, util: WebpackBlockUtils): WebpackConfigUpdater
}

export interface WebpackConfigUpdater {
  (previousConfig: WebpackConfig): WebpackConfig
}

/*~ You can declare types that are available via importing the module */
export interface WebpackBlockUtils {
    merge: (configSnippet: WebpackConfig) => WebpackConfigUpdater
    addLoader: (loader: Rule) => WebpackConfigUpdater
    addPlugin: (plugin: Plugin) => WebpackConfigUpdater
}
