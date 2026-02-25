"use client";

import { useState, useEffect, useCallback } from "react";
import { Candidate, CreateCandidateDTO } from "@/types/candidate";
import { candidateService } from "@/services/candidateServices";

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await candidateService.findAll();
        setCandidates(data);
      } catch {
        setError("Não foi possível carregar os candidatos.");
      } finally {
        setLoading(false);
      }
  }, []);

  const addCandidate = useCallback(async (payload: CreateCandidateDTO) => {
    const created = await candidateService.create(payload);
    setCandidates((prev) => [created, ...prev]);
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return { candidates, loading, error, addCandidate, refetch: fetchCandidates };
}