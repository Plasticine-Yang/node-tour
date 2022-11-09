import { genArticle } from '../lib/generator/index.js'
import { createRandomPicker } from '../lib/random/index.js'

const loadCorpusData = async (
  corpusUrl,
  defaultCorpusDataUrl = '../corpus/data.json',
) => {
  return await (await fetch(corpusUrl ?? defaultCorpusDataUrl)).json()
}

window.bullshitGenerator = { genArticle, createRandomPicker, loadCorpusData }
