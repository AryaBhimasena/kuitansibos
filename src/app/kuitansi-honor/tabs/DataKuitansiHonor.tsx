"use client";

type Props = {
  data: any;
  setData: (val: any) => void;
};

export default function DataKuitansiHonor({ data, setData }: Props) {
  const update = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value || 0);

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    update("nominal", Number(raw));
  };

  return (
    <div className="tab-form">

      <label>Tanggal</label>
      <input
        type="date"
        value={data.tanggal}
        onChange={(e) => update("tanggal", e.target.value)}
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
        onChange={(e) =>
          update("keteranganPembayaran", e.target.value)
        }
      />

    </div>
  );
}
