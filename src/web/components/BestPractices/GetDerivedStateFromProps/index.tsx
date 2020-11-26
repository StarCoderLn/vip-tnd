// 这个生命周期的功能实际上就是将传入的 props 映射到 state 上面
// import React, { Component, PureComponent } from 'react';
// 可以通过以下几种方法来注释 getDerivedStateFromProps

// 1. 如果你已明确使用派生状态，并希望确保 getDerivedStateFromProps 的返回值与之一致
// class Comp extends Component<Props, State> {
//   static getDerivedStateFromProps(
//     props: Props,
//     state: State
//   ): Partial<State> | null {
//     //
//   }
// }

// 2. 当你希望函数的返回值决定状态时
// class Comp extends Component<
//   Props,
//   ReturnType<typeof Comp["getDerivedStateFromProps"]>
// > {
//   static getDerivedStateFromProps(props: Props) {}
// }

// 3. 当你想要具有其他状态字段和备注的派生状态时
// type CustomValue = any;
// interface Props {
//   propA: CustomValue;
// }
// interface DefinedState {
//   otherStateField: string;
// }
// type State = DefinedState & ReturnType<typeof transformPropsToState>;
// function transformPropsToState(props: Props) {
//   return {
//     savedPropA: props.propA, // save for memoization
//     derivedState: props.propA,
//   };
// }
// class Comp extends PureComponent<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       otherStateField: "123",
//       ...transformPropsToState(props),
//     };
//   }
//   static getDerivedStateFromProps(props: Props, state: State) {
//     if (isEqual(props.propA, state.savedPropA)) return null;
//     return transformPropsToState(props);
//   }
// }