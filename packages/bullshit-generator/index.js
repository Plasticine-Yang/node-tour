import { getCorpusData } from './corpus/index.js'

getCorpusData()
  .then(data => {
    console.log(data)
  })
  .catch(reason => {
    console.log(reason)
  })
