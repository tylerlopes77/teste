import { Request, Response } from 'express';
import { CandidateService } from '../services/candidate.serivce'; 

export class CandidateController {
    async listCandidates(req: Request, res: Response) {
    try {
        const candidates = await CandidateService.listCandidates();
        return res.json(candidates);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao listar candidatos' });
    }
}

    async createCandidate(req: Request, res: Response) {
        try {
        const result = await CandidateService.createCandidate(req.body);
        return res.status(201).json(result);
        } catch (err: any) {
        return res.status(400).json({ error: err.message || 'Erro ao criar candidato' });
        }
    }
}