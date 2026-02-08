"use client";

import { useParams } from "next/navigation";
import KuitansiOrchestratorPage from "@/components/KuitansiUmum";

export default function Page() {
  const params = useParams();
  const jenis = params?.jenis as string;
  const id = params?.id as string;

  if (!jenis || !id) {
    return <div>Data tidak lengkap</div>;
  }

  return (
    <KuitansiOrchestratorPage
      jenis={jenis}
      mode="edit"
      id={id}
    />
  );
}
