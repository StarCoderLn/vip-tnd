// 从 v16.8 开始，@types/react 中支持 hook。
import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useImperativeHandle
} from 'react';

/* ---------------------------------------------------------------- */

// useState
// 在多数情况下，类型推断很有效
// const [val, toggle] = useState(false); // `val` is inferred to be a boolean, `toggle` only takes booleans

// 但是，很多 hooks 都使用带有控制的默认值初始化，如何提供类型呢？明确声明类型，并使用联合类型。
// const [user, setUser] = useState<IUser | null>(null);
// // later...
// setUser(newUser);

/* ---------------------------------------------------------------- */

// useReducer
// 可以使用差别联合类型（Discriminated Unions）来进行 reducer 操作。不要忘记定义 reducer 的返回类型，否则 TypeScript 会推断出它。
const initialState = { count: 0 };

// 差别联合类型
type ACTIONTYPE = 
  | { type: 'increment', payload: number}
  | { type: 'decrement', payload: string};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + action.payload
      };
    case 'decrement':
      return {
        count: state.count - Number(action.payload)
      };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: { state.count }
      <br />
      <button onClick={() => dispatch({ type: 'increment', payload: 1 })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement', payload: '1' })}>-</button>
    </>
  )
}

// 如果使用 redux 库编写 reducer 函数，它提供了 Reducer <State，Action> 格式的便捷帮助器，该格式为您处理返回类型。
// 这样，上面的例子就会变成：
// import { Reducer } from 'redux';
// export function reducer: Reducer<AppState, Action>() {}

/* ---------------------------------------------------------------- */

// useEffect
// 使用这个 hook 时，注意不要返回任何非函数或未定义的东西，不然 Typescript 和 React 都会有提示。
// 当使用箭头函数时，可能不易察觉。
// function DelayedEffect(props: { timerMs: number }) {
//   const { timerMs } = props;
//   // bad! setTimeout implicitly returns a number because the arrow function body isn't wrapped in curly braces
//   useEffect(
//     () =>
//       setTimeout(() => {
//         /* do stuff */
//       }, timerMs),
//     [timerMs]
//   );
//   return null;
// }

/* ---------------------------------------------------------------- */

// useRef
// 使用 useRef 时，在创建没有初始值的 ref 容器时有两个选择。
// const ref1 = useRef<HTMLElement>(null!);
// const ref2 = useRef<HTMLElement | null>(null);

// 第一种方式会将 ref1.current 设为只读，并传给 react 的内置 ref 属性，react 会为你设置当前值。
// null! 是一个非空的断言运算符。它断言在它之前的任何表达式都不为 null 或未定义。
// 因此，如果具有 useRef<HTMLElement>(null!), 意味着要使用当前值为 null 实例化 ref，但对 TypeScript 而言，它不是 null。
// function MyComponent() {
//   const ref1 = useRef<HTMLElement>(null!);
//   useEffect(() => {
//     doSomethingWith(ref1.current); // TypeScript won't require null-check e.g. ref1 && ref1.current
//   });
//   return <div ref={ref1}> etc </div>;
// }

// 第二种方式会使 ref2.current 可变，并用于自己定义管理的“实例变量”。
// function TextInputWithFocusButton() {
//   // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
//   const inputEl = React.useRef<HTMLInputElement>(null);
//   const onButtonClick = () => {
//     // strict null checks need us to check if inputEl and current exist.
//     // but once current exists, it is of type HTMLInputElement, thus it
//     // has the method focus! ✅
//     if (inputEl && inputEl.current) {
//       inputEl.current.focus();
//     }
//   };
//   return (
//     <>
//       {/* in addition, inputEl only can be used with input elements. Yay! */}
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }

/* ---------------------------------------------------------------- */

// useImperativeHandle
// useImperativeHandle(ref, createHandle, [deps])
// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
// 在大多数情况下，应当避免使用 ref 这样的命令式代码。
// useImperativeHandle 应当与 forwardRef 一起使用
// type ListProps<ItemType> = {
//   items: ItemType[];
//   innerRef?: React.Ref<{ scrollToItem(item: ItemType): void }>;
// };

// function List<ItemType>(props: ListProps<ItemType>) {
//   useImperativeHandle(props.innerRef, () => ({
//     scrollToItem() {},
//   }));
//   return null;
// }

/* ---------------------------------------------------------------- */

// 自定义 hook
// 如果要在“自定义 hook”中返回数组，则要避免类型推断
// 因为 TypeScript 会推断联合类型（当您实际上希望在数组的每个位置使用不同的类型时）。 而是使用 TS 3.4 const assertions:
// export function useLoading() {
//   const [isLoading, setState] = React.useState(false);
//   const load = (aPromise: Promise<any>) => {
//     setState(true);
//     return aPromise.finally(() => setState(false));
//   };
//   return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
// }

// 如果在使用 const 断言时遇到麻烦，还可以断言或定义函数返回类型：
// export function useLoading() {
//   const [isLoading, setState] = React.useState(false);
//   const load = (aPromise: Promise<any>) => {
//     setState(true);
//     return aPromise.finally(() => setState(false));
//   };
//   return [isLoading, load] as [
//     boolean,
//     (aPromise: Promise<any>) => Promise<any>
//   ];
// }

// 如果你编写了许多自定义钩子，则自动键入元组的辅助函数也可能会有所帮助。
// function tuplify<T extends any[]>(...elements: T) {
//   return elements;
// }

// function useArray() {
//   const numberValue = useRef(3).current;
//   const functionValue = useRef(() => {}).current;
//   return [numberValue, functionValue]; // type is (number | (() => void))[]
// }

// function useTuple() {
//   const numberValue = useRef(3).current;
//   const functionValue = useRef(() => {}).current;
//   return tuplify(numberValue, functionValue); // type is [number, () => void]
// }

// 注意，React团队建议返回两个以上值的自定义钩子应该使用适当的对象而不是元组。

export default Counter;