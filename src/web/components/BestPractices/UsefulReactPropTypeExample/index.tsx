// 有用的 react prop 类型示例
// export declare interface AppProps {
//   children1: JSX.Element; // bad，没有考虑数组
//   children2: JSX.Element | JSX.Element[]; // 不接受字符串
//   children3: React.ReactChildren; // 尽管有名字，但根本不是适当的类型；这是一个实用程序
//   children4: React.ReactChild[]; // better
//   children: React.ReactNode; // best, accepts everything
//   functionChildren: (name: string) => React.ReactNode; // 子组件渲染函数参数类型的推荐函数
//   style?: React.CSSProperties; // 传递样式参数
//   onChange?: React.FormEventHandler<HTMLInputElement>; // 表单事件！ 通用参数是 event.target 的类型
//   props: Props & React.ComponentPropsWithoutRef<"button">; // 模拟按钮元素的所有参数，并明确不转发它的 ref
//   props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // 模拟 MyButtonForwardedRef 的所有参数并显示转发它的 ref
// }

// 有效的 React 节点与 React.createElement 返回的内容不同。
// 无论组件最终呈现什么内容，React.createElement 始终返回一个对象，即 JSX.Element 接口。
// 但是 React.ReactNode 是组件所有可能的返回值的集合。

// 1. JSX.Element -> React.createElement 的返回值
// 2. React.ReactNode -> 组件的返回值