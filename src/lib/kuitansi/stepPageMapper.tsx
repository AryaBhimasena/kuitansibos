import { JenisKuitansi } from "@/lib/kuitansi-helper";

/* ============================================================
 * STEP → PREVIEW PAGE
 * ============================================================ */
export function stepToPage(
  jenis: JenisKuitansi,
  step: number
) {
  /* ------------------------------------------------------------
   * HONOR (STEP: 0, 2, 3, 6)
   * ------------------------------------------------------------ */
  if (jenis === "HONOR") {
    if (step === 0 || step === 3) return 0;
    if (step === 6) return 1;
    return 0;
  }

  /* ------------------------------------------------------------
   * BARANG / KONSUMSI / PERJALANAN
   * ------------------------------------------------------------ */
  if (step <= 3) return 0;
  if (step === 4) return 1;
  if (step === 5) return 3;

  return 0;
}

/* ============================================================
 * PREVIEW PAGE → STEP
 * ============================================================ */
export function pageToStep(
  jenis: JenisKuitansi,
  page: number
) {
  /* ------------------------------------------------------------
   * HONOR
   * ------------------------------------------------------------ */
  if (jenis === "HONOR") {
    if (page === 0) return 0;
    if (page === 1) return 6;
    return 0;
  }

  /* ------------------------------------------------------------
   * BARANG / KONSUMSI / PERJALANAN
   * ------------------------------------------------------------ */
  if (page === 0) return 0;
  if (page === 1) return 4;
  if (page === 2) return 4;
  if (page === 3) return 5;
  if (page === 4) return 5;

  return 0;
}
