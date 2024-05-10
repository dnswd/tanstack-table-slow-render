import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
} from '@tanstack/solid-table';
import {
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
} from '@tanstack/solid-table';
import type { Accessor, Setter } from 'solid-js';
import { createMemo } from 'solid-js';
import TableSelection from './selection';

interface TableOptions {
  setSelectionState?: Setter<RowSelectionState>;
  selectionState?: Accessor<RowSelectionState>;
  setSortingState?: Setter<SortingState>;
  sortingState?: Accessor<SortingState>;
  globalFilterState?: Accessor<string>;
}

export default function useTable<T>(
  columns: Accessor<ColumnDef<T>[]>,
  list: Accessor<T[]>,
  options?: TableOptions
) {
  function isRowSelectionEnabled(): boolean {
    return !!options?.selectionState && !!options?.setSelectionState;
  }

  function getRowSelection() {
    if (isRowSelectionEnabled()) return options!.selectionState!();
  }

  function isSortingEnabled(): boolean {
    return !!options?.sortingState && !!options?.setSortingState;
  }

  function getSortingState() {
    if (options?.sortingState) return options.sortingState();
  }

  function getGlobalFilter() {
    if (options?.globalFilterState) return options.globalFilterState();
  }

  const tableColumns = createMemo(() =>
    isRowSelectionEnabled()
      ? ([TableSelection(), ...columns()] satisfies ColumnDef<T>[])
      : columns()
  );

  function createTable() {
    return createSolidTable<T>({
      get data() {
        return list() ?? [];
      },
      columns: tableColumns(),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      enableRowSelection: isRowSelectionEnabled(),
      onRowSelectionChange: isRowSelectionEnabled()
        ? options?.setSelectionState
        : undefined,
      onSortingChange: isSortingEnabled()
        ? options?.setSortingState
        : undefined,
      state: {
        get globalFilter() {
          return getGlobalFilter();
        },
        get rowSelection() {
          return getRowSelection();
        },
        get sorting() {
          return getSortingState();
        },
      },
    });
  }

  return createMemo(createTable);
}
