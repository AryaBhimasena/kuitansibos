"use client";

import "@/styles/forms/kuitansi-hal-satu.css";

type Props = {
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function Step2DataBarang({
  data,
  setData,
}: Props) {
  const addBarang = () => {
    setData((prev) => ({
      ...prev,
      barang: [
        ...(prev.barang || []),
        {
          namaBarang: "",
          qty: 1,
          satuan: "",
          harga: 0,
          subtotal: 0,
        },
      ],
    }));
  };

  const updateBarang = (
    index: number,
    key: string,
    value: any
  ) => {
    setData((prev) => {
      const barang = [...prev.barang];
      barang[index] = {
        ...barang[index],
        [key]: value,
      };

      barang[index].subtotal =
        barang[index].qty * barang[index].harga;

      return { ...prev, barang };
    });
  };

  const removeBarang = (index: number) => {
    setData((prev) => ({
      ...prev,
      barang: prev.barang.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div className="form-card">
      <h4>Step 2 – Data Barang</h4>

      <div className="barang-list">
        {data.barang.length === 0 && (
          <div className="form-placeholder-box">
            Belum ada barang ditambahkan
          </div>
        )}

        {data.barang.map((item: any, i: number) => (
          <div key={i} className="barang-item">
            <input
              className="barang-nama"
              placeholder="Nama Barang"
              value={item.namaBarang}
              onChange={(e) =>
                updateBarang(i, "namaBarang", e.target.value)
              }
            />

            <div className="barang-detail">
              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) =>
                  updateBarang(i, "qty", Number(e.target.value))
                }
              />

              <input
                placeholder="Satuan"
                value={item.satuan}
                onChange={(e) =>
                  updateBarang(i, "satuan", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Harga"
                value={item.harga}
                onChange={(e) =>
                  updateBarang(i, "harga", Number(e.target.value))
                }
              />

              <div className="subtotal">
                Rp{" "}
                {item.subtotal.toLocaleString("id-ID")}
              </div>

              <button
                type="button"
                className="btn-remove"
                onClick={() => removeBarang(i)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn-add"
        onClick={addBarang}
      >
        + Tambah Barang
      </button>

      <div className="form-row pajak-row">
        <label>PPN (%)</label>
        <input
          type="number"
          min={0}
          value={data.pajak.ppnPersen}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              pajak: {
                ...prev.pajak,
                ppnPersen: Number(e.target.value) || 0,
              },
            }))
          }
        />

        <label>PPh (%)</label>
        <input
          type="number"
          min={0}
          value={data.pajak.pphPersen}
          onChange={(e) =>
            setData((prev: any) => ({
              ...prev,
              pajak: {
                ...prev.pajak,
                pphPersen: Number(e.target.value) || 0,
              },
            }))
          }
        />
      </div>
    </div>
  );
}
