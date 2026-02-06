"use client";

type Props = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
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

		{/* Tempat Surat Dibuat */}
		<div className="form-group">
		  <label>Tempat Surat Dibuat</label>
		  <input
			type="text"
			placeholder="Contoh : Pontianak"
			value={data.tempatSurat || ""}
			onChange={(e) =>
			  setData(prev => ({
				...prev,
				tempatSurat: e.target.value,
			  }))
			}
		  />
		</div>

      {/* Tanggal */}
      <div className="form-group">
        <label>Tanggal</label>
        <input
          type="date"
		  value={data.tanggal}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              tanggal: e.target.value
            }))
          }
        />
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

		{/* Tempat Tujuan */}
		<div className="form-group">
		  <label>Tempat Tujuan</label>
		  <input
			type="text"
			placeholder="Contoh : Jakarta"
			value={data.tempatTujuan || ""}
			onChange={(e) =>
			  setData(prev => ({
				...prev,
				tempatTujuan: e.target.value,
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
