"use client";

import "@/styles/preview/preview-bon-pesanan.css";
import "@/styles/preview/preview-kuitansi-satu.css";

import KopSurat from "@/components/KopSurat";

type Props = {
  data: any;
  step: number;
};

type ItemBarang = {
  nama: string;
  qty: number;
  satuan: string;
  harga: number;
};

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

export default function PreviewKuitansiDua({ data, step }: Props) {

	const bon = data.bonPesanan || {};
	const tujuan = bon.tujuan || {};
	const isi = bon.isi || {};

  /* ================= PERHITUNGAN ================= */
  const items = data.barang || [];
	const total = items.reduce(
	  (sum: number, i: any) => sum + i.qty * i.harga,
	  0
	);

	const ppnPersen = data.pajak?.ppnPersen ?? 0;
	const pphPersen = data.pajak?.pphPersen ?? 0;

	const ppn = (total * ppnPersen) / 100;
	const pph = (total * pphPersen) / 100;

	const totalAfterTax = total + ppn - pph;
	
  return (
    <div className="bp-page">

      {/* ================= KOP SURAT ================= */}
      <KopSurat />

      {/* ================= HEADER SURAT ================= */}
		<div className="bp-header-left">
		  <div>Nomor : {bon.noSuratPesanan || "—"}</div>
		  <div>Perihal : {bon.perihal || "—"}</div>
		</div>

		<div className="bp-header-right">
		  {bon.tempatPesanan || "—"}, {formatTanggalIndo(bon.tanggalPesanan) || "—"}
		</div>

      {/* ================= TUJUAN ================= */}
		<div className="bp-tujuan">
		  Kepada <br />
		  Yth. {tujuan.kepada || "—"} <br />
		  di {tujuan.lokasi || "—"}
		</div>

      {/* ================= JUDUL ================= */}
      <h2 className="bp-title">BON PESANAN</h2>

      {/* ================= ISI SURAT ================= */}
      <div className="bp-body-text">
        Dengan hormat, melalui Anggaran {data.bonPesanan.isi.periodeAnggaran || "PERIODE ANGGARAN"},
        SMAS BINA BANGSA SUNGAI RAYA akan menyelenggarakan kegiatan {data.bonPesanan.isi.uraianKegiatan || "URAIAN KEGIATAN"}
        <br /><br />
        Sehubungan dengan hal tersebut di atas, kami mengharapkan kepada
        Saudara untuk dapat memenuhi pesanan {data.bonPesanan.isi.uraianPesanan} sebagai berikut :
      </div>

	  {/* ================= TABEL ================= */}
      <table className="preview-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Uraian</th>
            <th>Qty</th>
            <th>Satuan</th>
            <th>Harga Satuan</th>
            <th>Jumlah</th>
          </tr>
        </thead>

		<tbody>
		  {items.length === 0 && (
			<tr>
			  <td colSpan={6} style={{ textAlign: "center", padding: "12px" }}>
				Belum ada data barang
			  </td>
			</tr>
		  )}

		  {items.map((item: any, i: number) => {
			const jumlah = item.qty * item.harga;

			return (
			  <tr key={i}>
				<td>{i + 1}</td>
				<td>{item.namaBarang || "—"}</td>
				<td>{item.qty}</td>
				<td>{item.satuan || "-"}</td>
				<td className="harga-cell">
				  Rp {item.harga.toLocaleString("id-ID")}
				</td>
				<td className="jumlah-cell">
				  {jumlah.toLocaleString("id-ID")}
				</td>
			  </tr>
			);
		  })}

		  <tr className="table-footer">
			<td colSpan={5}>Jumlah</td>
			<td className="jumlah-cell">
			  {total.toLocaleString("id-ID")}
			</td>
		  </tr>

		  <tr className="table-footer">
			<td colSpan={5}>PPN ({ppnPersen}%)</td>
			<td className="jumlah-cell">
			  {ppn.toLocaleString("id-ID")}
			</td>
		  </tr>

		  <tr className="table-footer">
			<td colSpan={5}>PPh ({pphPersen}%)</td>
			<td className="jumlah-cell">
			  {pph.toLocaleString("id-ID")}
			</td>
		  </tr>

		  <tr className="table-footer bold">
			<td colSpan={5}>Jumlah Setelah Pajak</td>
			<td className="jumlah-cell bold">
			  {totalAfterTax.toLocaleString("id-ID")}
			</td>
		  </tr>
		</tbody>

      </table>

      {/* ================= PENUTUP ================= */}
      <div className="bp-footer-text">
        Demikian pesanan ini kami ajukan, atas perhatian dan kerjasama
        yang baik kami ucapkan terima kasih.
      </div>

      {/* ================= TANDA TANGAN ================= */}
      <div className="bp-signature-right">
        <br />
        {data.penyerahan.persetujuan.jabatan || "Kepala Sekolah"}
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <b>{data.penyerahan.persetujuan.nama || "—"}</b>
        <br />
        NIP. {data.penyerahan.pengajuan.nip || "-"}
      </div>

    </div>
  );
}
