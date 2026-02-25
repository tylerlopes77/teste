"use client";

import { CandidateList } from "@/components/candidates/CandidateList";
import { useCandidates } from "@/hooks/useCandidates";

export default function HomePage() {
  const { candidates, loading, error, addCandidate, removeCandidate, refetch } = useCandidates();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <CandidateList
          candidates={candidates}
          loading={loading}
          error={error}
          onAdd={addCandidate}
          onRemove={removeCandidate}
          onRefetch={refetch}
        />
      </div>
    </main>
  );
}