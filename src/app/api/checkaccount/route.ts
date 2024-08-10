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

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Check for admin credentials
        if (username === 'admin' && password === 'admin') {
            return NextResponse.json({ role: 'admin' });
        }

        // Check for user credentials
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('MA_KH', sql.VarChar, username)
            .input('DIEN_THOAI_KH', sql.VarChar, password)
            .query`
                SELECT * FROM KHACH_HANG
                WHERE MA_KH = @MA_KH AND DIEN_THOAI_KH = @DIEN_THOAI_KH
            `;

        if (result.recordset.length > 0) {
            // User is authenticated
            return NextResponse.json({ role: 'user', customerInfo: result.recordset[0] });
        } else {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
    }
}
