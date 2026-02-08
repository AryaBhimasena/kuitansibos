"use client";

import "@/styles/preview/preview-bast.css";
import KopSurat from "@/components/KopSurat";

type Props = {
  data: any;
};

export default function KuitansiEmpat({ data }: Props) {
  const items = data.barang || [];
  const bast = data.bast || {};

  const formatRupiah = (n: number) => n.toLocaleString("id-ID");

  const formatTanggal = (dateStr: string) => {
    if (!dateStr) return "……………..";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bast-page">
      <KopSurat />

      {/* HEADER */}
      <div className="bast-header">
        <h2 className="bast-header-title">BERITA ACARA SERAH TERIMA</h2>
        <div className="bast-nomor">
          Nomor: {bast?.nomorbast || "...................."}
        </div>
      </div>

      {/* NARASI */}
      <div className="bast-content">
        <p className="bast-text">
          Pada hari ini <b>{bast?.haribast || "………………"}</b> tanggal{" "}
          <b>{formatTanggal(bast?.tanggalbast)}</b>, sesuai dengan yang bertanda
          tangan di bawah ini :
        </p>

        <PartyPertama data={bast?.pihakPertama} />
        <PartyKedua data={bast?.pihakKedua} />

        <p className="bast-text-statement">
          PIHAK PERTAMA menyerahkan hasil pekerjaan pengiriman barang kepada
          PIHAK KEDUA, dan PIHAK KEDUA telah menerima hasil pekerjaan tersebut
          dalam jumlah yang lengkap dan kondisi yang baik sesuai dengan rincian
          sebagai berikut :
        </p>

        {/* TABLE BARANG */}
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
            {items.map((item: any, i: number) => {
              const jumlah = item.qty * item.harga;
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.namaBarang}</td>
                  <td>{item.qty}</td>
                  <td>{item.satuan}</td>
                  <td className="harga-cell">
                    Rp {formatRupiah(item.harga)}
                  </td>
                  <td className="jumlah-cell">
                    {formatRupiah(jumlah)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= PIHAK PERTAMA ================= */

function PartyPertama({ data }: any) {
  return (
    <div className="bast-party-section">
      <div className="bast-party-label">1.</div>

      <table className="bast-party-table">
        <tbody>
          <tr><td>Nama</td><td>:</td><td>{data?.namabast || "...................."}</td></tr>
          <tr><td>Jabatan</td><td>:</td><td>{data?.jabatanbast || "...................."}</td></tr>
          <tr><td>Nama Perusahaan</td><td>:</td><td>{data?.namaPerusahaanbast || "...................."}</td></tr>
          <tr><td>Alamat Perusahaan</td><td>:</td><td>{data?.alamatPerusahaanbast || "...................."}</td></tr>
          <tr><td>No Telp/HP</td><td>:</td><td>{data?.telpbast || "...................."}</td></tr>
          <tr><td>NPWP</td><td>:</td><td>{data?.npwpbast || "...................."}</td></tr>
        </tbody>
      </table>

      <p className="bast-role">
        Sebagai Pihak yang <b>MENYERAHKAN</b>, selanjutnya disebut <b>PIHAK PERTAMA</b>
      </p>
    </div>
  );
}

/* ================= PIHAK KEDUA ================= */

function PartyKedua({ data }: any) {
  return (
    <div className="bast-party-section">
      <div className="bast-party-label">2.</div>

      <table className="bast-party-table">
        <tbody>
          <tr><td>Nama</td><td>:</td><td>{data?.namabast2 || "...................."}</td></tr>
          <tr><td>Jabatan</td><td>:</td><td>{data?.jabatanbast2 || "...................."}</td></tr>
          <tr><td>Nama Satuan Pendidikan</td><td>:</td><td>{data?.namaSekolahbast2 || "...................."}</td></tr>
          <tr><td>Alamat Satuan Pendidikan</td><td>:</td><td>{data?.alamatSekolahbast2 || "...................."}</td></tr>
          <tr><td>No Telp/HP</td><td>:</td><td>{data?.telpKepalaSekolahbast2 || "...................."}</td></tr>
        </tbody>
      </table>

      <p className="bast-role">
        Sebagai Pihak yang <b>MENERIMA</b>, selanjutnya disebut <b>PIHAK KEDUA</b>
      </p>
    </div>
  );
}
