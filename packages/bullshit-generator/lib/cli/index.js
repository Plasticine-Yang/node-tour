import cac from 'cac'

import { loadCorpus, saveCorpus } from '../corpus/index.js'
import { genArticle } from '../generator/index.js'
import { createRandomPicker } from '../random/index.js'

import { PKG } from '../../constants.js'

function setupCLI() {
  const cli = cac('bullshit-generator')

  // command: generate
  cli
    .command('generate', 'Generate bullshit article')
    .option('-t, --title <title>', 'The title of bullshit article')
    .option('--min <min>', 'Minium number of words')
    .option('--max <max>', 'Maxium number of words')
    .action(async ({ title, min, max }) => {
      try {
        const corpusData = await loadCorpus('corpus/data.json')
        const pickTitle = createRandomPicker(corpusData.titles)

        title = title ?? pickTitle()
        const article = genArticle(title, { corpusData, min, max })
        const outputFilePath = await saveCorpus(title, article)

        console.log(`废话文章: 《${title}》生成成功！`)
        console.log(`保存路径: ${outputFilePath}`)
      } catch (error) {
        console.error(error)
      }
    })

  cli.help()
  cli.version(PKG.version)

  cli.parse()
}

export { setupCLI }
