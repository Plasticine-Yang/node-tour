import { readFile } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const ROOT_PATH = fileURLToPath(new URL('../../../', import.meta.url))
const DATA_JSON_PATH = resolve(
  ROOT_PATH,
  'packages/bullshit-generator/corpus/data.json',
)

const getCorpusData = () => {
  return new Promise((resolve, reject) => {
    readFile(DATA_JSON_PATH, { encoding: 'utf-8' }, (err, data) => {
      if (!err) {
        resolve(JSON.parse(data))
      } else {
        reject(new Error(`Read corpus data error: ${err}`))
      }
    })
  })
}

export { getCorpusData }
