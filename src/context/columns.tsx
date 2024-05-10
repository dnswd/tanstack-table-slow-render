import { ColumnDef } from '@tanstack/solid-table';
import { createMemo } from 'solid-js';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const defaultColumns = createMemo(
  () =>
    [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => <i>{info.getValue<string>()}</i>,
        header: () => <span>Last Name</span>,
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (info) => info.column.id,
      },
    ] as const satisfies ColumnDef<Person>[]
);
