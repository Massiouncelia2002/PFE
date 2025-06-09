// columns.js
import React from "react";

export const famillesColumns = ({ ActionCell }) => [
  {
    Header: "Nom Famille",
    accessor: "nomFamille",
    className: "font-medium text-gray-900"
  },
  {
    Header: "Code Famille",
    accessor: "codeFamille",
    className: "text-gray-500"
  },
  {
    Header: "Actions",
    Cell: ActionCell,
    className: "text-right"
  }
];

export const sousFamillesColumns = ({ ActionCell }) => [
  {
    Header: "Nom Sous-Famille",
    accessor: "nomSousFamille",
    className: "font-medium text-gray-900"
  },
  {
    Header: "Code Sous-Famille",
    accessor: "codeSousFamille",
    className: "text-gray-500"
  },
  {
    Header: "Actions",
    Cell: ActionCell,
    className: "text-right"
  }
];