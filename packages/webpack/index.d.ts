// Type definitions for @webpack-blocks/webpack 1.0.0
// Project: webpack-blocks
// Definitions by: Stephan Schneider <https://github.com/zcei>

import {
  createConfig,
  group,
  env,
  match,
  Block,
  WebpackConfigUpdater
} from '@webpack-blocks/core'
import { Configuration, Plugin, Entry, Options, Resolve, Output } from 'webpack'
export { createConfig, group, env, match }

export function addPlugins(plugins: Plugin[]): Block
export function customConfig(configSnippet: Configuration): Block
export function defineConstants(constants: { [key: string]: any }): Block
export function setEnv(envs: string[] | { [key: string]: any }): Block
// TODO: support EntryFunc
export function entryPoint(entry: string | string[] | Entry): Block
export function performance(perfBudgetOptions: Options.Performance): Block
export function resolve(config: Resolve): Block
export function setContext(path: string): Block
export function setDevTool(devtool: Options.Devtool): Block
export function setOutput(output: string | Output): Block
export function sourceMaps(devtool?: Options.Devtool): Block
