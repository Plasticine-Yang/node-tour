import { getCorpusData } from './lib/corpus/index.js'
import { genSection } from './lib/generator/index.js'

const main = async () => {
  try {
    const corpusData = await getCorpusData()
    const section = genSection('要相信光', corpusData)
    console.log(section)
  } catch (error) {
    console.error(error)
  }
}

main()
