import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const ROOT_PATH = fileURLToPath(new URL('.', import.meta.url))

const require = createRequire(ROOT_PATH)
const PKG = require('./package.json')

export { ROOT_PATH, PKG }
