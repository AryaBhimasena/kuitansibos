"use client";

import Image from "next/image";
import "@/styles/kop-surat.css";

export default function KopSurat() {
  return (
    <div className="kop-wrapper">

      <div className="kop-header">
        {/* LOGO */}
        <div className="kop-logo">
          <Image
            src="/logo-sekolah.jpg"
            alt="Logo Sekolah"
            width={90}
            height={90}
          />
        </div>

        {/* TEXT */}
        <div className="kop-text">
          <div className="kop-yayasan">
            YAYASAN PENDIDIKAN BINA NUSANTARA DAN PEMBERDAYAAN MASYARAKAT
          </div>

          <div className="kop-sekolah">
            SMAS BINA BANGSA SUNGAI RAYA
          </div>

          <div className="kop-info">
            <span><b>NPSN : 30101071</b></span>
            <span className="kop-gap"></span>
            <span><b>AKREDITASI : B</b></span>
          </div>

          <div className="kop-alamat">
            Alamat : Jln. KH. Abdurrahman Wahid Desa Sungai Asam Kec. Sungai Raya Kab. Kubu Raya Kode POS 78391
          </div>
        </div>
      </div>

      {/* DOUBLE LINE */}
      <div className="kop-line">
        <div className="kop-line-thin"></div>
        <div className="kop-line-thick"></div>
      </div>

    </div>
  );
}
