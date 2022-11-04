import { getCorpusData } from './corpus/index.js'
import { createRandomPicker } from './lib/random/index.js'

const main = async () => {
  try {
    const corpusData = await getCorpusData()
    const arr = corpusData.titles
    const randomPick = createRandomPicker(arr)

    arr.forEach(() => {
      console.log(randomPick(arr))
    })
  } catch (error) {
    console.error(error)
  }
}

main()
