import { access, mkdir, writeFile } from 'fs/promises'
import { resolve } from 'path'

import moment from 'moment'

import { ROOT_PATH } from '../../constants.js'

/**
 * @description 保存根据物料生成的废话文章
 * @param {string} title 标题
 * @param {Array<string>} article 文章段落数组
 */
async function saveCorpus(title, article) {
  const time = moment().format('-YYYY-MM-DD-HH:mm:ss')
  const outputDir = resolve(ROOT_PATH, 'output')
  const outputFilePath = resolve(outputDir, `${title}${time}.txt`)

  // 保证 output 目录存在
  try {
    await access(outputDir)
  } catch (e) {
    await mkdir(outputDir)
  }

  const text = `${title}\n\n    ${article.join('\n    ')}`

  try {
    await writeFile(outputFilePath, text)
  } catch (error) {
    console.error(`Save corpus: ${outputFilePath} failed -- ${error}`)
  }

  return outputFilePath
}

export { saveCorpus }
