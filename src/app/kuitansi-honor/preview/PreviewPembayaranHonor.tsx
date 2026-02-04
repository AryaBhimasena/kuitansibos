"use client";

import "@/styles/preview/preview-pembayaran-honor.css";


/* ================= TYPES ================= */

type Props = {
  data: HonorPreviewData;
};

/* ================= MAIN ================= */

export default function PreviewPembayaranHonor({ data }: Props) {
  const totalHonor = hitungTotalHonor(data.honorItems || []);
  const isOverflow = isFooterOverflowHonor(data.honorItems || []);

  return (
    <>
      {/* PAGE 1 */}
      <div className="preview-honor">

        {/* HEADER TOP */}
        <div className="preview-header-top">
          <div className="header-info">
            <div className="row">
              <span className="label">No. Kuitansi</span>
              <span className="colon">:</span>
              <span className="value">{data.noKuitansi}</span>
            </div>
            <div className="row">
              <span className="label">Tanggal</span>
              <span className="colon">:</span>
              <span className="value">
                {formatTanggalDDMMYYYY(data.tanggal)}
              </span>
            </div>
          </div>
        </div>

        <h2 className="preview-title">KUITANSI PEMBAYARAN HONOR</h2>

        {/* INFO */}
        <table className="preview-header">
          <tbody>
            <tr>
              <td>Sudah diterima dari</td>
              <td>:</td>
              <td>{data.pemberiDana || ".........."}</td>
            </tr>
            <tr>
              <td>Nama Penerima</td>
              <td>:</td>
              <td>{data.penerima?.nama}</td>
            </tr>
            <tr>
              <td>Banyaknya uang</td>
              <td>:</td>
              <td>
                <b># {formatRupiah(totalHonor)} Rupiah #</b>
              </td>
            </tr>
            <tr>
              <td>Untuk Pembayaran</td>
              <td>:</td>
              <td>{data.keteranganPembayaran}</td>
            </tr>
          </tbody>
        </table>

        {/* TABLE HONOR */}
        <table className="preview-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Uraian Honor</th>
              <th>Jumlah</th>
            </tr>
          </thead>

          <tbody>
            {data.honorItems?.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.uraian}</td>
                <td className="jumlah-cell">
                  {formatRupiah(item.nominal)}
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={2} className="footer-label">
                <b>Total Honor</b>
              </td>
              <td className="jumlah-cell">
                <b>{formatRupiah(totalHonor)}</b>
              </td>
            </tr>
          </tbody>
        </table>

        {!isOverflow && (
          <FooterHonorSection total={totalHonor} data={data} />
        )}
      </div>

      {/* PAGE 2 (AUTO BREAK) */}
      {isOverflow && (
        <div className="preview-honor page-break">
          <FooterHonorSection total={totalHonor} data={data} />
        </div>
      )}
    </>
  );
}
