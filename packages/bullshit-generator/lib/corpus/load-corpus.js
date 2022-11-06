import { readFile } from 'fs'
import { resolve } from 'path'

import { ROOT_PATH } from '../../constants.js'

/**
 * @returns {Promise<Corpus>} 物料数据
 */
function loadCorpus(corpusPath) {
  const dataPath = resolve(ROOT_PATH, corpusPath)
  return new Promise((resolve, reject) => {
    readFile(dataPath, { encoding: 'utf-8' }, (err, data) => {
      if (!err) {
        resolve(JSON.parse(data))
      } else {
        reject(new Error(`Read corpus data error: ${err}`))
      }
    })
  })
}

export { loadCorpus }
