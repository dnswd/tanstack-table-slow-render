import type { JSX } from 'solid-js';
import { createEffect } from 'solid-js';

type IndeterminateCheckboxProps = {
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
} & JSX.DOMAttributes<HTMLInputElement>;

export default function IndeterminateCheckbox(
  props: IndeterminateCheckboxProps
) {
  let ref: HTMLInputElement;

  createEffect(() => {
    if (typeof props.indeterminate === 'boolean')
      ref.indeterminate = !props.checked && props.indeterminate;
  });

  return (
    <input
      ref={(el) => (ref = el)}
      {...props}
      type="checkbox"
      class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    />
  );
}
