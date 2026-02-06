"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import "@/styles/pages/pengadaan-barang.css";

import { getKuitansiBarangHeader } from "@/services/KuitansiPengadaanBarangHelper";

function normalizeDate(dateStr: string) {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function KuitansiPengadaanPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [dataKuitansi, setDataKuitansi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
function formatTanggalIndo(dateStr: string) {
  if (!dateStr) return "";

  const bulanIndo = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

const d = new Date(dateStr);

  const tanggal = d.getDate().toString().padStart(2, "0");
  const bulan = bulanIndo[d.getMonth()];
  const tahun = d.getFullYear();

  return `${tanggal} ${bulan} ${tahun}`;
}


  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await getKuitansiBarangHeader();
      if (res.success) {
        setDataKuitansi(res.data);
      }
    } catch (err) {
      console.error("Gagal load data:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredData = dataKuitansi.filter((item) => {
	const matchSearch = String(item.noKuitansi || "")
	  .toLowerCase()
	  .includes(search.toLowerCase());

const matchDate = filterDate
  ? normalizeDate(item.tanggal) === normalizeDate(filterDate)
  : true;

    return matchSearch && matchDate;
  });

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <div className="kuitansi-wrapper">
      {/* HEADER */}
      <div className="kuitansi-header">
        <button className="btn-back" onClick={() => router.push("/dashboard")}>
          ← Kembali
        </button>
        <h2>Kuitansi Pengadaan Barang</h2>
      </div>

      {/* FILTER + ACTION */}
      <div className="top-bar">
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Cari berdasarkan No Kuitansi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <button
          className="btn-create"
          onClick={() => router.push("/kuitansi-pengadaan-barang")}
        >
          <Plus size={16} /> Buat Kuitansi
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">
        {loading ? (
          <p style={{ padding: 16 }}>Loading data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No Kuitansi</th>
                <th>Tanggal</th>
                <th>Uraian</th>
                <th>Nominal</th>
                <th style={{ width: "140px" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
{filteredData.map((item, i) => (
  <Fragment key={item.idKuitansi || i}>
    {/* MAIN ROW */}
    <tr className="list-row">
      <td>{item.noKuitansi}</td>
      <td>{formatTanggalIndo(item.tanggal)}</td>
      <td>{item.perihal}</td>
      <td>
        Rp {Number(item.totalAkhir).toLocaleString("id-ID")}
      </td>
      <td>
        <div className="action-buttons">
          <button
            className="btn-action expand"
            onClick={() => toggleRow(i)}
          >
            {openRow === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button className="btn-action edit">
            <Pencil size={14} />
          </button>

          <button className="btn-action delete">
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>

    {/* DETAIL ROW */}
    {openRow === i && (
      <tr className="detail-row">
        <td colSpan={5}>
          <div className="detail-box">
            <strong>Informasi Transaksi:</strong>
            <ul>
              <li>No BKU: {item.noBku}</li>
              <li>Nama Toko: {item.namaToko}</li>
              <li>Pemberi Dana: {item.pemberiDana}</li>
              <li>Tempat: {item.tempat}</li>
              <li>Perihal: {item.perihal}</li>
            </ul>
          </div>
        </td>
      </tr>
    )}
  </Fragment>
))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}