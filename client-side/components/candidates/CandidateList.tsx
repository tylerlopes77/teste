"use client";

import { Candidate, CreateCandidateDTO } from "@/types/candidate";
import { CandidateCard } from "./CandidateCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CandidateForm } from "./CandidateForm";
import { useState } from "react";
import { UserPlus, Users, RefreshCw, SearchX } from "lucide-react";

interface CandidateListProps {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  onAdd: (data: CreateCandidateDTO) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onRefetch: () => void;
}

export function CandidateList({
  candidates,
  loading,
  error,
  onAdd,
  onRemove,
  onRefetch,
}: CandidateListProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = async (data: CreateCandidateDTO) => {
    await onAdd(data);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Candidatos</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {candidates.length} candidato{candidates.length !== 1 ? "s" : ""} cadastrado{candidates.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onRefetch} className="gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            Atualizar
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <UserPlus className="w-4 h-4" />
            Novo candidato
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      ) : candidates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">Nenhum candidato ainda</p>
          <p className="text-sm text-gray-400 mt-1 mb-5">Comece adicionando o primeiro candidato</p>
          <Button onClick={() => setModalOpen(true)}>
            <UserPlus className="w-4 h-4" />
            Adicionar candidato
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title="Novo candidato"
        onClose={() => setModalOpen(false)}
      >
        <CandidateForm
          onSubmit={handleAdd}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}