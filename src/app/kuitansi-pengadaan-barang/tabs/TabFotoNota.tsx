"use client";

export default function TabFotoNota({ data, setData }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setData({ ...data, fotoNota: files });
  };

  return (
    <div className="tab-form">
      <input type="file" multiple onChange={handleUpload} />
      <p>{data.fotoNota.length} file dipilih</p>
    </div>
  );
}
