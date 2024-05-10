import type { ParentProps } from 'solid-js';
import { createContext, createMemo, useContext } from 'solid-js';
import useTable from '../Datagrid/useTable';
import { defaultColumns } from './columns';
import { createSignal } from 'solid-js';

function useDummyPage() {
  // fetched using createQuery
  const defaultData = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ];

  const [data] = createSignal(defaultData);

  const dummyData = createMemo(() => data() ?? []);

  const table = useTable(defaultColumns, dummyData);

  return {
    table,
  };
}

type DummyContext = ReturnType<typeof useDummyPage>;

const dummyContext = createContext<DummyContext>();

export function DummyProvider(props: ParentProps) {
  return (
    <dummyContext.Provider value={useDummyPage()}>
      {props.children}
    </dummyContext.Provider>
  );
}

export function useDummyContext(): DummyContext {
  const context = useContext(dummyContext);
  if (!context) throw new Error('No Context');
  return context;
}
