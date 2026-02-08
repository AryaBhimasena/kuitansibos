export type JenisKuitansi =
  | "BARANG"
  | "KONSUMSI"
  | "PERJALANAN"
  | "HONOR";

export function mapJenisKuitansi(raw: string | null): JenisKuitansi {
  switch (raw) {
    case "pengadaan":
      return "BARANG";
    case "konsumsi":
      return "KONSUMSI";
    case "perjalanan":
      return "PERJALANAN";
    case "honor":
      return "HONOR";
    default:
      return "BARANG";
  }
}