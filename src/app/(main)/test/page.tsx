'use client';
import { useEffect, useState } from 'react';

interface DataRow {
  MA_KH: string;
  MA_SP: string;
  // Define other columns as needed
}

export default function Page() {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    // Fetch data from the API route
    fetch('/api/data')
      .then((response) => response.json())
      .then((data: DataRow[]) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-full p-4">
        <h1 className="text-center text-2xl font-bold mb-4">Data from SQL Server</h1>
        <div className="overflow-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Column 1</th>
                <th className="px-4 py-2">Column 2</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{row.MA_KH}</td>
                  <td className="border px-4 py-2">{row.MA_SP}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
