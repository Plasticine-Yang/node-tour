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
