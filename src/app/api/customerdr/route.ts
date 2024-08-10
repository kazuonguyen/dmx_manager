import { NextResponse } from 'next/server';
import sql, { config as SQLConfig, ConnectionPool } from 'mssql';

const config: SQLConfig = {
    server: 'localhost',
    database: 'DMXXX',
    user: 'sa',
    password: '2244',
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

export async function GET() {
    try {
        const connection = await getConnection();
        const result = await connection.request().query`
            SELECT MA_KH, HO_TEN_KH, DIEN_THOAI_KH, DIA_CHI_KH FROM KHACH_HANG
        `;
        return NextResponse.json(result.recordset);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
