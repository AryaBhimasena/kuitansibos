"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import "@/styles/pages/pengadaan-barang.css";

export default function KuitansiPengadaanPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [jenisKuitansi] = useState("pengadaan");
  const [openRow, setOpenRow] = useState(null); // row yang dibuka

  const dataKuitansi = [
    {
      no: "K-001",
      tanggal: "2026-01-10",
      uraian: "Pembelian Laptop",
      nominal: 2500000,
      items: [
        { nama: "Laptop Acer", qty: 2, harga: 1000000 },
        { nama: "Mouse", qty: 2, harga: 250000 },
      ],
    },
    {
      no: "K-005",
      tanggal: "2026-01-20",
      uraian: "Pembelian Printer",
      nominal: 3000000,
      items: [
        { nama: "Printer Epson", qty: 1, harga: 2500000 },
        { nama: "Tinta", qty: 2, harga: 250000 },
      ],
    },
    {
      no: "K-009",
      tanggal: "2026-01-28",
      uraian: "Pembelian Meja",
      nominal: 3500000,
      items: [
        { nama: "Meja Guru", qty: 5, harga: 700000 },
      ],
    },
  ];

  const filteredData = dataKuitansi.filter((item) => {
    const matchSearch = item.no.toLowerCase().includes(search.toLowerCase());
    const matchDate = filterDate ? item.tanggal === filterDate : true;
    return matchSearch && matchDate;
  });

  const toggleRow = (index) => {
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

        <button className="btn-create" onClick={() => router.push("/kuitansi-pengadaan-barang")}>
          <Plus size={16} /> Buat Kuitansi
        </button>
      </div>

		{/* LIST STRIP TABLE */}
		<div className="table-card">
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
				<>
				  {/* MAIN ROW */}
				  <tr key={i} className="list-row">
					<td>{item.no}</td>
					<td>{item.tanggal}</td>
					<td>{item.uraian}</td>
					<td>Rp {item.nominal.toLocaleString("id-ID")}</td>
					<td>
					  <div className="action-buttons">
						{/* EXPAND BUTTON */}
						<button
						  className="btn-action expand"
						  onClick={() => toggleRow(i)}
						>
						  {openRow === i ? (
							<ChevronUp size={14} />
						  ) : (
							<ChevronDown size={14} />
						  )}
						</button>

						{/* EDIT */}
						<button className="btn-action edit">
						  <Pencil size={14} />
						</button>

						{/* DELETE */}
						<button className="btn-action delete">
						  <Trash2 size={14} />
						</button>
					  </div>
					</td>
				  </tr>

				  {/* DETAIL ROW */}
				  {openRow === i && (
					<tr className="detail-row">
					  <td colSpan="5">
						<div className="detail-box">
						  <strong>Detail Barang:</strong>
						  <table className="detail-table">
							<thead>
							  <tr>
								<th>Nama Barang</th>
								<th>Qty</th>
								<th>Harga</th>
							  </tr>
							</thead>
							<tbody>
							  {item.items.map((d, idx) => (
								<tr key={idx}>
								  <td>{d.nama}</td>
								  <td>{d.qty}</td>
								  <td>Rp {d.harga.toLocaleString("id-ID")}</td>
								</tr>
							  ))}
							</tbody>
						  </table>
						</div>
					  </td>
					</tr>
				  )}
				</>
			  ))}
			</tbody>
		  </table>
		</div>
    </div>
  );
}
