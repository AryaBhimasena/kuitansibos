import KuitansiSatu from "@/components/preview/kuitansi-satu";
import KuitansiDua from "@/components/preview/kuitansi-dua";
import KuitansiTiga from "@/components/preview/kuitansi-tiga";
import KuitansiEmpat from "@/components/preview/kuitansi-empat";
import KuitansiLima from "@/components/preview/kuitansi-lima";

const pages = [
  KuitansiSatu,
  KuitansiDua,
  KuitansiTiga,
  KuitansiEmpat,
  KuitansiLima,
];

export function renderKuitansiPreview(
  jenis: string,
  payload: any,
  page: number
) {
  if (jenis !== "BARANG") return null;

  const PageComponent = pages[page];
  if (!PageComponent) return null;

  return <PageComponent data={payload} />;
}

// ✅ khusus untuk export PDF
export function renderAllKuitansiPreview(jenis: string, payload: any) {
  if (jenis !== "BARANG") return null;

  return pages.map((PageComponent, i) => (
    <div key={i} className="preview-paper pdf-page">
      <PageComponent data={payload} />
    </div>
  ));
}
