# @node-tour/bullshit-generator

狗屁不通文章生成器

# note

## 1. 如何将`readFile`读取的`Buffer`二进制数据转成文本内容？

通过`node`内置模块`fs`的`readFile`读取文件，读取到的数据默认是`Buffer`类型，也就是二进制数据，将其转成文本内容有两种方法

1. 通过调用`Buffer`对象的`toString`方法，传入第一个`encoding`可选参数指定编码格式

```js
readFile(DATA_JSON_PATH, (err, data) => {
  if (!err) {
    const decodedData = data.toString('utf-8')
    console.log(decodedData)
  } else {
    console.error('Read corpus data error:', err)
  }
})
```

> PS: toString 第一个参数`encoding`默认值为`utf8`

2. `readFile`的第二个`options`参数对象中传入`encoding`也可指定编码格式

```js
readFile(DATA_JSON_PATH, { encoding: 'utf-8' }, (err, data) => {
  if (!err) {
    console.log(data)
  } else {
    console.error('Read corpus data error:', err)
  }
})
```

## 2. 在 esm 中的 cjs `__dirname` 等价写法

```js
// foo/bar/index.js

// cjs 中 __dirname 为当前文件的工作路径
// __dirname === 'foo/bar/'

// esm 中不存在 __dirname，等价的写法如下
const __dirname = dirname(fileURLToPath(import.meta.url))
```

## 3. randomPick 如何防止连续两次选到相同元素？

如果仅仅是直接调用`randomInt`获取一个数组元素下标，然后直接选取该元素的话，有可能连续两次得到同一个随机下标，导致连续出现相同的元素

```js
function randomPick(arr) {
  const randomIdx = randomInt(0, arr.length)
  return arr[randomIdx]
}
```

### 通过闭包改进

为了避免这个问题，可以通过闭包去优化，维护一个`lastPicked`自由变量，记录上次调用`randomPick`的结果，当选到相同元素时就重新调用`randomInt`再选取数组下标

```js
let lastPicked = null
function randomPick(arr) {
  let picked = null

  do {
    const randomIdx = randomInt(0, arr.length)
    picked = arr[randomIdx]
  } while (picked === lastPicked)

  lastPicked = picked

  return picked
}
```

这样的实现有两个问题:

1. 需要维护自由变量`lastPicked`
2. 选择重复时会重新选择，增加了选择次数

### 每次选择后将元素交换到数组末尾避免重复选择

将`randomIdx`的选取范围选定为`[0, arr.length - 1)`，这样每次选择元素的时候，数组的最后一个元素都不会被选择到，可以利用这个特点，将选择过的元素交换到数组的末尾，保证其在下一次选择的时候不会被选中

```js
function randomPick(arr) {
  // 选取元素时跳过数组末尾元素
  const len = arr.length - 1
  const randomIdx = randomInt(0, len)

  // 将本轮选取的元素交换到数组末尾
  ;[arr[len], arr[randomIdx]] = [arr[randomIdx], arr[len]]

  return arr[randomIdx]
}
```

但是这样又会带来两个问题:

1. 破坏随机性 -- 第一次选取时，数组末尾的元素永远不会被选取到，而选取到的`randomIdx`又会与之交换，也就是说每次运行`randomPick`的时候，第一次选取的结果一定是数组末尾的元素

```js
const arr = [1, 2, 3, 4, 5, 6]
console.log(randomPick(arr)) // 6
```

2. 每次选取都会交换数组元素，修改了数组

### 过程抽象优化

针对上面的两个问题，可以想到下面的两个优化方案:

1. 对于上面的第一个问题，我们可以通过先运行一次`randomPick`，将第一次的确定结果丢弃
2. 而对于第二个问题，就需要我们对数组进行一次拷贝，然后`randomPick`算法操作的都是这个拷贝后的数组，这样就不会修改原数组了

上面这两个操作可以视为是两个过程，这两个过程只需要执行一次，之后再调用`randomPick`时不需要再执行，为此我们可以通过"过程抽象"的方式，将这两个过程封装起来

```js
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
```
