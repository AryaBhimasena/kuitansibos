"use client";

import "@/styles/preview/preview-bon-pesanan.css";

type Props = {
  data: any;
  step: number;
};

export default function PreviewKuitansiTiga({ data, step }: Props) {

	const bon = data.bonPesanan || {};
	const tujuan = bon.tujuan || {};
	const isi = bon.isi || {};
	const items: ItemBarang[] = data.barang || [];

  /* ================= PERHITUNGAN ================= */
	const total = items.reduce(
	  (sum: number, i: any) => sum + i.qty * i.harga,
	  0
	);

	const ppnPersen = data.pajak?.ppnPersen ?? 0;
	const pphPersen = data.pajak?.pphPersen ?? 0;

	const ppn = (total * ppnPersen) / 100;
	const pph = (total * pphPersen) / 100;

	const totalAfterTax = total + ppn - pph;

function terbilang(n: number): string {
  const satuan = [
    "", "SATU", "DUA", "TIGA", "EMPAT", "LIMA",
    "ENAM", "TUJUH", "DELAPAN", "SEMBILAN",
    "SEPULUH", "SEBELAS"
  ];

  if (n < 12) return satuan[n];
  if (n < 20) return terbilang(n - 10) + " BELAS";
  if (n < 100) return terbilang(Math.floor(n / 10)) + " PULUH " + terbilang(n % 10);
  if (n < 200) return "Seratus " + terbilang(n - 100);
  if (n < 1000) return terbilang(Math.floor(n / 100)) + " RATUS " + terbilang(n % 100);
  if (n < 2000) return "Seribu " + terbilang(n - 1000);
  if (n < 1000000) return terbilang(Math.floor(n / 1000)) + " RIBU " + terbilang(n % 1000);
  if (n < 1000000000) return terbilang(Math.floor(n / 1000000)) + " JUTA " + terbilang(n % 1000000);

  return "";
}


  return (
    <div className="bp-page">
      {/* ================= JUDUL ================= */}
      <h2 className="bp-title">TANDA TERIMA PESANAN BARANG</h2>

      {/* ================= ISI SURAT ================= */}
      <div className="bp-body-uraian">
		{data.bonPesanan?.isi?.uraianPesanan || "-"}
		<br />
		{data.bonPesanan?.isi?.uraianKegiatan || "-"}
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


		{/* ================= TERBILANG ================= */}
		<div className="bp-terbilang">
		  TERBILANG : <b>{terbilang(Math.round(totalAfterTax))} RUPIAH</b>
		</div>

		{/* ================= TANGGAL & TEMPAT ================= */}
		<div className="bp-date-place">
		  {bon.tempatPesanan || "—"}, {bon.tanggalPesanan || "—"}
		</div>

		{/* ================= TANDA TANGAN ================= */}
		<div className="bp-signature-area">
Barang-barang tersebut telah diterima dengan baik dan cukup
		  {/* ===== BARIS 1 ===== */}
		  <div className="bp-sign-row">

			{/* Kolom kiri */}
			<div className="bp-sign-col left">
			  <br /><br /><br />
			  <br /><br /><br />
			  <br /><br /><br />
			  <b>{data.penyerahan.pengajuan.jabatan || "Bendahara"}</b>
			  <br />
			  NIP. {data.penyerahan.pengajuan.nip || "-"}
			</div>

			{/* Kolom kanan */}
			<div className="bp-sign-col right">
			  Yang Menyerahkan Barang,
			  <br /><br /><br />
			  <br /><br /><br />
			  <br /><br /><br />
			  <b>{tujuan.kepada || "Nama Toko"}</b>
			  <br />
			  Direktur
			</div>

		  </div>

		  {/* ===== BARIS 2 ===== */}
		  <div className="bp-sign-row center">
			Mengetahui,
			<br />
			{data.penyerahan?.persetujuan?.jabatan || "Kepala Sekolah"}
			<br /><br /><br />
			<br /><br /><br />
			<br /><br /><br />
			<div className="rata-kiri">
				<b>{data.penyerahan?.persetujuan?.nama || "Nama Kepala Sekolah"}</b>
				<br />
			NIP. {data.penyerahan?.persetujuan?.nip || "-"}
			</div>
		  </div>

		</div>
		</div>

  );
}
