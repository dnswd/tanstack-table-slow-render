import { Suspense } from 'solid-js';
import { useDummyContext } from '../context/dummyContext';
import { DataGrid } from '../Datagrid';

export default function Dummy() {
  const { table } = useDummyContext();

  return (
    <Suspense>
      <DataGrid table={table} />
    </Suspense>
  );
}
