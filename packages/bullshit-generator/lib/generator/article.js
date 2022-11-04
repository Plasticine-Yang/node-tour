import { randomInt } from '../random/index.js'
import { genSection } from './section.js'

/**
 * @description 生成文章
 * @param {string} title 文章标题
 * @param {Object} options 配置对象 用于配置语料库 文章最少字数 文章最多字数
 * @returns {Array<string>} 以段落数组的方式返回文章
 */
function genArticle(title, { corpusData, min = 6000, max = 10000 } = {}) {
  // 生成文章的长度
  const articleLength = randomInt(min, max)
  const article = []

  let totalLength = 0

  while (totalLength < articleLength) {
    const section = genSection(title, corpusData)
    totalLength += section.length
    article.push(section)
  }

  return article
}

export { genArticle }
