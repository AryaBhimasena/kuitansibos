"use client";

import "@/styles/forms/kuitansi-hal-satu.css";

type Props = {
  jenis: "HONOR" | string;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function Step4PenyerahanDana({
  jenis,
  data,
  setData,
}: Props) {
  const stepLabel =
    jenis === "HONOR"
      ? "Step 2 – Data Penerima"
      : "Step 3 – Data Penerima";

  return (
    <div className="form-card">
      <h4>{stepLabel}</h4>

      <div className="form-group">
        <label>Penerima Dana</label>
        <input
          value={data.penerima.penerimaDana}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                penerimaDana: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nama Bank</label>
        <input
          value={data.penerima.namaBank}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                namaBank: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Rekening</label>
        <input
          value={data.penerima.noRekening}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                noRekening: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nama Rekening</label>
        <input
          value={data.penerima.namaRekening}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                namaRekening: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>NPWP</label>
        <input
          value={data.penerima.npwp}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              penerima: {
                ...prev.penerima,
                npwp: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  );
}
