"use client";

import "@/styles/preview/preview-tanda-terima.css";

import {
  DataPreview,
  formatRupiah,
  hitungSubtotal,
  formatTanggalDDMMYYYY,
  terbilang,
} from "./PersetujuanBarangHelper";

type Props = {
  data: DataPreview;
};

export default function PreviewTandaTerima({ data }: Props) {
  const subtotal = hitungSubtotal(data.items);

  const ppnPersen = Number(data.ppnPersen || 0);
  const pphPersen = Number(data.pphPersen || 0);

  const ppn = (subtotal * ppnPersen) / 100;
  const pph = (subtotal * pphPersen) / 100;

  const total = subtotal + ppn - pph;

  return (
    <div className="tt-page">

      {/* HEADER TITLE */}
      <h2 className="tt-header-title">
        TANDA TERIMA PESANAN BARANG
      </h2>

      {/* TITLE & SUBTITLE */}
      <div className="tt-title-wrapper">
        <div className="tt-title">
          {data.namaPesanan || "Nama Pesanan"}
        </div>
        <div className="tt-subtitle">
          {data.keteranganPengadaan || "Keterangan Pengadaan"}
        </div>
      </div>

      {/* TABLE BARANG (IDENTIK DENGAN PREVIEW LAIN) */}
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

                <td className="harga-cell">
                  <span className="x">x</span>
                  <span className="rp">Rp</span>
                  <span className="harga">
                    {formatRupiah(item.harga)}
                  </span>
                </td>

                <td className="jumlah-cell">
                  {formatRupiah(jumlah)}
                </td>
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

      {/* TERBILANG OTOMATIS */}
      <div className="tt-terbilang">
        Terbilang : <b>{terbilang(total)} rupiah</b>
      </div>

      {/* KETERANGAN */}
      <div className="tt-keterangan">
        Keterangan : {data.keteranganTandaTerima || "-"}
      </div>

      {/* FOOTER SIGNATURE */}
      <div className="tt-footer">

        {/* PENERIMA */}
        <div className="tt-footer-left">
		<br />
          <div>Penerima Barang</div>
          <br /><br /><br />
          <br /><br /><br />
          <b>{data.penerima?.namaPenerima || "Nama"}</b>
          <div>NIP. {data.penerima?.nipPenerima || "-"}</div>
        </div>

        {/* PENYERAH BARANG */}
        <div className="tt-footer-right">
          <div>
            {data.tempat || "........"}, {formatTanggalDDMMYYYY(data.tanggal)}
          </div>
          <div>Yang menyerahkan barang</div>
          <br /><br /><br />
          <br /><br /><br />
          <b>{data.namaToko || "Nama Toko"}</b>
          <div>{data.jabatanPenyerah || "Jabatan"}</div>
        </div>

      </div>

      {/* MENGETAHUI */}
      <div className="tt-mengetahui">
        <div>Mengetahui,</div>
        <div>Kepala Sekolah</div>
        <br /><br /><br />
        <br /><br /><br />
        <b>{data.namaKepala || "Nama Kepala Sekolah"}</b>
        <div>NIP. {data.nipKepala || "-"}</div>
      </div>

    </div>
  );
}
