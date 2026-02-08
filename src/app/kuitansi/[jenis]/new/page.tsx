import KuitansiOrchestratorPage from "@/components/KuitansiUmum";

export default async function Page({ params }) {
	
  const { jenis } = await params;
	
  return (
    <KuitansiOrchestratorPage
      jenis={params.jenis}
      mode="create"
    />
  );
}
