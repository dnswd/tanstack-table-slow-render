import type { Table } from '@tanstack/solid-table';
import { flexRender } from '@tanstack/solid-table';
import type { Accessor } from 'solid-js';
import { For } from 'solid-js';
import TableHeader from '../Datagrid/header';

export function DataGrid<T>(props: { table: Accessor<Table<T>> }) {
  return (
    <>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <For each={props.table()?.getHeaderGroups() ?? []}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => <TableHeader header={header} />}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <For each={props.table()?.getRowModel()?.rows ?? []}>
            {(row) => (
              <tr class="hover:bg-gray-50 cursor-pointer">
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="h-px w-px whitespace-nowrap">
                      <div class="px-6 py-2">
                        <span class="text-sm text-gray-600">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </>
  );
}
