import KuitansiOrchestratorPage from "./kuitansiClient";

export default function Page({
  searchParams,
}: {
  searchParams: {
    id?: string;
    jenis?: string;
    title?: string;
  };
}) {
  return (
    <KuitansiOrchestratorPage
      id={searchParams.id}
      jenis={searchParams.jenis}
      title={searchParams.title}
    />
  );
}
