"use client";

export default function TabPembayaran({ data, setData }) {
  const pembayaran = data.pembayaran || {};

  const update = (field, value) => {
    setData({
      ...data,
      pembayaran: { ...pembayaran, [field]: value }
    });
  };

  return (
    <div className="tab-form">
      <label>Tanggal Bayar</label>
      <input type="date" value={pembayaran.tanggal||""} onChange={(e)=>update("tanggal",e.target.value)}/>
      <input placeholder="Metode Pembayaran" value={pembayaran.metode||""} onChange={(e)=>update("metode",e.target.value)}/>
    </div>
  );
}
