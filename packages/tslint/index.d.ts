// Type definitions for @webpack-blocks/tslint 1.0.0
// Project: webpack-blocks
// Definitions by: Stephan Schneider <https://github.com/zcei>

import { Block } from '@webpack-blocks/core'
import { Configuration, ILinterOptions } from 'tslint'


type TSLintLoaderOptions = ILinterOptions & {
  configuration: Configuration.IConfigurationFile
  tsConfigFile: string
  typeCheck: boolean
  emitErrors: boolean
  failOnHint: boolean
  fileOutput: {
    dir: string
    ext: string
    clean: boolean
    header: string
    footer: string
  }
}

declare function tslint(options: TSLintLoaderOptions): Block
export = tslint
