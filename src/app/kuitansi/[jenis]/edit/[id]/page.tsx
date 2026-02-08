// app/kuitansi/[jenis]/edit/[id]/page.tsx

import KuitansiOrchestratorPage from "@/components/KuitansiUmum";

export default async function Page({ params }) {
  const { jenis, id } = await params;

  return (
    <KuitansiOrchestratorPage
      jenis={jenis}
      mode="edit"
      id={id}
    />
  );
}
