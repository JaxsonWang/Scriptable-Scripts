import { homedir } from 'os'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import obfuscator from 'rollup-plugin-obfuscator'

const scriptFile = process.env.FILE
const scriptName = process.env.NAME
const isPro = process.env.NODE_ENV === 'production'
const color = process.env.COLOR || 'teal'
const glyph = process.env.GLYPH || 'car-side'

const bannerPro = `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: ${color}; icon-glyph: ${glyph};
//
// 提示：本插件永久免费，不会在各大论坛、抖音、小红书以及闲鱼等平台发布，也不会存在收费教程指导，本小组件永久免费！
// author: 淮城一只猫

`

const devPath = `${homedir()}/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/${scriptName}.js`

export default {
  input: `src/${scriptFile}.ts`,
  output: [
    {
      file: isPro ? `dist/${scriptName}.js` : devPath,
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    typescript(),
    isPro && terser(),
    isPro &&
      obfuscator({
        options: {
          // Your javascript-obfuscator options here
          // Will be applied on each file separately.
          // See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false,
          debugProtectionInterval: 0,
          disableConsoleOutput: false,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          numbersToExpressions: false,
          renameGlobals: false,
          selfDefending: false,
          simplify: true,
          splitStrings: false,
          stringArray: true,
          stringArrayCallsTransform: false,
          stringArrayCallsTransformThreshold: 0.5,
          stringArrayEncoding: [],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 1,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 2,
          stringArrayWrappersType: 'variable',
          stringArrayThreshold: 0.75,
          unicodeEscapeSequence: false
        }
      }),
    banner2(() => (isPro ? bannerPro : ''))
  ]
}
