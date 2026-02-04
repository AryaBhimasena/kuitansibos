"use client";

import { useEffect } from "react";

type Props = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const getHariIndonesia = (dateString: string) => {
  if (!dateString) return "";
  const hari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  return hari[new Date(dateString).getDay()];
};

export default function TabBAST({ data, setData }: Props) {

  // Auto set hari dari tanggal
  useEffect(() => {
    if (data.bast?.tanggal) {
      const hari = getHariIndonesia(data.bast.tanggal);
      setData(prev => ({
        ...prev,
        bast: {
          ...prev.bast,
          hari
        }
      }));
    }
  }, [data.bast?.tanggal]);

  return (
    <div className="tab-form tab-bast-scroll">

      <h4>Header BAST</h4>

      <div className="form-group">
        <label>Nomor BAST</label>
        <input
          type="text"
          placeholder="Nomor Berita Acara Serah Terima"
          value={data.bast?.nomor || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                nomor: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Tanggal</label>
        <input
          type="date"
          value={data.bast?.tanggal || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                tanggal: e.target.value
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Hari</label>
        <input
          type="text"
          disabled
          value={data.bast?.hari || ""}
        />
      </div>

      {/* =====================================================
          PIHAK PERTAMA
      ===================================================== */}
      <h4>Pihak Pertama</h4>

      <div className="form-group">
        <label>Nama</label>
        <input
          type="text"
          value={data.bast?.pihakPertama?.nama || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast?.pihakPertama,
                  nama: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          type="text"
          value={data.bast?.pihakPertama?.jabatan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast?.pihakPertama,
                  jabatan: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nama Perusahaan / Penyedia</label>
        <input
          type="text"
          value={data.bast?.pihakPertama?.namaPerusahaan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast?.pihakPertama,
                  namaPerusahaan: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Alamat Perusahaan / Penyedia</label>
        <input
          type="text"
          value={data.bast?.pihakPertama?.alamatPerusahaan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast?.pihakPertama,
                  alamatPerusahaan: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Telp / HP</label>
        <input
          type="text"
          value={data.bast?.pihakPertama?.telp || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast?.pihakPertama,
                  telp: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NPWP</label>
        <input
          type="text"
          value={data.bast?.pihakPertama?.npwp || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakPertama: {
                  ...prev.bast?.pihakPertama,
                  npwp: e.target.value
                }
              }
            }))
          }
        />
      </div>

      {/* =====================================================
          PIHAK KEDUA
      ===================================================== */}
      <h4>Pihak Kedua</h4>

      <div className="form-group">
        <label>Nama</label>
        <input
          type="text"
          value={data.bast?.pihakKedua?.nama || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast?.pihakKedua,
                  nama: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          type="text"
          value={data.bast?.pihakKedua?.jabatan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast?.pihakKedua,
                  jabatan: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nama Satuan Pendidikan</label>
        <input
          type="text"
          value={data.bast?.pihakKedua?.namaSekolah || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast?.pihakKedua,
                  namaSekolah: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Alamat Satuan Pendidikan</label>
        <input
          type="text"
          value={data.bast?.pihakKedua?.alamatSekolah || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast?.pihakKedua,
                  alamatSekolah: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Telp / HP Kepala Sekolah</label>
        <input
          type="text"
          value={data.bast?.pihakKedua?.telpKepalaSekolah || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pihakKedua: {
                  ...prev.bast?.pihakKedua,
                  telpKepalaSekolah: e.target.value
                }
              }
            }))
          }
        />
      </div>

      {/* =====================================================
          PEMERIKSA BARANG
      ===================================================== */}
      <h4>Pemeriksa Barang</h4>

      <div className="form-group">
        <label>Nama Pemeriksa</label>
        <input
          type="text"
          value={data.bast?.pemeriksa?.nama || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pemeriksa: {
                  ...prev.bast?.pemeriksa,
                  nama: e.target.value
                }
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP Pemeriksa</label>
        <input
          type="text"
          value={data.bast?.pemeriksa?.nip || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              bast: {
                ...prev.bast,
                pemeriksa: {
                  ...prev.bast?.pemeriksa,
                  nip: e.target.value
                }
              }
            }))
          }
        />
      </div>

    </div>
  );
}
