'use client'

import ProblemsListContainer from "../component/ProblemsListContainer";
import { useEffect, useState } from 'react';
import { problemMeta } from "@/app/types/problemMeta";

export default function Page() {
  const [repo, setRepo] = useState<problemMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서 데이터 가져오기
    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/problemMetadata/');
        if (!response.ok) {
          throw new Error('Failed to fetch problems data');
        }
        const data: problemMeta = await response.json();
        setRepo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      {repo ? <ProblemsListContainer problems={repo} /> : <div>No data available</div>}
    </main>
  );
}
