"use client";

import "@/styles/preview/preview-bast.css";
import KopSurat from "@/components/KopSurat";
import {
  DataPreview,
  formatRupiah,
  hitungSubtotal,
} from "./PersetujuanBarangHelper";

type Props = {
  data: any;
};

export default function PreviewBAST({ data }: Props) {
  const items = data.items || [];
  const subtotal = hitungSubtotal(items);

  const ppnPersen = Number(data.ppnPersen || 0);
  const pphPersen = Number(data.pphPersen || 0);

  const ppn = (subtotal * ppnPersen) / 100;
  const pph = (subtotal * pphPersen) / 100;
  const total = subtotal + ppn - pph;

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
    <>
      {/* ================= PAGE 1 ================= */}
      <div className="bast-page">
	  <KopSurat />

        {/* HEADER */}
        <div className="bast-header">
          <h2 className="bast-header-title">BERITA ACARA SERAH TERIMA</h2>
          <div className="bast-nomor">
            Nomor: {data.bast?.nomor || "...................."}
          </div>
        </div>

        {/* NARASI PEMBUKA */}
        <div className="bast-content">
          <p className="bast-text">
            Pada hari ini <b>{data.bast?.hari || "………………"}</b> tanggal{" "}
            <b>{formatTanggal(data.bast?.tanggal)}</b>, sesuai dengan yang bertanda
            tangan di bawah ini :
          </p>

          {/* PIHAK 1 */}
          <PartySection
            label="1."
            data={data.bast?.pihakPertama}
            role="MENYERAHKAN"
            title="PIHAK PERTAMA"
            isSekolah={false}
          />

          {/* PIHAK 2 */}
          <PartySection
            label="2."
            data={data.bast?.pihakKedua}
            role="MENERIMA"
            title="PIHAK KEDUA"
            isSekolah={true}
          />

          <p className="bast-text-statement">
            PIHAK PERTAMA menyerahkan hasil pekerjaan pengiriman barang kepada
            PIHAK KEDUA, dan PIHAK KEDUA telah menerima hasil pekerjaan tersebut
            dalam jumlah yang lengkap dan kondisi yang baik sesuai dengan rincian
            sebagai berikut :
          </p>

          {/* TABLE BARANG (SAMA DENGAN PREVIEW PERSETUJUAN BARANG) */}
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
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
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
            <div className="bast-sig-box">
              <div>PIHAK KEDUA</div>
              <div className="bast-sig-space"></div>
			  <br /><br /><br /><br /><br /><br />
              <b>{data.bast?.pihakKedua?.nama || "Nama Pihak Kedua"}</b>
              <div>{data.bast?.pihakKedua?.jabatan || "Jabatan"}</div>
            </div>

            <div className="bast-sig-box">
              <div>PIHAK PERTAMA</div>
              <div className="bast-sig-space"></div>
			  <br /><br /><br /><br /><br /><br />
              <b>{data.bast?.pihakPertama?.nama || "Nama Pihak Pertama"}</b>
              <div>{data.bast?.pihakPertama?.jabatan || "Jabatan"}</div>
            </div>
          </div>

          <div className="bast-sig-row-center">
            <div className="bast-sig-box">
              <div>Pemeriksa Barang</div>
			  <br /><br /><br /><br /><br /><br />
              <div className="bast-sig-space"></div>
              <b>{data.bast?.pemeriksa?.nama || "Nama Pemeriksa"}</b>
              <div>NIP. {data.bast?.pemeriksa?.nip || "-"}</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

/* ================= HELPER PARTY ================= */

function PartySection({
  label,
  data,
  role,
  title,
  isSekolah,
}: any) {
  return (
    <div className="bast-party-section">
      <div className="bast-party-label">{label}</div>
      <table className="bast-party-table">
        <tbody>
          <tr><td>Nama</td><td>:</td><td>{data?.nama || "...................."}</td></tr>
          <tr><td>Jabatan</td><td>:</td><td>{data?.jabatan || "...................."}</td></tr>

          {isSekolah ? (
            <>
              <tr><td>Nama Satuan Pendidikan</td><td>:</td><td>{data?.namaSekolah || "...................."}</td></tr>
              <tr><td>Alamat Satuan Pendidikan</td><td>:</td><td>{data?.alamatSekolah || "...................."}</td></tr>
              <tr><td>No Telp/HP</td><td>:</td><td>{data?.telpKepalaSekolah || "...................."}</td></tr>
            </>
          ) : (
            <>
              <tr><td>Nama Perusahaan</td><td>:</td><td>{data?.namaPerusahaan || "...................."}</td></tr>
              <tr><td>Alamat Perusahaan</td><td>:</td><td>{data?.alamatPerusahaan || "...................."}</td></tr>
              <tr><td>No Telp/HP</td><td>:</td><td>{data?.telp || "...................."}</td></tr>
              <tr><td>NPWP</td><td>:</td><td>{data?.npwp || "...................."}</td></tr>
            </>
          )}
        </tbody>
      </table>

      <p className="bast-role">
        Sebagai Pihak yang <b>{role}</b>, selanjutnya disebut <b>{title}</b>
      </p>
    </div>
  );
}
