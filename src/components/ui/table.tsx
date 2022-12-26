import React from 'react';

/** Helpers */

// helper to get an array containing the object values with
// the correct type infered.
function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | Symbol | number | boolean;

// Type guard for the primitive types which will support printing
// out of the box
function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}

/** Component */

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
  function renderRow(item: T) {
    return (
      <tr className="mb-4 divide-x divide-gray-400 text-center">
        {objectKeys(item).map((itemProperty) => {
          const customRenderer = props.customRenderers?.[itemProperty];

          return (
            <td className="mx-8" key={itemProperty.id}>
              {isPrimitive(item[itemProperty]) ? item[itemProperty] : ''}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <table className="mb-4 w-full max-w-4xl rounded border-2 border-gray-200 py-2.5 text-center dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500">
      <thead className="mb-4 divide-x divide-gray-400 text-center">
        {objectValues(props.headers).map((headerValue) => (
          <th key={headerValue.id}>{headerValue}</th>
        ))}
      </thead>
      <tbody>{props.items.map(renderRow)}</tbody>
    </table>
  );
}
