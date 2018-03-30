// Type definitions for @webpack-blocks/typescript 1.0.0
// Project: webpack-blocks
// Definitions by: Stephan Schneider <https://github.com/zcei>

import { Block } from '@webpack-blocks/core'

import { LoaderConfig } from 'awesome-typescript-loader/dist/interfaces'

declare function typescript (options: LoaderConfig): Block
export = typescript
