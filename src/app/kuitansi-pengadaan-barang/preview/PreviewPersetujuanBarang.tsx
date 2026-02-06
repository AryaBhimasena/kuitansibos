"use client";

import "@/styles/preview/preview-persetujuan-barang.css";

import {
  DataPreview,
  formatRupiah,
  hitungSubtotal,
  hitungPPN,
  hitungTotal,
  isFooterOverflow,
  FooterSection,
  formatTanggalDDMMYYYY,
} from "./PersetujuanBarangHelper";

/* ================= TYPES ================= */

type Props = {
  data: DataPreview;
};

type FooterProps = {
  total: number;
  data: DataPreview;
};

/* ================= MAIN ================= */

export default function PreviewPersetujuanBarang({ data }: Props) {
  const subtotal = hitungSubtotal(data.items);

  const ppnPersen = Number(data.ppnPersen || 0);
  const pphPersen = Number(data.pphPersen || 0);

  const ppn = (subtotal * ppnPersen) / 100;
  const pph = (subtotal * pphPersen) / 100;

  const total = subtotal + ppn - pph;

  const isOverflow = isFooterOverflow(data.items);

  return (
    <>
      {/* PAGE 1 */}
      <div className="preview-kuitansi">
        {/* HEADER */}
		<div className="preview-header-top">
		  <div className="header-info">
			<div className="row">
			  <span className="label">No. BKU</span>
			  <span className="colon">:</span>
			  <span className="value">{data.noBku}</span>
			</div>
			<div className="row">
			  <span className="label">No. Kuitansi</span>
			  <span className="colon">:</span>
			  <span className="value">{data.noKuitansi}</span>
			</div>
		  </div>
		</div>

        <h2 className="preview-title">KUITANSI</h2>

        {/* INFO */}
        <table className="preview-header">
          <tbody>
            <tr>
              <td>Sudah diterima dari</td>
              <td>:</td>
              <td>{data.pemberiDana || ".........."}</td>
            </tr>
            <tr>
              <td>Banyaknya uang</td>
              <td>:</td>
              <td>
                <b># {formatRupiah(Number(data.nominal))} Rupiah #</b>
              </td>
            </tr>
            <tr>
              <td>Untuk Pembayaran</td>
              <td>:</td>
              <td>{data.keteranganPembayaran}</td>
            </tr>
          </tbody>
        </table>

        {/* TABLE ITEMS */}
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
			{data.items.map((item, i) => {
			  const jumlah = item.qty * item.harga;
			  return (
				<tr key={i}>
				  <td>{i + 1}</td>
				  <td>{item.nama}</td>
				  <td>{item.qty}</td>
				  <td>{item.satuan}</td>

				  {/* Harga satuan dengan x Rp sejajar */}
				  <td className="harga-cell">
					<span className="x">x</span>
					<span className="rp">Rp</span>
					<span className="harga">{formatRupiah(item.harga)}</span>
				  </td>

				  <td className="jumlah-cell">{formatRupiah(jumlah)}</td>
				</tr>
			  );
			})}

			<tr>
			  <td colSpan={5} className="footer-label">Jumlah</td>
			  <td className="jumlah-cell">{formatRupiah(subtotal)}</td>
			</tr>
			<tr>
			  <td colSpan={5} className="footer-label">
				PPN {ppnPersen}%
			  </td>
			  <td className="jumlah-cell">{formatRupiah(ppn)}</td>
			</tr>

			<tr>
			  <td colSpan={5} className="footer-label">
				PPh {pphPersen}%
			  </td>
			  <td className="jumlah-cell">{formatRupiah(pph)}</td>
			</tr>

			<tr>
			  <td colSpan={5} className="footer-label">
				<b>Jumlah Setelah Pajak</b>
			  </td>
			  <td className="jumlah-cell">
				<b>{formatRupiah(total)}</b>
			  </td>
			</tr>


		  </tbody>
		</table>

        {!isOverflow && <FooterSection total={total} data={data} />}
      </div>

      {/* PAGE 2 */}
      {isOverflow && (
        <div className="preview-kuitansi page-break">
          <FooterSection total={total} data={data} />
        </div>
      )}
    </>
  );
}
