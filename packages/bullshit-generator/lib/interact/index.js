import readline from 'readline'

/**
 * @description 交互式生成废话文章
 * @param { Array<{question: string, defaultValue: string | number}> } questionList 问题对象数组
 */
async function interact(questionList) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const questionPromise = ({ question, defaultValue }) => {
    const query = `${question}(默认值: ${defaultValue})\n`
    return new Promise(resolve => {
      rl.question(query, answer => {
        resolve(answer || defaultValue)
      })
    })
  }

  const answers = []
  for (const question of questionList) {
    const answer = await questionPromise(question)
    answers.push(answer)
  }

  rl.close()

  return answers
}

export { interact }
