import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.COCKROACHDB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;
