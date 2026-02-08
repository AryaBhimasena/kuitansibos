"use client";

import { useParams } from "next/navigation";
import KuitansiOrchestratorPage from "@/components/KuitansiUmum";

export default function Page() {
  const params = useParams();
  const jenis = params?.jenis as string;

  if (!jenis) {
    return <div>Jenis kuitansi tidak ditemukan</div>;
  }

  return (
    <KuitansiOrchestratorPage
      jenis={jenis}
      mode="create"
    />
  );
}
