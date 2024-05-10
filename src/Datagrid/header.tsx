import type { Header } from '@tanstack/solid-table';
import { flexRender } from '@tanstack/solid-table';
import { Show } from 'solid-js';

export default function TableHeader<T>(props: { header: Header<T, unknown> }) {
  const handleHeaderClick = (
    header: Header<unknown, unknown>,
    event: MouseEvent
  ) => {
    event.preventDefault();
    if (header.column.getCanSort())
      header.column.toggleSorting(header.column.getIsSorted() === 'asc');
  };

  return (
    <th
      colSpan={props.header.colSpan}
      scope="col"
      class="px-6 py-3 text-left"
      aria-sort={
        props.header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending'
      }
    >
      <Show when={!props.header.isPlaceholder}>
        <Show
          when={props.header.column.getCanSort()}
          fallback={
            <div class="flex items-center gap-x-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-gray-800">
                {flexRender(
                  props.header.column.columnDef.header,
                  props.header.getContext()
                )}
              </span>
            </div>
          }
        >
          <div class="flex items-center gap-x-2">
            <button
              class="text-xs font-semibold uppercase tracking-wide text-gray-800 cursor-"
              onClick={[handleHeaderClick, props.header]}
            >
              {flexRender(
                props.header.column.columnDef.header,
                props.header.getContext()
              )}
              {/* TODO sorting */}
              <Show when={props.header.column.getIsSorted() === 'asc'}>
                <></>
              </Show>
              <Show when={props.header.column.getIsSorted() === 'desc'}>
                <></>
              </Show>
            </button>
          </div>
        </Show>
      </Show>
    </th>
  );
}
