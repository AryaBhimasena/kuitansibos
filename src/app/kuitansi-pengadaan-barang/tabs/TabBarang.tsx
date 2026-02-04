"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function TabBarang({ data, setData }) {
  const [item, setItem] = useState({
    nama: "",
    qty: 0,
    satuan: "",
    harga: 0,
  });

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID").format(value || 0);

  const handleQtyChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setItem({ ...item, qty: Number(raw) });
  };

  const handleHargaChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setItem({ ...item, harga: Number(raw) });
  };

  const handlePersenChange = (field, value) => {
    const raw = value.replace(/[^\d]/g, "");
    setData(prev => ({
      ...prev,
      [field]: Number(raw),
    }));
  };

  const addItem = () => {
    if (!item.nama) return;

    setData({ ...data, items: [...data.items, item] });

    setItem({
      nama: "",
      qty: 0,
      satuan: "",
      harga: 0,
    });
  };

  const removeItem = (i) => {
    const newItems = data.items.filter((_, idx) => idx !== i);
    setData({ ...data, items: newItems });
  };

  return (
    <div className="tb-barang-root">

      {/* FORM INPUT BARANG */}
      <div className="tb-barang-form">
        <input
          className="tb-barang-input"
          placeholder="Nama Barang"
          value={item.nama}
          onChange={(e) => setItem({ ...item, nama: e.target.value })}
        />

        <input
          className="tb-barang-input tb-barang-qty"
          placeholder="Qty"
          inputMode="numeric"
          value={item.qty || ""}
          onChange={handleQtyChange}
        />

        <input
          className="tb-barang-input tb-barang-satuan"
          placeholder="Satuan"
          value={item.satuan}
          onChange={(e) => setItem({ ...item, satuan: e.target.value })}
        />

        <input
          className="tb-barang-input"
          placeholder="Harga"
          inputMode="numeric"
          value={formatRupiah(item.harga)}
          onChange={handleHargaChange}
        />

        <button className="tb-barang-btn" onClick={addItem}>
          <Plus size={14} /> Tambah
        </button>
      </div>

      {/* INPUT PAJAK */}
      <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
        <div>
          <label>PPN (%)</label>
          <input
            className="tb-barang-input"
            inputMode="numeric"
            placeholder="11"
            value={data.ppnPersen || ""}
            onChange={(e) => handlePersenChange("ppnPersen", e.target.value)}
          />
        </div>

        <div>
          <label>PPh (%)</label>
          <input
            className="tb-barang-input"
            inputMode="numeric"
            placeholder="2"
            value={data.pphPersen || ""}
            onChange={(e) => handlePersenChange("pphPersen", e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="tb-barang-table-wrapper">
        <table className="tb-barang-table">
          <thead>
            <tr>
              <th>Barang</th>
              <th>Qty</th>
              <th>Satuan</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((it, i) => (
              <tr key={i}>
                <td>{it.nama}</td>
                <td>{it.qty}</td>
                <td>{it.satuan}</td>
                <td>{formatRupiah(it.harga)}</td>
                <td>
                  <button
                    className="tb-barang-del"
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
