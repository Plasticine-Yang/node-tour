/**
 * @description 生成句子
 * @param {Function} pickFn 从语料库中随机选取句子的函数
 * @param {Object} replacer 用于模板替换的对象
 */
function genSentence(pickFn, replacer) {
  // 获取随机句子
  let res = pickFn()

  // 遍历 replacer 的 key 替换 res
  for (const [key, valueOrFn] of Object.entries(replacer)) {
    res = res.replace(
      new RegExp(`{{${key}}}`, 'g'),
      typeof valueOrFn === 'function' ? valueOrFn() : valueOrFn,
    )
  }

  return res
}

export { genSentence }
