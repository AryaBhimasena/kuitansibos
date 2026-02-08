"use client";

import "@/styles/forms/kuitansi-hal-dua.css";

type Props = {
  step: number;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function KuitansiBarangHalamanEmpat({
  step,
  data,
  setData
}: Props) {
  if (step !== 5) return null;

  const resolveHari = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { weekday: "long" });
  };

  return (
    <div className="form-card">
      <h4>Step 6 – Berita Acara Serah Terima (BAST)</h4>

      {/* ================= DATA BAST ================= */}
      <h5>Data BAST</h5>

      <div className="form-group">
        <label>Nomor BAST</label>
        <input
          value={data.bast.nomorbast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                nomorbast: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Tanggal</label>
        <input
          type="date"
          value={data.bast.tanggalbast}
          onChange={e => {
            const tanggalbast = e.target.value;
            const haribast = resolveHari(tanggalbast);

            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                tanggalbast,
                haribast
              }
            }));
          }}
        />
      </div>

      <div className="form-group">
        <label>Hari (otomatis)</label>
        <input value={data.bast.haribast} disabled />
      </div>

      <hr />

      {/* ================= PIHAK PERTAMA ================= */}
      <h5>Pihak Pertama</h5>

      <div className="form-group">
        <label>Nama</label>
        <input
          value={data.bast.pihakPertama.namabast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast.pihakPertama,
                  namabast: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          value={data.bast.pihakPertama.jabatanbast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast.pihakPertama,
                  jabatanbast: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nama Perusahaan / Penyedia</label>
        <input
          value={data.bast.pihakPertama.namaPerusahaanbast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast.pihakPertama,
                  namaPerusahaanbast: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Alamat Perusahaan / Penyedia</label>
        <textarea
          rows={2}
          value={data.bast.pihakPertama.alamatPerusahaanbast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast.pihakPertama,
                  alamatPerusahaanbast: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Telp/HP</label>
        <input
          value={data.bast.pihakPertama.telpbast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast.pihakPertama,
                  telpbast: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NPWP</label>
        <input
          value={data.bast.pihakPertama.npwpbast}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast.pihakPertama,
                  npwpbast: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <hr />

      {/* ================= PIHAK KEDUA ================= */}
      <h5>Pihak Kedua</h5>

      <div className="form-group">
        <label>Nama</label>
        <input
          value={data.bast.pihakKedua.namabast2}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast.pihakKedua,
                  namabast2: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          value={data.bast.pihakKedua.jabatanbast2}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast.pihakKedua,
                  jabatanbast2: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nama Satuan Pendidikan</label>
        <input
          value={data.bast.pihakKedua.namaSekolahbast2}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast.pihakKedua,
                  namaSekolahbast2: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Alamat Satuan Pendidikan</label>
        <textarea
          rows={2}
          value={data.bast.pihakKedua.alamatSekolahbast2}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast.pihakKedua,
                  alamatSekolahbast2: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Telp/HP Kepala Sekolah</label>
        <input
          value={data.bast.pihakKedua.telpKepalaSekolahbast2}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast.pihakKedua,
                  telpKepalaSekolahbast2: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <hr />

      {/* ================= PEMERIKSA ================= */}
      <h5>Pemeriksa Barang</h5>

      <div className="form-group">
        <label>Nama</label>
        <input
          value={data.bast.pemeriksa.namabast3}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pemeriksa: {
                  ...prev.bast.pemeriksa,
                  namabast3: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP</label>
        <input
          value={data.bast.pemeriksa.nipbast3}
          onChange={e =>
            setData((prev: any) => ({
              ...prev,
              bast: {
                ...prev.bast,
                pemeriksa: {
                  ...prev.bast.pemeriksa,
                  nipbast3: e.target.value
                }
              }
            }))
          }
        />
      </div>
    </div>
  );
}
