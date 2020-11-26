// import React from 'react';

// 如果性能不是问题，那么内联处理程序是最简单的，因为可以使用类型推断和上下文类型输入：
// const el = (
//   <button
//     onClick={(event) => {
//       /* ... */
//     }}
//   />
// );

// 但是，如果你需要分别定义事件处理程序，那么 IDE 工具确实非常有用，因为 @type 定义带有大量的键入功能。
// 输入你要查找的内容，通常自动完成功能会为你提供帮助。 这是表单事件的 onChange 的外观：
// class App extends React.Component<
//   {},
//   {
//     // no props
//     text: string;
//   }
// > {
//   state = {
//     text: "",
//   };

//   // typing on RIGHT hand side of =
//   onChange = (e: React.FormEvent<HTMLInputElement>): void => {
//     this.setState({ text: e.currentTarget.value });
//   };
//   render() {
//     return (
//       <div>
//         <input type="text" value={this.state.text} onChange={this.onChange} />
//       </div>
//     );
//   }
// }

// 可以选择将类型应用于事件处理程序本身（由 @TomasHubelbauer 提供）
// 而不是使用 React.FormEvent <> 和 void 输入参数和返回值：
// typing on LEFT hand side of =
// onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//   this.setState({text: e.currentTarget.value})
// }