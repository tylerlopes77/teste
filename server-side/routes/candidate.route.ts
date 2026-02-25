import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller";

const candidateRoute = Router();
const candidateController = new CandidateController () ;

candidateRoute.get('/candidates/list',candidateController.listCandidates);
candidateRoute.post('/candidates/add' , candidateController.createCandidate);


export default candidateRoute ; 