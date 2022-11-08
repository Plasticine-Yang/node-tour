/**
 * @description 交互式生成废话文章
 * @param { Array<{question: string, defaultValue: string | number}> } questionList 问题对象数组
 */
function interact(questionList) {
  // 记录原来的编码格式
  const originalReadableEncoding = process.stdin.readableEncoding

  // 设置成 utf-8 以支持中文
  process.stdin.setEncoding('utf-8')

  return new Promise(resolve => {
    /**
     * @description 用户输入的关于 questionList 的回答
     * @type { string[] }
     */
    const inputAnswers = []

    // 记录当前处理到第几个问题
    let questionIdx = 0

    let { question, defaultValue } = questionList.at(questionIdx++)

    if (question) {
      console.log(`${question}(默认值: ${defaultValue})`)

      process.stdin.on('readable', () => {
        const chunk = process.stdin.read().slice(0, -1)

        inputAnswers.push(chunk || defaultValue)

        // 继续处理下一个问题
        const nextQuestion = questionList.at(questionIdx++)
        if (nextQuestion) {
          process.stdin.read()
          question = nextQuestion.question
          defaultValue = nextQuestion.defaultValue
          console.log(`${question}(默认值: ${defaultValue})`)
        } else {
          process.stdin.setEncoding(originalReadableEncoding)
          resolve(inputAnswers)
        }
      })
    }
  })
}

export { interact }
