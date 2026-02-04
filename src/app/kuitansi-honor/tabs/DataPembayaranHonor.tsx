"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type HonorItem = {
  uraian: string;
  nominal: number;
};

type Props = {
  data: any;
  setData: (val: any) => void;
};

export default function DataPembayaranHonor({ data, setData }: Props) {
  const [item, setItem] = useState<HonorItem>({
    uraian: "",
    nominal: 0,
  });

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value || 0);

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setItem({ ...item, nominal: Number(raw) });
  };

  const addItem = () => {
    if (!item.uraian || item.nominal <= 0) return;

    setData({
      ...data,
      honorItems: [...(data.honorItems || []), item],
    });

    setItem({ uraian: "", nominal: 0 });
  };

  const removeItem = (i: number) => {
    const list = (data.honorItems || []).filter(
      (_: any, idx: number) => idx !== i
    );
    setData({ ...data, honorItems: list });
  };

  return (
    <div className="tb-honor-root">

      {/* FORM INPUT HONOR */}
      <div className="tb-honor-form">

        <input
          className="tb-honor-input"
          placeholder="Uraian Honor"
          value={item.uraian}
          onChange={(e) =>
            setItem({ ...item, uraian: e.target.value })
          }
        />

        <input
          className="tb-honor-input"
          placeholder="Nominal"
          inputMode="numeric"
          value={formatRupiah(item.nominal)}
          onChange={handleNominalChange}
        />

        <button className="tb-honor-btn" onClick={addItem}>
          <Plus size={14} /> Tambah
        </button>
      </div>

      {/* TABLE HONOR */}
      <div className="tb-honor-table-wrapper">
        <table className="tb-honor-table">
          <thead>
            <tr>
              <th>Uraian</th>
              <th>Nominal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {(data.honorItems || []).map((it: HonorItem, i: number) => (
              <tr key={i}>
                <td>{it.uraian}</td>
                <td>{formatRupiah(it.nominal)}</td>
                <td>
                  <button
                    className="tb-honor-del"
                    onClick={() => removeItem(i)}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
