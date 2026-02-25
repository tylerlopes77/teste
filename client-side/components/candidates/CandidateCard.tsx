"use client";

import { Candidate } from "@/types/candidate";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, Briefcase, Trash2 } from "lucide-react";
import { useState } from "react";

interface CandidateCardProps {
  candidate: Candidate;
  onRemove: (id: string) => Promise<void>;
}

export function CandidateCard({ candidate, onRemove }: CandidateCardProps) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await onRemove(candidate.id);
    } finally {
      setRemoving(false);
    }
  };

  const appliedDate = new Date(candidate.appliedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {candidate.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">{candidate.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{appliedDate}</p>
          </div>
        </div>
        <Badge status={candidate.status} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Briefcase className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{candidate.position}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">{candidate.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>{candidate.phone}</span>
        </div>
      </div>

      <div className="flex justify-end pt-1 border-t border-gray-100">
        
         
      </div>
    </div>
  );
}