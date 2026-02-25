import { connection } from '../db/connection';
import { createCandidateDTO } from '../Dto/candidate.dto';

export const CandidateService = {
    async listCandidates() {
        try {
            const result = await connection.query('SELECT * FROM candidates ORDER BY applied_at DESC');
            return result.rows;  
        } catch (error) {
            console.error('Erro ao listar candidatos:', error);
            throw new Error('Falha ao listar candidatos');
        }
    },

    async createCandidate(data: createCandidateDTO) {
        try {
            const check : any = await connection.query(
            'SELECT 1 FROM candidates WHERE email = $1',
            [data.email]
        );

        if (check.rowCount > 0) {
            throw new Error('Já existe um candidato com este email');
        }

        const result = await connection.query(
            `INSERT INTO candidates (name, email, phone, position, status, applied_at)
            VALUES ($1, $2, $3, $4, 'pending', NOW())
            RETURNING *`,
            [data.name, data.email, data.phone, data.position]
        );

        return {
            message: 'Candidato registrado com sucesso',
            candidate: result.rows[0]
        };
        } catch (error: any) {
            console.error('Erro ao criar candidato:', error);
            if (error.message.includes('duplicate key')) {
            throw new Error('Já existe um candidato com este email');
        }
            throw error;
        }
    }


};