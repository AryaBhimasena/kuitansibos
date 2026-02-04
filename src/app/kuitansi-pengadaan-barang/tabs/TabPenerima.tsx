"use client";

export default function TabPenerima({ data, setData }) {
  const penerima = data.penerima ?? {
    namaPenerima: "",
    bank: "",
    noRekening: "",
    atasNama: "",
    npwp: ""
  };

  const update = (field, value) => {
    setData({
      ...data,
      penerima: {
        ...penerima,
        [field]: value
      }
    });
  };

  return (
    <div className="tab-form">

      <input
        placeholder="Nama Penerima"
        value={penerima.namaPenerima}
        onChange={e => update("namaPenerima", e.target.value)}
      />

      <input
        placeholder="Nama Bank"
        value={penerima.bank}
        onChange={e => update("bank", e.target.value)}
      />

      <input
        placeholder="No Rekening"
        value={penerima.noRekening}
        onChange={e => update("noRekening", e.target.value)}
      />

      <input
        placeholder="Rekening a.n"
        value={penerima.atasNama}
        onChange={e => update("atasNama", e.target.value)}
      />

      <input
        placeholder="NPWP"
        value={penerima.npwp}
        onChange={e => update("npwp", e.target.value)}
      />

    </div>
  );
}
