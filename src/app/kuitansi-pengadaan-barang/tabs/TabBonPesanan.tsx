"use client";

type Props = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

// helper format tanggal ke dd-MM-yyyy
const formatTanggal = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export default function TabBonPesanan({ data, setData }: Props) {
  return (
    <div className="tab-form tab-bon-pesanan-scroll">

      <h4>Header Surat</h4>

      {/* Nomor Bon Pesanan */}
      <div className="form-group">
        <label>Nomor Bon Pesanan</label>
        <input
          type="text"
          placeholder="Contoh : 001/BP/2026"
          value={data.noBonPesanan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              noBonPesanan: e.target.value,
            }))
          }
        />
      </div>

      {/* Perihal */}
      <div className="form-group">
        <label>Perihal</label>
        <input
          type="text"
          placeholder="Contoh : Pemesanan ATK"
          value={data.perihal || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              perihal: e.target.value,
            }))
          }
        />
      </div>

      {/* Tempat */}
      <div className="form-group">
        <label>Tempat</label>
        <input
          type="text"
          placeholder="Contoh : Pontianak"
          value={data.tempat || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              tempat: e.target.value,
            }))
          }
        />
      </div>

      {/* Tanggal */}
      <div className="form-group">
        <label>Tanggal</label>
        <input
          type="date"
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              tanggal: formatTanggal(e.target.value),
            }))
          }
        />
        <small>Format: dd-MM-yyyy</small>
      </div>

      <h4>Tujuan</h4>

      {/* Nama CV / Toko */}
      <div className="form-group">
        <label>Nama CV / Toko</label>
        <input
          type="text"
          placeholder="Contoh : CV Sumber Jaya"
          value={data.namaToko || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaToko: e.target.value,
            }))
          }
        />
      </div>

      {/* Nama Sekolah */}
      <div className="form-group">
        <label>Nama Sekolah</label>
        <input
          type="text"
          placeholder="Contoh : SMP Negeri 1 Pontianak"
          value={data.namaSekolah || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaSekolah: e.target.value,
            }))
          }
        />
      </div>

      {/* Keterangan Pesanan */}
      <div className="form-group">
        <label>Keterangan Pesanan</label>
        <textarea
          placeholder="Contoh : Pemesanan alat tulis kantor untuk semester genap"
          value={data.keteranganPesanan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              keteranganPesanan: e.target.value,
            }))
          }
        />
      </div>

      <h4>Penandatangan</h4>

      {/* Nama Kepala Sekolah */}
      <div className="form-group">
        <label>Nama Kepala Sekolah</label>
        <input
          type="text"
          placeholder="Nama Kepala Sekolah"
          value={data.namaKepala || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaKepala: e.target.value,
            }))
          }
        />
      </div>

      {/* NIP Kepala Sekolah */}
      <div className="form-group">
        <label>NIP Kepala Sekolah</label>
        <input
          type="text"
          placeholder="NIP"
          value={data.nipKepala || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              nipKepala: e.target.value,
            }))
          }
        />
      </div>

    </div>
  );
}
