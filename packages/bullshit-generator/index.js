import { getCorpusData } from './lib/corpus/index.js'
import { genArticle } from './lib/generator/index.js'

const main = async () => {
  try {
    const corpusData = await getCorpusData()
    const article = genArticle('要相信光', { corpusData })
    console.log(article)
  } catch (error) {
    console.error(error)
  }
}

main()
