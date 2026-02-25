export type CandidateStatus = "pending" | "approved" | "rejected" | "interview";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: CandidateStatus;
  appliedAt: string;
}

export interface CreateCandidateDTO {
  name: string;
  email: string;
  phone: string;
  position: string;
}