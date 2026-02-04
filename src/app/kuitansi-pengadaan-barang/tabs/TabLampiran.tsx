"use client";

export default function TabLampiran({ data, setData }) {
  const lampiran = data.lampiran || {};

  const update = (field, value) => {
    setData({
      ...data,
      lampiran: { ...lampiran, [field]: value }
    });
  };

  return (
    <div className="tab-form">
      <input placeholder="No Surat" value={lampiran.noSurat||""} onChange={(e)=>update("noSurat",e.target.value)}/>
      <input placeholder="Perihal" value={lampiran.perihal||""} onChange={(e)=>update("perihal",e.target.value)}/>
      <input placeholder="Penerima Surat" value={lampiran.penerima||""} onChange={(e)=>update("penerima",e.target.value)}/>
      <textarea placeholder="Keterangan Pengadaan" value={lampiran.keterangan||""} onChange={(e)=>update("keterangan",e.target.value)}/>
    </div>
  );
}
