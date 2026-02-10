"use client";

import "@/styles/forms/kuitansi-hal-dua.css";

type Props = {
  step: number;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function KuitansiBarangHalamanDua({
  step,
  data,
  setData
}: Props) {

  if (step !== 4) return null;

  return (
    <div className="form-card">
      <h4>Step 5 – Bon Pesanan</h4>

      {/* ================= HEADER : DATA SURAT ================= */}
      <h5>Data Surat</h5>

      <div className="form-group">
        <label>Tanggal Pesanan</label>
        <input
          type="date"
          value={data.bonPesanan.tanggalPesanan}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                tanggalPesanan: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Tempat Pesanan</label>
        <input
          value={data.bonPesanan.tempatPesanan}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                tempatPesanan: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Surat Pesanan</label>
        <input
          value={data.bonPesanan.noSuratPesanan}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                noSuratPesanan: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Perihal</label>
        <input
          value={data.bonPesanan.perihal}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                perihal: e.target.value
              }
            }))
          }
        />
      </div>

      <hr />

      {/* ================= HEADER : TUJUAN SURAT ================= */}
      <h5>Tujuan Surat</h5>

      <div className="form-group">
        <label>Kepada</label>
        <input
          value={data.bonPesanan.tujuan.kepada}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                tujuan: {
                  ...prev.bonPesanan.tujuan,
                  kepada: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Lokasi</label>
        <input
          value={data.bonPesanan.tujuan.lokasi}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                tujuan: {
                  ...prev.bonPesanan.tujuan,
                  lokasi: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <hr />

      {/* ================= HEADER : ISI SURAT ================= */}
      <h5>Isi Surat</h5>
	  
      <div className="form-group">
        <label>Periode Anggaran</label>
        <input
          rows={3}
          value={data.bonPesanan.isi.periodeAnggaran}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                isi: {
                  ...prev.bonPesanan.isi,
                  periodeAnggaran: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Uraian Kegiatan</label>
        <textarea
          rows={3}
          value={data.bonPesanan.isi.uraianKegiatan}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                isi: {
                  ...prev.bonPesanan.isi,
                  uraianKegiatan: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Uraian Pesanan</label>
        <textarea
          rows={3}
          value={data.bonPesanan.isi.uraianPesanan}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bonPesanan: {
                ...prev.bonPesanan,
                isi: {
                  ...prev.bonPesanan.isi,
                  uraianPesanan: e.target.value
                }
              }
            }))
          }
        />
      </div>
    </div>
  );
}
