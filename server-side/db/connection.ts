import { Pool } from 'pg';
import 'dotenv/config';

export const  connection = new Pool({
    user:'postgres',
    host:'localhost',
    database:process.env.DATA_BASE,
    password:process.env.DATA_BASE_PASSWORD,
    port: 5432
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.stack);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso pelo !');
    }
});