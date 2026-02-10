"use client";

import "@/styles/forms/kuitansi-penerima-honor.css";

type Props = {
  jenis: "HONOR" | string;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function StepTigaDataPenerimaHonor({
  jenis,
  data,
  setData,
}: Props) {
  const penerimaList = data.penerimaHonor ?? [];

  const addPenerima = () => {
    setData((prev: any) => ({
      ...prev,
      penerimaHonor: [
        ...(prev.penerimaHonor || []),
        {
          namaHonor: "",
          nipHonor: "",
          jabatanTim: "",
          pangkatGol: "",
          noRekening: "",
          nik: "",
          jumlahDana: 0,
          pph21: 0,
          jumlahDiterima: 0,
        },
      ],
    }));
  };

  const updatePenerima = (
    index: number,
    key: string,
    value: any
  ) => {
    setData((prev: any) => {
      const penerimaHonor = [...(prev.penerimaHonor || [])];

      penerimaHonor[index] = {
        ...penerimaHonor[index],
        [key]: value,
      };

      const jumlahDana =
        Number(penerimaHonor[index].jumlahDana) || 0;
      const pph21 =
        Number(penerimaHonor[index].pph21) || 0;

      penerimaHonor[index].jumlahDiterima =
        jumlahDana - pph21;

      return { ...prev, penerimaHonor };
    });
  };

  const removePenerima = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      penerimaHonor: (prev.penerimaHonor || []).filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div className="form-card">
      <h4>Step 4 – Data Penerima Honor</h4>

      <div className="honor-penerima-list">
        {penerimaList.length === 0 && (
          <div className="honor-penerima-empty">
            Belum ada data penerima honor
          </div>
        )}

        {penerimaList.map((item: any, i: number) => (
          <div key={i} className="honor-penerima-item">
            <div className="honor-penerima-grid">
              <div className="honor-penerima-no">
                {i + 1}
              </div>

              <input
                placeholder="Nama"
                value={item.namaHonor}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "namaHonor",
                    e.target.value
                  )
                }
              />
			  
              <input
                placeholder="NIP"
                value={item.nipHonor}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "nipHonor",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Jabatan Tim"
                value={item.jabatanTim}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "jabatanTim",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Pangkat / Gol"
                value={item.pangkatGol}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "pangkatGol",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="No. Rekening"
                value={item.noRekening}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "noRekening",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="NIK"
                value={item.nik}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "nik",
                    e.target.value
                  )
                }
              />

              <input
                type="number"
                placeholder="Jumlah Dana"
                value={item.jumlahDana}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "jumlahDana",
                    Number(e.target.value)
                  )
                }
              />

              <input
                type="number"
                placeholder="PPh 21"
                value={item.pph21}
                onChange={(e) =>
                  updatePenerima(
                    i,
                    "pph21",
                    Number(e.target.value)
                  )
                }
              />

              <div className="honor-penerima-total">
                Rp{" "}
                {item.jumlahDiterima.toLocaleString(
                  "id-ID"
                )}
              </div>

              <button
                type="button"
                className="honor-penerima-remove"
                onClick={() => removePenerima(i)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="honor-penerima-add"
        onClick={addPenerima}
      >
        + Tambah Penerima Honor
      </button>
    </div>
  );
}
