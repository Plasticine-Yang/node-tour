import { loadCorpus, saveCorpus } from './lib/corpus/index.js'
import { genArticle } from './lib/generator/index.js'
import { createRandomPicker } from './lib/random/index.js'

const main = async () => {
  try {
    const corpusData = await loadCorpus('corpus/data.json')
    const pickTitle = createRandomPicker(corpusData.titles)
    const title = pickTitle()
    const article = genArticle(title, { corpusData })

    saveCorpus(title, article)
  } catch (error) {
    console.error(error)
  }
}

main()
