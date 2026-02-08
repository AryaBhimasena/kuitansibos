"use client";

import "@/styles/preview/preview-kuitansi-satu.css";

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

export default function PreviewKuitansiSatu({ data, step }: Props) {

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
    <div className="preview-kuitansi">
      {/* ================= HEADER ================= */}
      <div className="preview-header-top">
        <div className="header-info">
          <div className="row">
            <span className="label">No. BKU</span>
            <span className="colon">:</span>
			<span className="value">
			  {data.kuitansi.noBku || "—"}
			</span>
          </div>
		  
          <div className="row">
            <span className="label">No. Kuitansi</span>
            <span className="colon">:</span>
			<span className="value">
			  {data.kuitansi.noKuitansi || "—"}
			</span>
          </div>
        </div>
      </div>

      <h2 className="preview-title">KUITANSI</h2>

      {/* ================= INFO ================= */}
      <div className="preview-info">
        <div className="info-row">
          <span className="info-label">Sudah diterima dari</span>
          <span className="colon">:</span>
          <span className="info-value">
		    {data.kuitansi.pemberiDana || "—"}
		  </span>
        </div>
        <div className="info-row">
          <span className="info-label">Banyaknya uang</span>
          <span className="colon">:</span>
			<span className="info-value bold">
			  Rp {data.kuitansi.nominalDana.toLocaleString("id-ID")}
			</span>
        </div>
        <div className="info-row">
          <span className="info-label">Untuk Pembayaran</span>
          <span className="colon">:</span>
			<span className="info-value">
			  {data.kuitansi.keteranganDana || "—"}
			</span>
        </div>
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

      {/* ================= BAGIAN BAWAH ================= */}
      <div className="preview-bottom">
		<div className="bottom-left">
		  <div className="bottom-row">
			<span className="bottom-label">Nama Bank</span>
			<span className="bottom-colon">:</span>
			<span className="bottom-value">
			  {data.penerima.namaBank || "—"}
			</span>
		  </div>

		  <div className="bottom-row">
			<span className="bottom-label">No. Rekening</span>
			<span className="bottom-colon">:</span>
			<span className="bottom-value">
			  {data.penerima.noRekening || "—"}
			</span>
		  </div>

		  <div className="bottom-row">
			<span className="bottom-label">Rekening a.n</span>
			<span className="bottom-colon">:</span>
			<span className="bottom-value">
			  {data.penerima.namaRekening || "—"}
			</span>
		  </div>

		  <div className="bottom-row">
			<span className="bottom-label">NPWP</span>
			<span className="bottom-colon">:</span>
			<span className="bottom-value">
			  {data.penerima.npwp || "—"}
			</span>
		  </div>
		</div>

        <div className="bottom-right">
          <div>Yang menerima,</div>
          <div className="ttd-space" />
			<div className="ttd-name">
			  {data.penerima.penerimaDana || "—"}
			</div>
        </div>
      </div>

      <div className="preview-total-text">
        Jumlah :
        <span className="total-line">
          Rp {totalAfterTax.toLocaleString("id-ID")}
        </span>
      </div>

      {/* ================= FOOTER DOKUMEN ================= */}
      <div className="preview-lunas">
        Lunas dibayar, {formatTanggalIndo(data.penyerahan.tanggalPenyerahan) || ".............."}
        <br />
        Jumlah dalam kuitansi ini telah lunas dibayarkan kepada
        yang berhak menerimanya
      </div>

      <div className="preview-signature">
        <div>
          Setuju dibayar,
          <br />
          {data.penyerahan.persetujuan.jabatan || "Kepala Sekolah"}
			<div className="ttd-space" />
			<b>{data.penyerahan.persetujuan.nama || "—"}</b>
			<br />
			NIP. {data.penyerahan.persetujuan.nip || "-"}
        </div>

        <div>
          Pontianak, {formatTanggalIndo(data.penyerahan.tanggalPengajuan) || ".............."}
          <br />
          {data.penyerahan.pengajuan.jabatan || "Bendahara"}
			<div className="ttd-space" />
			<b>{data.penyerahan.pengajuan.nama || "—"}</b>
			<br />
			NIP. {data.penyerahan.pengajuan.nip || "-"}
        </div>
      </div>
    </div>
  );
}
