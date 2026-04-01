// import styles from "@Components/Foo/Foo.module.scss";
import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { selectCounterValue } from "@Store/slices/counterSelectors";
import { increment } from "@Store/slices/counterSlice";

export function Foo() {
  const count = useAppSelector(selectCounterValue);
  const dispatch = useAppDispatch();
  const handleIncrementClick = () => dispatch(increment());

  return (
    <div>
      <p>Current Count At: {count}</p>
      <button onClick={handleIncrementClick}>Increment</button>
    </div>
  );
}
