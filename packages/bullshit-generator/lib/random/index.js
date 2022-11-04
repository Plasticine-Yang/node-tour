/**
 * @description 生成 [min, max) 之间的随机整数
 * @param {number} min 随机数最小值
 * @param {number} max 随机数最大值
 * @returns [min, max) 之间的随机整数
 */
function randomInt(min, max) {
  const p = Math.random()
  return Math.floor(min * (1 - p) + max * p)
}

/**
 * @description 从数组中随机挑选一个元素
 * @param {Array} arr 数组
 * @returns 数组的随机元素
 */
function createRandomPicker(arr) {
  // 拷贝原数组
  const _arr = [...arr]

  const randomPick = () => {
    // 选取元素时跳过数组末尾元素
    const len = _arr.length - 1
    const randomIdx = randomInt(0, len)

    // 将本轮选取的元素交换到数组末尾
    ;[_arr[len], _arr[randomIdx]] = [_arr[randomIdx], _arr[len]]

    return _arr[randomIdx]
  }
  randomPick()

  return randomPick
}

export { randomInt, createRandomPicker }
