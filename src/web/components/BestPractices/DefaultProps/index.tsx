import React, { Component } from 'react';

/* ---------------------------------------------------------------- */
// 你可能不需要 defaultProps
// 在推特上的一篇推文中，讨论 defaultProps 最终会被废弃。
// 取而代之的共识是使用对象默认值。

// 函数组件
// type GreetProps = { age?: number };
// const Greet = ({ age = 12 }: GreetProps) => (<div>年龄：{age}</div>);

// 类组件
// type GreetProps = { age?: number };
// class Greet extends Component<GreetProps> {
//   render() {
//     const { age = 12 } = this.props;
//     return (
//       <div>年龄：{age}</div>
//     )
//   }
// }

/* ---------------------------------------------------------------- */

// 使用 defaultProps
// 尽管在某些情况下仍然存在问题，但 TypeScript 3.0+ 中的 defaultProps 的类型推断已大大改善。
// 函数组件
// type GreetProps = { age: number} & typeof defaultProps; // 将默认参数类型和其他的类型组合起来
// const defaultProps = {
//   age: 12
// };
// const Greet = (props: GreetProps) => {
//   const { age = 12 } = props;
//   return (
//   <div>年龄：{age}</div>
//   )
// }
// Greet.defaultProps = defaultProps;

// 类组件
// type GreetProps = typeof Greet.defaultProps & { age: number };

// class Greet extends Component<GreetProps> {
//   static defaultProps = {
//     age: 12
//   };
//   render() {
//     return (
//       <div>年龄：{Greet.defaultProps.age}</div>
//     )
//   }
// }

// // Type-checks! No type assertions needed!
// let el = <Greet age={3} />;

// 上面的实现对于 App 创建者来说效果很好，但是有时候希望能够导出GreetProps，以便其他人可以使用它。
// 这里的问题是 GreetProps 的定义方式，age 不是由于 defaultProps 而必需的 props。
// GreetProps是组件的内部合同（internal contract），而不是面向消费者的外部合同（external contract）。
// 可以创建一个单独的类型专门用于导出，或者可以使用 JSX.LibraryManagedAttributes 实用程序。

// internal contract, should not be exported out
// type GreetProps = {
//   age?: number;
// };
// class Greet extends Component<GreetProps> {
//   static defaultProps = {
//     age: 12
//   };
//   render() {
//     return (
//       <div>年龄：{Greet.defaultProps.age}</div>
//     )
//   }
// }
// // external contract
// export type ApparentGreetProps = JSX.LibraryManagedAttributes<typeof Greet, GreetProps>;

/* ---------------------------------------------------------------- */

// 使用 defaultProps 消耗组件的 props
// 具有defaultProps的组件似乎具有一些实际上没有的必需 props。

// 看下面这个问题
// interface IProps {
//   name: string;
// }
// const defaultProps = {
//   age: 25,
// };
// const GreetComponent = ({ name, age }: IProps & typeof defaultProps) => (
//   <div>{`Hello, my name is ${name}, ${age}`}</div>
// );
// GreetComponent.defaultProps = defaultProps;

// const Greet = (props: React.ComponentProps<typeof GreetComponent>) => {
//   return <h1 />;
// };

// Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
// const el = <Greet name="foo" />;

// 解决方法是：定义一个应用 JSX.LibraryManagedAttributes 的实用程序。
// type ComponentProps<T> = T extends
//   | React.ComponentType<infer P>
//   | React.Component<infer P>
//   ? JSX.LibraryManagedAttributes<T, P>
//   : never;

// const Greet = (props: ComponentProps<typeof GreetComponent>) => {
//   return <h1>12334</h1>;
// };

// No error
// const el = <Greet name="foo" />;

// 在 TypeScript2.9 以及更早的版本中使用 defaultProps
// 对于 TypeScript 2.9 和更早版本，有多种方法可以实现，但这是我们迄今所见的最佳实现
type Props = Required<typeof Greet.defaultProps> & {
  /* additional props here */
}
export class Greet extends React.Component<Props> {
  static defaultProps = {
    foo: "foo",
  };
  render() {
    return (
      <div>{Greet.defaultProps.foo}</div>
    )
  }
}

// 我们以前的建议是使用 TypeScript 中的 Partial 类型功能，这意味着当前接口将在包装后的接口上实现部分版本。
// 这样，我们可以扩展 defaultProps，而无需更改类型！
// interface IMyComponentProps {
//   firstProp?: string;
//   secondProp: IPerson[];
// }

// export class MyComponent extends React.Component<IMyComponentProps> {
//   public static defaultProps: Partial<IMyComponentProps> = {
//     firstProp: "default",
//   };
// }

export default Greet;