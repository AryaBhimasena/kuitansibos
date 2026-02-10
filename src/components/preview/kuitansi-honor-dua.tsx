"use client";

/* ============================================================
 * STYLES
 * ============================================================ */
import "@/styles/preview/kuitansi-honor-hal-dua.css";

/* ============================================================
 * COMPONENTS
 * ============================================================ */
import KopSurat from "@/components/KopSurat";

/* ============================================================
 * TYPES
 * ============================================================ */
type Props = {
  data: any;
};

/* ============================================================
 * HELPERS
 * ============================================================ */
function formatTanggalIndo(dateValue: any) {
  if (!dateValue) return "..............";

  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return "..............";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ============================================================
 * PREVIEW KUITANSI HONOR - HALAMAN 2 (LANDSCAPE)
 * ============================================================ */
export default function PreviewKuitansiHonorDua({ data }: Props) {
  /* ==========================================================
   * DATA EXTRACTION (SESUAI FORM)
   * ========================================================== */
  const honorItems = data.penerimaHonor || [];
  const kegiatan = data.kegiatan || {};
  const penandatangan = data.penyerahan || {};

  /* ==========================================================
   * PERHITUNGAN TOTAL
   * ========================================================== */
  const totalDana = honorItems.reduce(
    (sum: number, i: any) => sum + (i.jumlahDana || 0),
    0
  );

  const totalPph = honorItems.reduce(
    (sum: number, i: any) => sum + (i.pph21 || 0),
    0
  );

  const totalDiterima = honorItems.reduce(
    (sum: number, i: any) =>
      sum + (i.jumlahDiterima ?? ((i.jumlahDana || 0) - (i.pph21 || 0))),
    0
  );

  /* ==========================================================
   * RENDER
   * ========================================================== */
  return (
    <div className="honor-page landscape">
      {/* ================= KOP SURAT ================= */}
      <KopSurat />

      {/* ================= JUDUL ================= */}
      <h2 className="honor-title">
        {data.kuitansi.keteranganDana || "URAIAN KEGIATAN"}
      </h2>

      {/* ================= TABEL HONOR ================= */}
      <table className="honor-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama / NIP</th>
            <th>Jabatan Tim</th>
            <th>Pangkat / Gol</th>
            <th>No. Rekening</th>
            <th>NIK</th>
            <th>Jumlah Dana</th>
            <th>PPh 21</th>
            <th>Jumlah Diterima</th>
            <th>Paraf</th>
          </tr>
        </thead>

        <tbody>
          {honorItems.length === 0 && (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "12px" }}>
                Belum ada data penerima honor
              </td>
            </tr>
          )}

          {honorItems.map((item: any, i: number) => {
            const diterima =
              item.jumlahDiterima ??
              ((item.jumlahDana || 0) - (item.pph21 || 0));

            return (
              <tr key={i}>
                <td>{i + 1}</td>
				<td>{item.namaHonor || "—"} / {item.nipHonor || "-"}</td>
                <td>{item.jabatanTim || "—"}</td>
                <td>{item.pangkatGol || "—"}</td>
                <td>{item.noRekening || "—"}</td>
                <td>{item.nik || "—"}</td>
                <td className="angka">
                  Rp {item.jumlahDana?.toLocaleString("id-ID") || "0"}
                </td>
                <td className="angka">
                  Rp {item.pph21?.toLocaleString("id-ID") || "0"}
                </td>
                <td className="angka">
                  Rp {diterima.toLocaleString("id-ID")}
                </td>
                <td />
              </tr>
            );
          })}

          {/* ================= FOOTER TOTAL ================= */}
          <tr className="table-footer bold">
            <td colSpan={6}>Jumlah Total</td>
            <td className="angka">
              Rp {totalDana.toLocaleString("id-ID")}
            </td>
            <td className="angka">
              Rp {totalPph.toLocaleString("id-ID")}
            </td>
            <td className="angka">
              Rp {totalDiterima.toLocaleString("id-ID")}
            </td>
            <td />
          </tr>
        </tbody>
      </table>

      {/* ================= FOOTER HALAMAN ================= */}
      <div className="honor-footer-info">
        {kegiatan.tempat || ".................."},{" "}
        {formatTanggalIndo(kegiatan.tanggal)}
      </div>

      {/* ================= TANDA TANGAN ================= */}
      <div className="honor-signature">
        <div className="ttd-block">
          Setuju dibayar
          <br />
          Kepala Sekolah
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <b>{penandatangan.persetujuan?.nama || "—"}</b>
          <br />
          NIP. {penandatangan.persetujuan?.nip || "-"}
        </div>

        <div className="ttd-block">
          Bendahara
          <br /><br /><br /><br />
          <br /><br /><br /><br />
          <b>{penandatangan.pengajuan?.nama || "—"}</b>
          <br />
          NIP. {penandatangan.pengajuan?.nip || "-"}
        </div>
      </div>
    </div>
  );
}
