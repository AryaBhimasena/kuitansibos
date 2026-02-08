"use client";

import "@/styles/preview/preview-bast.css";

type Props = {
  data: any;
  step: number;
};

export default function KuitansiLima({ data, step }: Props) {
  const bast = data.bast || {};

  return (
    <div className="bast-page bast-page-break">
      <p className="bast-text">
        Berita Acara Serah Terima berfungsi sebagai bukti serah terima hasil
        pekerjaan kepada PIHAK KEDUA, untuk selanjutnya dicatat pada buku
        penerimaan barang Satuan Pendidikan.
      </p>

      <p className="bast-text">
        Demikian Berita Acara Serah Terima ini dibuat dengan sebenarnya untuk
        dipergunakan sebagaimana mestinya.
      </p>

      {/* TANDA TANGAN */}
      <div className="bast-signature-section">
        <div className="bast-sig-row">
          {/* PIHAK KEDUA */}
          <div className="bast-sig-box">
            <div>PIHAK KEDUA</div>
            <br /><br /><br /><br /><br />
            <b>{bast?.pihakKedua?.namabast2 || "Nama Pihak Kedua"}</b>
            <div>{bast?.pihakKedua?.jabatanbast2 || "Jabatan"}</div>
          </div>

          {/* PIHAK PERTAMA */}
          <div className="bast-sig-box">
            <div>PIHAK PERTAMA</div>
            <br /><br /><br /><br /><br />
            <b>{bast?.pihakPertama?.namabast || "Nama Pihak Pertama"}</b>
            <div>{bast?.pihakPertama?.jabatanbast || "Jabatan"}</div>
          </div>
        </div>

        {/* PEMERIKSA */}
        <div className="bast-sig-row-center">
          <div className="bast-sig-box">
            <div>Pemeriksa Barang</div>
            <br /><br /><br /><br /><br />
            <b>{bast?.pemeriksa?.namabast3 || "Nama Pemeriksa"}</b>
            <div>NIP. {bast?.pemeriksa?.nipbast3 || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
