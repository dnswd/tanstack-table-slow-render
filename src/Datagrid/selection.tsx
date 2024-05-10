import type { ColumnDef } from '@tanstack/solid-table';
import IndeterminateCheckbox from '../form/IndeterminateCheckbox';

export default function TableSelection<T>(): ColumnDef<T> {
  return {
    id: 'select',
    header: (headerCtx) => (
      <IndeterminateCheckbox
        {...{
          checked: headerCtx.table.getIsAllRowsSelected(),
          indeterminate: headerCtx.table.getIsSomeRowsSelected(),
          onChange: headerCtx.table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: (cellCtx) => (
      <IndeterminateCheckbox
        {...{
          checked: cellCtx.row.getIsSelected(),
          disabled: !cellCtx.row.getCanSelect(),
          indeterminate: cellCtx.row.getIsSomeSelected(),
          onChange: cellCtx.row.getToggleSelectedHandler(),
        }}
      />
    ),
  };
}
