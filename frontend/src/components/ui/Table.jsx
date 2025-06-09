// import React from "react";
// import { useTable } from "react-table";

// const Table = ({ data, columns, onRowClick }) => {
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

//   return (
//     <table {...getTableProps()} className="w-full border border-gray-300 rounded-lg text-sm text-left">
//       <thead className="bg-gray-100 text-gray-700">
//         {headerGroups.map((headerGroup) => (
//           <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id || 'header-' + Math.random()}>
//             {headerGroup.headers.map((column) => (
//               <th {...column.getHeaderProps()} className="p-2 border" key={column.id || 'column-' + Math.random()}>
//                 {column.render("Header")}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, rowIndex) => {
//           prepareRow(row);
//           return (
//             <tr
//               {...row.getRowProps()}
//               className="hover:bg-gray-50"
//               onClick={() => onRowClick(row)}
//               key={row.id || 'row-' + rowIndex}  // Si `row.id` n'existe pas, utilise un indice
//             >
//               {row.cells.map((cell) => (
//                 <td {...cell.getCellProps()} className="p-2 border" key={cell.column.id || 'cell-' + cell.row.index}>
//                   {cell.render("Cell")}
//                 </td>
//               ))}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default Table;

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = ({ data, columns, onRowClick }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border border-gray-300 rounded-lg text-sm text-left">
      <thead className="bg-gray-100 text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-2 border"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, rowIndex) => (
          <tr
            key={row.id}
            className="hover:bg-gray-50"
            onClick={() => onRowClick(row)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

