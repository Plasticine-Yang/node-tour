interface Corpus {
  /** @description 文章主题 */
  titles: string[]

  /** @description 名人名言 */
  famousQuotes: string[]

  /** @description 名人名言起始句 */
  said: string[]

  /** @description 废话的前置分局 */
  preBullshits: string[]

  /** @description 废话主体 */
  bullshits: string[]

  /** @description 结论 */
  conclusions: string[]
}
