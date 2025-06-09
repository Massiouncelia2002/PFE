import React from "react";
import { useTable } from "react-table";

const Table = ({ data, columns, onRowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="w-full border border-gray-300 rounded-lg text-sm text-left">
      <thead className="bg-gray-100 text-gray-700">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || 'header-' + Math.random()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="p-2 border" key={column.id || 'column-' + Math.random()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="hover:bg-gray-50"
              onClick={() => onRowClick(row)}
              key={row.id || 'row-' + rowIndex}  // Si `row.id` n'existe pas, utilise un indice
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-2 border" key={cell.column.id || 'cell-' + cell.row.index}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
