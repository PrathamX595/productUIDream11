'use client';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PlayerTableProps {
  rowData: any[];
  setSelectedRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setCountSelected: React.Dispatch<React.SetStateAction<number>>;
  setRowData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  rowData,
  setRowData,
  setSelectedRowData,
  setCountSelected,
}) => {
  const myTheme = themeQuartz.withParams({
    accentColor: '#D22A29',
    backgroundColor: '#0D0402',
    browserColorScheme: 'dark',
    chromeBackgroundColor: {
      ref: 'foregroundColor',
      mix: 0.07,
      onto: 'backgroundColor',
    },
    foregroundColor: '#FFF',
    headerFontSize: 14,
  });

  const handleButtonClick = (key: number) => {
    rowData[key].isSelected = !rowData[key].isSelected;
    setRowData([...rowData]);
    const selectedRows = rowData.filter((row) => row.isSelected);
    setSelectedRowData(selectedRows);
    setCountSelected(selectedRows.length);
  };

  // Define columnDefs directly inside the component
  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    {
      headerName: 'Name',
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <div className="flex gap-5">
            <img
              src={params.data.imageSrc}
              alt={params.data.name}
              className="w-8 h-8 rounded-full"
            />
            <p>{params.data.name}</p>
          </div>
        );
      },
      flex: 2,
    },
    {
      field: 'Points',
      valueFormatter: (params: any) => {
        if (!params.data) return '';
        return params.data.points;
      },
      flex: 1,
    },
    {
      field: 'Lock/Exclude',
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <div>
            <CloseIcon />
            <LockOpenIcon />
          </div>
        );
      },
      flex: 1,
    },
    {
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <ButtonRenderer
            data={params.data}
            handleButtonClick={handleButtonClick}
          />
        );
      },
      flex: 1,
    },
  ];

  // Check if rowData is valid before rendering the grid
  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div style={{ width: '100%', height: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          theme={myTheme}
        />
      </div>
    </div>
  );
};

const ButtonRenderer = (props: any) => {
  const { data, handleButtonClick } = props;
  const clicked = data.isSelected;

  return (
    <button
      onClick={() => handleButtonClick(data.key)}
      className={`w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors ${
        clicked
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      {clicked ? '-' : '+'}
    </button>
  );
};

export default PlayerTable;
