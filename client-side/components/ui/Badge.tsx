import { CandidateStatus } from "@/types/candidate";

const statusConfig: Record<CandidateStatus, { label: string; className: string }> = {
  pending: { label: "Pendente", className: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Aprovado", className: "bg-green-100 text-green-800" },
  rejected: { label: "Reprovado", className: "bg-red-100 text-red-800" },
  interview: { label: "Entrevista", className: "bg-blue-100 text-blue-800" },
};

interface BadgeProps {
  status: CandidateStatus;
}

export function Badge({ status }: BadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}