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

    const { MA_KH, HO_TEN_KH, NGAY_SINH_KH, DIEN_THOAI_KH, DIA_CHI_KH, GIOI_TINH_KH } = data;

    // Generate a random MA_KH
    const connection = await getConnection();
    await connection
      .request()
      .input("id", sql.VarChar, MA_KH)
      .input("name", sql.VarChar, HO_TEN_KH)
      .input("birthDate", sql.Date, NGAY_SINH_KH)
      .input("phone", sql.VarChar, DIEN_THOAI_KH)
      .input("address", sql.VarChar, DIA_CHI_KH)
      .input("gender", sql.VarChar, GIOI_TINH_KH)
      .query`
        INSERT INTO KHACH_HANG (MA_KH, HO_TEN_KH, NGAY_SINH_KH, DIEN_THOAI_KH, DIA_CHI_KH, GIOI_TINH_KH)
        VALUES (@id, @name, @birthDate, @phone, @address, @gender)
      `;

    return NextResponse.json({ message: "Customer added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add customer" },
      { status: 500 }
    );
  }
}
