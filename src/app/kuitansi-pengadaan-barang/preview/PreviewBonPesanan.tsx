"use client";

import "@/styles/preview/preview-bon-pesanan.css";
import KopSurat from "@/components/KopSurat";

import {
  DataPreview,
  formatRupiah,
  hitungSubtotal,
  isFooterOverflow,
  formatTanggalDDMMYYYY,
} from "./PersetujuanBarangHelper";

type Props = {
  data: DataPreview;
};

export default function PreviewBonPesanan({ data }: Props) {
  const subtotal = hitungSubtotal(data.items);

  const ppnPersen = Number(data.ppnPersen || 0);
  const pphPersen = Number(data.pphPersen || 0);

  const ppn = (subtotal * ppnPersen) / 100;
  const pph = (subtotal * pphPersen) / 100;

  const total = subtotal + ppn - pph;

  const isOverflow = isFooterOverflow(data.items);

  return (
    <>
      <div className="bp-page">

        {/* KOP SURAT */}
		<KopSurat />

        {/* HEADER SURAT */}
        <div className="bp-header">
          <div className="bp-header-left">
            <div>Nomor : {data.noBonPesanan || "..........."}</div>
            <div>Perihal : {data.perihal || "..........."}</div>
          </div>

          <div className="bp-header-right">
            {data.tempatSurat || "........"}, {formatTanggalDDMMYYYY(data.tanggal)}
          </div>
        </div>

        {/* TUJUAN */}
        <div className="bp-tujuan">
          Kepada <br />
          Yth.{data.namaToko || "........"} <br />
          di {data.tempatTujuan || "........"}
        </div>

        <h2 className="bp-title">BON PESANAN</h2>

        {/* BODY */}
        <div className="bp-body-text">
          Dengan hormat, melalui Anggaran Dana BOS/PBP Tahun 2026,{" "}
          {data.namaSekolah || "........"} akan menyelenggarakan kegiatan sesuai
          dengan perencanaan sekolah.
          <br /><br />
          {data.keteranganPesanan ||
            "Sehubungan dengan hal tersebut di atas, kami mengharapkan kepada Saudara untuk dapat memenuhi pesanan sebagai berikut :"}
        </div>

        {/* TABLE BARANG (IDENTIK DENGAN PREVIEW PERSETUJUAN BARANG) */}
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

        {!isOverflow && <BonPesananFooter data={data} />}
      </div>

      {/* PAGE 2 jika overflow */}
      {isOverflow && (
        <div className="bp-page bp-page-break">
          <BonPesananFooter data={data} />
        </div>
      )}
    </>
  );
}

/* ================= FOOTER ================= */

type FooterProps = {
  data: DataPreview;
};

function BonPesananFooter({ data }: FooterProps) {
  return (
    <>
      <div className="bp-footer-text">
        Demikian pesanan ini kami ajukan, atas perhatian dan kerjasama yang baik
        kami ucapkan terima kasih.
      </div>

      <div className="bp-signature-right">
        <br />
        Kepala {data.namaSekolah || "........"}
        <br /><br /><br /><br />
        <b>{data.namaKepala || "Nama Kepala Sekolah"}</b>
        <br />
        NIP. {data.nipKepala || "-"}
      </div>
    </>
  );
}
