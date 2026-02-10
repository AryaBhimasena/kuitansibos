"use client";

import "@/styles/forms/kuitansi-hal-satu.css";

type Props = {
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function Step1DataKuitansi({
  data,
  setData,
}: Props) {
  return (
    <div className="form-card">
      <h4>Step 1 – Data Kuitansi</h4>

      <div className="form-group">
        <label>No BKU</label>
        <input
          value={data.kuitansi.noBku}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              kuitansi: {
                ...prev.kuitansi,
                noBku: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>No Kuitansi</label>
        <input
          value={data.kuitansi.noKuitansi}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              kuitansi: {
                ...prev.kuitansi,
                noKuitansi: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Pemberi Dana</label>
        <input
          value={data.kuitansi.pemberiDana}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              kuitansi: {
                ...prev.kuitansi,
                pemberiDana: e.target.value,
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Nominal Dana</label>
        <input
          type="number"
          value={data.kuitansi.nominalDana}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              kuitansi: {
                ...prev.kuitansi,
                nominalDana: Number(e.target.value),
              },
            }))
          }
        />
      </div>

      <div className="form-group">
        <label>Keterangan Dana</label>
        <textarea
          rows={3}
          value={data.kuitansi.keteranganDana}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              kuitansi: {
                ...prev.kuitansi,
                keteranganDana: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  );
}
