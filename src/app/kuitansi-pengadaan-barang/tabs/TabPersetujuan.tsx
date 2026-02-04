"use client";

export default function TabPersetujuan({ data, setData }) {
  return (
  <div className="tab-form tab-persetujuan-scroll">
    <div className="tab-form">

      <div className="form-group">
        <label>Tanggal Lunas</label>
        <input
          type="date"
          value={data.tanggalLunas}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              tanggalLunas: e.target.value
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Tempat</label>
        <input
          type="text"
          placeholder="Contoh : Pontianak"
          value={data.tempat}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              tempat: e.target.value
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Tanggal Kuitansi</label>
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

      <h4>Disetujui Oleh</h4>

      <div className="form-group">
        <label>Nama</label>
        <input
          type="text"
          value={data.namaKepala}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaKepala: e.target.value
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          type="text"
          placeholder="Contoh : Kepala Sekolah"
          value={data.jabatanKepala}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              jabatanKepala: e.target.value
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP</label>
        <input
          type="text"
          value={data.nipKepala}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              nipKepala: e.target.value
            }))
          }
        />
      </div>

      <h4>Diajukan Oleh</h4>

      <div className="form-group">
        <label>Nama</label>
        <input
          type="text"
          value={data.namaBendahara}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              namaBendahara: e.target.value
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Jabatan</label>
        <input
          type="text"
          placeholder="Contoh : Bendahara"
          value={data.jabatanBendahara}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              jabatanBendahara: e.target.value
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NIP</label>
        <input
          type="text"
          value={data.nipBendahara}
          onChange={(e) =>
            setData(prev => ({
              ...prev,
              nipBendahara: e.target.value
            }))
          }
        />
      </div>

    </div>
  </div>
  );
}
