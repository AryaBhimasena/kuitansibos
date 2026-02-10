export const JENIS_MAP: Record<string, string> = {
  "Pengadaan Barang": "pengadaan",
  "Konsumsi": "konsumsi",
  "Perjalanan Dinas": "perjalanan",
  "Honor": "honor",
};

export const JENIS_OPTIONS = Object.keys(JENIS_MAP);

export function formatTanggalIndo(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getTahapAktif() {
  const month = new Date().getMonth() + 1;
  return month <= 6
    ? "Tahap 1 (Januari - Juni)"
    : "Tahap 2 (Juli - Desember)";
}
