import { createRandomPicker, randomInt } from '../random/index.js'
import { genSentence } from './sentence.js'

function genSection(title, corpusData) {
  let section = ''
  const sectionLength = randomInt(200, 500)

  // 从语料库中读取各个句子成分数据
  const { famousQuotes, said, preBullshits, bullshits, conclusions } =
    corpusData

  // 生成对应的 pickFn
  const [
    pickFamousQuote,
    pickSaid,
    pickPreBullshit,
    pickBullshit,
    pickConclusion,
  ] = [famousQuotes, said, preBullshits, bullshits, conclusions].map(
    createRandomPicker,
  )

  // 段落长度需要维持在 sectionLength 中 并且得要是以`。`或`？`结尾才算是完整
  while (section.length < sectionLength || !/[。？]$/.test(section)) {
    // 20% 生成名人名言 30% 生成带有前置从句的废话 50% 生成废话
    const n = randomInt(0, 100)
    if (n < 20) {
      // 名人名言
      section += genSentence(pickFamousQuote, {
        said: pickSaid,
        conslusion: pickConclusion,
      })
    } else if (n < 50) {
      // 前置从句的废话 + 废话
      section +=
        genSentence(pickPreBullshit, { title }) +
        genSentence(pickBullshit, { title })
    } else {
      // 废话
      section += genSentence(pickBullshit, { title })
    }
  }

  return section
}

export { genSection }
