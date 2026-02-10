import KuitansiSatu from "@/components/preview/kuitansi-satu";
import KuitansiDua from "@/components/preview/kuitansi-dua";
import KuitansiTiga from "@/components/preview/kuitansi-tiga";
import KuitansiEmpat from "@/components/preview/kuitansi-empat";
import KuitansiLima from "@/components/preview/kuitansi-lima";
import PreviewKuitansiHonorSatu from "@/components/preview/kuitansi-honor-satu";
import PreviewKuitansiHonorDua from "@/components/preview/kuitansi-honor-dua";

/* ============================================================
 * DAFTAR HALAMAN PREVIEW (DEFAULT: BARANG / KONSUMSI / PERJALANAN)
 * ============================================================ */
const pages = [
  KuitansiSatu,
  KuitansiDua,
  KuitansiTiga,
  KuitansiEmpat,
  KuitansiLima,
  PreviewKuitansiHonorSatu,
  PreviewKuitansiHonorDua,
];

/* ============================================================
 * DAFTAR HALAMAN PREVIEW KHUSUS HONOR (HANYA 2 HALAMAN)
 * ============================================================ */
const honorPages = [
  PreviewKuitansiHonorSatu,
  PreviewKuitansiHonorDua,
];

/* ============================================================
 * JENIS KUITANSI YANG DIDUKUNG PREVIEW
 * ============================================================ */
const PREVIEW_SUPPORTED = [
  "BARANG",
  "KONSUMSI",
  "PERJALANAN",
  "HONOR",
];

/* ============================================================
 * SINGLE PAGE PREVIEW (UNTUK UI)
 * ============================================================ */
export function isLandscapePage(
  jenis: string,
  page: number
) {
  // HONOR → hanya halaman ke-2 (index 1)
  if (jenis === "HONOR" && page === 1) {
    return true;
  }

  return false;
}

export function renderKuitansiPreview(
  jenis: string,
  payload: any,
  page: number
) {
  if (!PREVIEW_SUPPORTED.includes(jenis)) return null;

  /* ------------------------------------------------------------
   * KHUSUS HONOR → HANYA 2 PAGE
   * ------------------------------------------------------------ */
  if (jenis === "HONOR") {
    const PageComponent = honorPages[page];
    if (!PageComponent) return null;
    return <PageComponent data={payload} />;
  }

  /* ------------------------------------------------------------
   * BARANG / KONSUMSI / PERJALANAN
   * ------------------------------------------------------------ */
  const PageComponent = pages[page];
  if (!PageComponent) return null;

  return <PageComponent data={payload} />;
}

/* ============================================================
 * ALL PAGE PREVIEW (KHUSUS EXPORT PDF)
 * ============================================================ */
export function renderAllKuitansiPreview(jenis: string, payload: any) {
  if (!PREVIEW_SUPPORTED.includes(jenis)) return null;

  /* ------------------------------------------------------------
   * HONOR → EXPORT HANYA 2 PAGE
   * ------------------------------------------------------------ */
  if (jenis === "HONOR") {
    return honorPages.map((PageComponent, i) => (
		<div
		  key={i}
		  className={`preview-paper pdf-page ${
			isLandscapePage(jenis, i)
			  ? "preview-paper-landscape pdf-page-landscape"
			  : "preview-paper pdf-page"
		  }`}
		>
		  <PageComponent data={payload} />
		</div>
    ));
  }

  /* ------------------------------------------------------------
   * BARANG / KONSUMSI / PERJALANAN → EXPORT 5 PAGE
   * ------------------------------------------------------------ */
  return pages.map((PageComponent, i) => (
    <div key={i} className="preview-paper pdf-page">
      <PageComponent data={payload} />
    </div>
  ));
}
