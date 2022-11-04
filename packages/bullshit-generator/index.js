import { getCorpusData } from './lib/corpus/index.js'
import { genSentence } from './lib/generator/index.js'
import { createRandomPicker } from './lib/random/index.js'

const main = async () => {
  try {
    const corpusData = await getCorpusData()
    // 从语料库中读取各个句子成分数据
    const { titles, famousQuotes, said, preBullshits, bullshits, conclusions } =
      corpusData

    // 生成对应的 pickFn
    const [
      pickTitle,
      pickFamousQuote,
      pickSaid,
      pickPreBullshit,
      pickBullshit,
      pickConclusion,
    ] = [titles, famousQuotes, said, preBullshits, bullshits, conclusions].map(
      createRandomPicker,
    )

    const famousQuote = genSentence(pickFamousQuote, {
      said: pickSaid,
      conclusion: pickConclusion,
    })

    const bullshit = genSentence(pickBullshit, { title: pickTitle })

    console.log(`famousQuote: ${famousQuote}`)
    console.log(`bullshit: ${bullshit}`)
  } catch (error) {
    console.error(error)
  }
}

main()
