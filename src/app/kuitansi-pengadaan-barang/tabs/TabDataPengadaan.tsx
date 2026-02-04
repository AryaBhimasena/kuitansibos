"use client";

export default function TabDataPengadaan({ data, setData }) {
  const update = (field, value) => {
    setData({ ...data, [field]: value });
  };
  
const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value || 0);

const handleNominalChange = (e) => {
  const rawValue = e.target.value.replace(/\D/g, ""); // hapus titik & huruf
  update("nominal", Number(rawValue));
};

  return (
    <div className="tab-form">
      <label>Tanggal</label>
      <input
        type="date"
        value={data.tanggal}
        onChange={(e) => update("tanggal", e.target.value)}
      />

      <label>No BKU</label>
      <input
        value={data.noBku}
        onChange={(e) => update("noBku", e.target.value)}
      />

      <label>No Kuitansi</label>
      <input
        value={data.noKuitansi}
        onChange={(e) => update("noKuitansi", e.target.value)}
      />

      <label>Pemberi Dana</label>
      <input
        value={data.pemberiDana}
        onChange={(e) => update("pemberiDana", e.target.value)}
      />

      <label>Nominal</label>
      <input
        value={formatRupiah(data.nominal)}
        onChange={handleNominalChange}
      />

      <label>Untuk Pembayaran</label>
      <textarea
        value={data.keteranganPembayaran}
        onChange={(e) => update("keteranganPembayaran", e.target.value)}
      />
    </div>
  );
}
