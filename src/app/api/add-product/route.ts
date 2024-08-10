import { NextResponse } from "next/server";
import sql, { config as SQLConfig, ConnectionPool } from "mssql";

const config: SQLConfig = {
  server: "localhost",
  database: "DMXXX",
  user: "sa",
  password: "2244",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool: ConnectionPool | null = null;

async function getConnection(): Promise<ConnectionPool> {
  if (pool) return pool;
  pool = await sql.connect(config);
  return pool;
}

export async function POST(request: Request) {
  try {
    // Read and parse the request body once
    const data = await request.json();
    console.log(data); // Log the parsed body

    const { MA_SP, MA_MH, TEN_SP, DVT, SO_LUONG } = data;

    // Generate a random MA_KH
    const connection = await getConnection();
    await connection
      .request()
      .input("id", sql.VarChar, MA_SP)
      .input("name", sql.VarChar, MA_MH)
      .input("birthDate", sql.VarChar, TEN_SP)
      .input("phone", sql.VarChar, DVT)
      .input("address", sql.Int, SO_LUONG)
      .query`
        INSERT INTO SAN_PHAM (MA_SP, MA_MH, TEN_SP, DVT, SO_LUONG)
        VALUES (@id, @name, @birthDate, @phone, @address)
      `;

    return NextResponse.json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
