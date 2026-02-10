"use client";

import "@/styles/forms/kuitansi-hal-satu.css";

type Props = {
  jenis: "HONOR" | string;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function Step4PenyerahanDana({
  jenis,
  data,
  setData,
}: Props) {
  const stepLabel =
    jenis === "HONOR"
      ? "Step 3 – Persetujuan"
      : "Step 4 – Persetujuan";

  return (
    <div className="form-card">
      <h4>{stepLabel}</h4>

      <div className="form-group">
        <label>Tanggal Penyerahan</label>
        <input
          type="date"
          value={data.penyerahan.tanggalPenyerahan}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                tanggalPenyerahan: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Tanggal Pengajuan</label>
        <input
          type="date"
          value={data.penyerahan.tanggalPengajuan}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                tanggalPengajuan: e.target.value,
              },
            }))
          }
        />
      </div>
	  
      <div className="form-group">
        <label>Tempat</label>
        <input
		value={data.penyerahan.lokasiPenyerahan}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                lokasiPenyerahan: e.target.value,
              },
            }))
          }
        />
      </div>

      <hr />

      <h5>Persetujuan</h5>

      <div className="form-group">
        <label>Nama</label>
        <input
          value={data.penyerahan.persetujuan.nama}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                persetujuan: {
                  ...prev.penyerahan.persetujuan,
                  nama: e.target.value,
                },
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          value={data.penyerahan.persetujuan.jabatan}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                persetujuan: {
                  ...prev.penyerahan.persetujuan,
                  jabatan: e.target.value,
                },
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP</label>
        <input
          value={data.penyerahan.persetujuan.nip}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                persetujuan: {
                  ...prev.penyerahan.persetujuan,
                  nip: e.target.value,
                },
              },
            }))
          }
        />
      </div>

      <hr />

      <h5>Pengajuan</h5>

      <div className="form-group">
        <label>Nama</label>
        <input
          value={data.penyerahan.pengajuan.nama}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                pengajuan: {
                  ...prev.penyerahan.pengajuan,
                  nama: e.target.value,
                },
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          value={data.penyerahan.pengajuan.jabatan}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                pengajuan: {
                  ...prev.penyerahan.pengajuan,
                  jabatan: e.target.value,
                },
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP</label>
        <input
          value={data.penyerahan.pengajuan.nip}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penyerahan: {
                ...prev.penyerahan,
                pengajuan: {
                  ...prev.penyerahan.pengajuan,
                  nip: e.target.value,
                },
              },
            }))
          }
        />
      </div>
    </div>
  );
}
