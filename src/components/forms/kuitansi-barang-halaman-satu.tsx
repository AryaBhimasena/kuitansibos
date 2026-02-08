"use client";

import "@/styles/forms/kuitansi-hal-satu.css"

type Props = {
  step: number;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function KuitansiBarangHalamanSatu({
  step,
  data,
  setData
}: Props) {

const addBarang = () => {
  setData(prev => ({
    ...prev,
    barang: [
      ...(prev.barang || []),
      {
        namaBarang: "",
        qty: 1,
        satuan: "",
        harga: 0,
        subtotal: 0
      }
    ]
  }));
};

const updateBarang = (index: number, key: string, value: any) => {
  setData((prev: any) => {
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
  setData(prev => ({
    ...prev,
    barang: prev.barang.filter((_: any, i: number) => i !== index)
  }));
};

  /* ================= STEP 1 – DATA KUITANSI ================= */
  if (step === 0) {
    return (
      <div className="form-card">
        <h4>Step 1 – Data Kuitansi</h4>

        <div className="form-group">
          <label>No BKU</label>
          <input
            value={data.kuitansi.noBku}
            onChange={e =>
              setData(prev => ({
                ...prev,
                kuitansi: {
                  ...prev.kuitansi,
                  noBku: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>No Kuitansi</label>
          <input
            value={data.kuitansi.noKuitansi}
            onChange={e =>
              setData(prev => ({
                ...prev,
                kuitansi: {
                  ...prev.kuitansi,
                  noKuitansi: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Pemberi Dana</label>
          <input
            value={data.kuitansi.pemberiDana}
            onChange={e =>
              setData(prev => ({
                ...prev,
                kuitansi: {
                  ...prev.kuitansi,
                  pemberiDana: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Nominal Dana</label>
          <input
            type="number"
            value={data.kuitansi.nominalDana}
            onChange={e =>
              setData(prev => ({
                ...prev,
                kuitansi: {
                  ...prev.kuitansi,
                  nominalDana: Number(e.target.value)
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Keterangan Dana</label>
          <textarea
            rows={3}
            value={data.kuitansi.keteranganDana}
            onChange={e =>
              setData(prev => ({
                ...prev,
                kuitansi: {
                  ...prev.kuitansi,
                  keteranganDana: e.target.value
                }
              }))
            }
          />
        </div>
      </div>
    );
  }

  /* ================= STEP 2 – DATA BARANG ================= */
	if (step === 1) {
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
					onChange={e => updateBarang(i, "namaBarang", e.target.value)}
				  />

				  <div className="barang-detail">
					<input
					  type="number"
					  placeholder="Qty"
					  value={item.qty}
					  onChange={e => updateBarang(i, "qty", Number(e.target.value))}
					/>

					<input
					  placeholder="Satuan"
					  value={item.satuan}
					  onChange={e => updateBarang(i, "satuan", e.target.value)}
					/>

					<input
					  type="number"
					  placeholder="Harga"
					  value={item.harga}
					  onChange={e => updateBarang(i, "harga", Number(e.target.value))}
					/>

					<div className="subtotal">
					  Rp {item.subtotal.toLocaleString("id-ID")}
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
				onChange={e =>
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
				onChange={e =>
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

  /* ================= STEP 3 – DATA PENERIMA ================= */
  if (step === 2) {
    return (
      <div className="form-card">
        <h4>Step 3 – Data Penerima</h4>

        <div className="form-group">
          <label>Penerima Dana</label>
          <input
            value={data.penerima.penerimaDana}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penerima: {
                  ...prev.penerima,
                  penerimaDana: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Nama Bank</label>
          <input
            value={data.penerima.namaBank}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penerima: {
                  ...prev.penerima,
                  namaBank: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>No Rekening</label>
          <input
            value={data.penerima.noRekening}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penerima: {
                  ...prev.penerima,
                  noRekening: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Nama Rekening</label>
          <input
            value={data.penerima.namaRekening}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penerima: {
                  ...prev.penerima,
                  namaRekening: e.target.value
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>NPWP</label>
          <input
            value={data.penerima.npwp}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penerima: {
                  ...prev.penerima,
                  npwp: e.target.value
                }
              }))
            }
          />
        </div>
      </div>
    );
  }

  /* ================= STEP 4 – PENYERAHAN DANA ================= */
  if (step === 3) {
    return (
      <div className="form-card">
        <h4>Step 4 – Penyerahan Dana</h4>

        <div className="form-group">
          <label>Tanggal Penyerahan</label>
          <input
            type="date"
            value={data.penyerahan.tanggalPenyerahan}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  tanggalPenyerahan: e.target.value
                }
              }))
            }
          />
        </div>
		
        <div className="form-group">
          <label>Tanggal Pengajuan</label>
          <input
            type="date"
            value={data.penyerahan.tanggalPengajuan}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  tanggalPengajuan: e.target.value
                }
              }))
            }
          />
        </div>

        <hr />

        <h5>Persetujuan</h5>

        <div className="form-group">
          <label>Nama</label>
          <input
            value={data.penyerahan.persetujuan.nama}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  persetujuan: {
                    ...prev.penyerahan.persetujuan,
                    nama: e.target.value
                  }
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Jabatan</label>
          <input
            value={data.penyerahan.persetujuan.jabatan}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  persetujuan: {
                    ...prev.penyerahan.persetujuan,
                    jabatan: e.target.value
                  }
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>NIP</label>
          <input
            value={data.penyerahan.persetujuan.nip}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  persetujuan: {
                    ...prev.penyerahan.persetujuan,
                    nip: e.target.value
                  }
                }
              }))
            }
          />
        </div>

        <hr />

        <h5>Pengajuan</h5>

        <div className="form-group">
          <label>Nama</label>
          <input
            value={data.penyerahan.pengajuan.nama}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  pengajuan: {
                    ...prev.penyerahan.pengajuan,
                    nama: e.target.value
                  }
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Jabatan</label>
          <input
            value={data.penyerahan.pengajuan.jabatan}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  pengajuan: {
                    ...prev.penyerahan.pengajuan,
                    jabatan: e.target.value
                  }
                }
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>NIP</label>
          <input
            value={data.penyerahan.pengajuan.nip}
            onChange={e =>
              setData(prev => ({
                ...prev,
                penyerahan: {
                  ...prev.penyerahan,
                  pengajuan: {
                    ...prev.penyerahan.pengajuan,
                    nip: e.target.value
                  }
                }
              }))
            }
          />
        </div>
      </div>
    );
  }

  return null;
}
