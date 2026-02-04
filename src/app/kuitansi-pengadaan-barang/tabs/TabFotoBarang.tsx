"use client";

export default function TabFotoBarang({ data, setData }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setData({ ...data, fotoBarang: files });
  };

  return (
    <div className="tab-form">
      <input type="file" multiple onChange={handleUpload} />
      <p>{data.fotoBarang.length} file dipilih</p>
    </div>
  );
}
