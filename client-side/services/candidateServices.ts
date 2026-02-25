import axios from "axios";
import { Candidate, CreateCandidateDTO } from "@/types/candidate";

const api = axios.create({
  baseURL: "http://localhost:4040",
  headers: { "Content-Type": "application/json" },
});

export const candidateService = {
  async findAll(): Promise<Candidate[]> {
    const { data } = await api.get<Candidate[]>("/candidates/list");
    return data;
  },

  async create(payload: CreateCandidateDTO): Promise<Candidate> {
    const { data } = await api.post<Candidate>("/candidates/add", payload);
    return data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/candidates/${id}`);
  },
};