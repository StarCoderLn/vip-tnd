import React, { FC } from 'react';

/* ---------------------------------------------------------------- */

// 函数组件可以编写为带有props参数并返回JSX元素的普通函数。
// type AppProps = { message: string };
// const App = ({ message='Hello FunctionComponent' }: AppProps) => <div>{message}</div>;

/* ---------------------------------------------------------------- */

// 可以使用 React.FunctionComponent（或简写的 React.FC）编写组件。
// const App: FC<{ message: string }> = ({ message = 'Hello FunctionComponent' }) => (
//   <div>{message}</div>
// );

/* ---------------------------------------------------------------- */

// const App: React.FunctionComponent<{ title: string }> = ({
//   children='children',
//   title='children info',
// }) => <div title={title}>{children}</div>;

/* ---------------------------------------------------------------- */

// 从 @types/react16.9.48 开始，如果要显式键入子级，也可以使用 React.VoidFunctionComponent 或 React.VFC 类型。
// 这是一个临时解决方案，直到 FunctionComponent 默认情况下不接受任何子项（针对@ types/react@^18.0.0 进行了计划）
// type Props = { foo: string };

// // OK now, in future, error
// const FunctionComponent: React.FunctionComponent<Props> = ({
//   foo,
//   children,
// }: Props) => {
//   return (
//     <div>
//       {foo} {children}
//     </div>
//   ); // OK
// };

// // Error now, in future, deprecated
// const VoidFunctionComponent: React.VoidFunctionComponent<Props> = ({
//   foo,
//   children,
// }) => {
//   return (
//     <div>
//       {foo}
//       {children}
//     </div>
//   );
// };

// 在大多数情况下，使用哪种语法几乎没有什么区别，但是可能更喜欢 React.FunctionComponent 的更明确的性质。

/* ---------------------------------------------------------------- */

// 小陷阱
// 以下的用法是不支持的

// 1. 条件渲染
// 这是因为编译器的限制，功能组件不能返回 JSX 表达式或 null 以外的任何内容
// const MyConditionalComponent = ({ shouldRender = false }) =>
//   shouldRender ? <div /> : false; // don't do this in JS either
// const el = <MyConditionalComponent />; // throws an error

// 2. Array.fill
// const MyArrayComponent = () => Array(5).fill(<div />);
// const el2 = <MyArrayComponent />; // throws an error

// 如果确实需要返回 react 支持的其他奇异类型，则需要执行类型断言。
const App = () => (Array(5).fill(<div>22</div>) as any) as JSX.Element;

export default App;