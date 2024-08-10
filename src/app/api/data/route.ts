import type { NextApiRequest, NextApiResponse } from 'next';
import sql, { config as SQLConfig, ConnectionPool } from 'mssql';
import { NextResponse } from 'next/server';

const config: SQLConfig = {
  server: "localhost",
  database: 'DMXXX',
  user: 'sa',
  password: '2244',
  options: {
    encrypt:true,
    trustServerCertificate: true, // change to false for production
  },
};

let pool: ConnectionPool | null = null;

async function getConnection(): Promise<ConnectionPool> {
  if (pool) return pool;
  pool = await sql.connect(config);
  return pool;
}

// Named export for the GET method
export async function GET() {
  try {
    const connection = await getConnection();

    // Execute a simple query (replace with your actual query)
    const result = await connection.query`SELECT TOP 10 * FROM MUA`;

    // Return the results as JSON
    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
  }
}