// 在 TypeScript 中，type 和 interface 是不同的，但就常见的 react 用例而言，它们可以用于做非常类似的事情
// 下面是一些使用它们时有用的经验法则

// 1. 在编写库或第三方环境类型定义时，请始终使用 interface 作为公共 API 的定义，因为如果缺少某些定义，这允许使用者通过声明合并来扩展它们。
// 2. 考虑将 type 用于你的 React Component Props 和 State，以保持一致性，并且因为它受到更多限制。

// type 对于联合类型非常有用（例如，类型 MyType = TypeA | TypeB），而 interface 则更适合于声明字典形状，然后实现或扩展它们。