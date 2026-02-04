"use client";

type Props = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

export default function TabTandaTerima({ data, setData }: Props) {
  return (
    <div className="tab-form tab-tanda-terima-scroll">

      <h4>Header Tanda Terima</h4>

      <div className="form-group">
        <label>Nama Pesanan</label>
        <input
          type="text"
          placeholder="Contoh : Pengadaan Laptop Laboratorium"
          value={data.namaPesanan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaPesanan: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Keterangan Pengadaan</label>
        <input
          type="text"
          placeholder="Contoh : Pengadaan Barang BOS Tahun 2026"
          value={data.keteranganPengadaan || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              keteranganPengadaan: e.target.value,
            }))
          }
        />
      </div>

      <h4>Nilai & Keterangan</h4>

      <div className="form-group">
        <label>Nominal (Rupiah)</label>
        <input
          type="number"
          placeholder="Contoh : 15000000"
          value={data.nominal || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              nominal: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Keterangan Tanda Terima</label>
        <input
          type="text"
          placeholder="Contoh : Telah diterima dengan baik dan lengkap"
          value={data.keteranganTandaTerima || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              keteranganTandaTerima: e.target.value,
            }))
          }
        />
      </div>

      <h4>Penerima Barang</h4>

      <div className="form-group">
        <label>Nama Penerima Barang</label>
        <input
          type="text"
          placeholder="Nama Penerima"
          value={data.penerima?.namaPenerima || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                namaPenerima: e.target.value,
              }
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP Penerima Barang</label>
        <input
          type="text"
          placeholder="NIP"
          value={data.penerima?.nipPenerima || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                nipPenerima: e.target.value,
              }
            }))
          }
        />
      </div>

      <h4>Pihak Yang Menyerahkan Barang</h4>

      <div className="form-group">
        <label>Nama Toko / CV</label>
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

      <div className="form-group">
        <label>Jabatan Penyerah Barang</label>
        <input
          type="text"
          placeholder="Contoh : Direktur / Pemilik"
          value={data.jabatanPenyerah || ""}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              jabatanPenyerah: e.target.value,
            }))
          }
        />
      </div>

      <h4>Mengetahui</h4>

      <div className="form-group">
        <label>Nama Kepala Sekolah</label>
        <input
          type="text"
          placeholder="Nama Kepala Sekolah"
          value={data.namaKepala}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaKepala: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP Kepala Sekolah</label>
        <input
          type="text"
          placeholder="NIP"
          value={data.nipKepala}
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
