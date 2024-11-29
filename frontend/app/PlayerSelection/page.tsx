'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import LoadingBar from '@/components/LoadingBar';
import Field from '@/components/field';
import PlayerTable from '@/components/playerTable';
import 'ag-grid-enterprise';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import BattingFirstModal from '@/components/battingFirstModal';

const readCSVData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('/file_1.csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results: Papa.ParseResult<any>) => {
            resolve(results.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
      })
      .catch((error) => reject(error));
  });
};

const readCSVImageData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('/names.csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results: Papa.ParseResult<any>) => {
            resolve(results.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
      })
      .catch((error) => reject(error));
  });
};

export default function Page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toComparePlayer, setToComparePlayer] = useState<any | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAIComparisonClick = () => {
    localStorage.setItem('rowData', JSON.stringify(rowData));
    localStorage.setItem('selectedRowData', JSON.stringify(selectedRowData));
  };

  useEffect(() => {
    const playerDat = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(playerDat);
    const selectedPlayerData = JSON.parse(
      localStorage.getItem('selectedRowData') || '[]'
    );
    setSelectedRowData(selectedPlayerData);
    const count = playerDat.filter((player: any) => player.isSelected).length;
    setCountSelected(count);
    if (count === 0) {
      readCSVData().then((data) => {
        readCSVImageData().then((imageData) => {
          const playerData = data.map((row: any, index: number) => {
            const playerImage = imageData.find(
              (img) => img.Name === row['player']
            );
            return {
              key: index,
              name: row['player'],
              imageSrc: playerImage ? playerImage.image_path : '',
              isSelected: false,
              isCaptain: false,
              isViceCaptain: false,
              toCompare: false,
              values: (() => {
                try {
                  const fixedJSONString = row['values'].replace(/'/g, '"');
                  return JSON.parse(fixedJSONString);
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                  return {};
                }
              })(),
            };
          });
          setRowData(playerData);
        });
      });
      setCountSelected(0);
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen">
      <Header />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex flex-row gap-4 m-10 w-[95%] grow">
        <PlayerTable
          rowData={rowData}
          setSelectedRowData={setSelectedRowData}
          setCountSelected={setCountSelected}
          setRowData={setRowData}
          setToComparePlayer={setToComparePlayer}
        />
        <Field
          players={selectedRowData}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
          onClick={() => (window.location.href = '/AnalysisPage')}
        >
          Analyse My Pick
        </Button>
        <BattingFirstModal
          rowData={rowData}
          setRowData={setRowData}
          setSelectedRowData={setSelectedRowData}
          setCountSelected={setCountSelected}
        />
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
          onClick={() => {
            handleAIComparisonClick();
            window.location.href = '/CaptainSelection';
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
