"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/pages/dashboard.css";
import { Pencil, Trash2 } from "lucide-react";

function jenisLabelToSlug(jenis: string) {
  switch (jenis) {
    case "Pengadaan Barang":
      return "pengadaan";
    case "Konsumsi":
      return "konsumsi";
    case "Perjalanan Dinas":
      return "perjalanan";
    case "Honor":
      return "honor";
    default:
      return "pengadaan";
  }
}

function formatTanggalIndo(dateStr: string) {
  if (!dateStr) return "-";

  const d = new Date(dateStr);

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

export default function DashboardPage() {
  const router = useRouter();

  const today = new Date();
  const month = today.getMonth() + 1;

  const tahap =
    month <= 6 ? "Tahap 1 (Januari - Juni)" : "Tahap 2 (Juli - Desember)";

	const [lastReceipts, setLastReceipts] = useState<any[]>([]);

  /* ================= KPI ================= */
  const totalPerKategori = {
    pengadaan: lastReceipts
      .filter(r => r.jenis === "Pengadaan Barang")
      .reduce((s, r) => s + r.nominal, 0),

    perjalanan: lastReceipts
      .filter(r => r.jenis === "Perjalanan Dinas")
      .reduce((s, r) => s + r.nominal, 0),

    konsumsi: lastReceipts
      .filter(r => r.jenis === "Konsumsi")
      .reduce((s, r) => s + r.nominal, 0),

    honor: lastReceipts
      .filter(r => r.jenis === "Honor")
      .reduce((s, r) => s + r.nominal, 0),
  };

  /* ================= STATE FILTER ================= */
  const [searchNo, setSearchNo] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const filteredData = lastReceipts.filter(item => {
    const matchNo = item.no.toLowerCase().includes(searchNo.toLowerCase());
    const matchJenis = filterJenis ? item.jenis === filterJenis : true;
    return matchNo && matchJenis;
  });

useEffect(() => {
  fetch("https://script.google.com/macros/s/AKfycbxRd37N6y8vsTgdtW0xcl9f3HWqUu4r1pwWr_LQeqb4bBUOm9k9XzXQqcGvdq2WzPm64w/exec?action=lastKuitansi")
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        setLastReceipts(json.data);
      }
    })
    .catch(err => console.error("Fetch dashboard error:", err));
}, []);

const handleDelete = async (no: string) => {
  if (!confirm("Yakin hapus kuitansi ini?")) return;

  // nanti sambungkan ke GAS
  alert("Hapus kuitansi: " + no);
};

  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Dashboard Pemanfaatan Dana BOSP</h1>
        <p>
          Periode Aktif: <strong>{tahap}</strong>
        </p>
      </div>

      {/* KPI CARDS - STATIS */}
      <div className="menu-grid">
        <div className="menu-card soft-blue">
          <span className="menu-kpi">
            Rp {totalPerKategori.pengadaan.toLocaleString("id-ID")}
          </span>
          <h4>Kuitansi Pengadaan Barang</h4>
        </div>

        <div className="menu-card soft-green">
          <span className="menu-kpi">
            Rp {totalPerKategori.perjalanan.toLocaleString("id-ID")}
          </span>
          <h4>Kuitansi Perjalanan Dinas</h4>
        </div>

        <div className="menu-card soft-yellow">
          <span className="menu-kpi">
            Rp {totalPerKategori.konsumsi.toLocaleString("id-ID")}
          </span>
          <h4>Kuitansi Konsumsi Makan/Minum</h4>
        </div>

        <div className="menu-card soft-purple">
          <span className="menu-kpi">
            Rp {totalPerKategori.honor.toLocaleString("id-ID")}
          </span>
          <h4>Kuitansi Honor</h4>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
		<div className="table-header">
		  <div className="table-title">
			<h3>Riwayat 10 Kuitansi Terakhir</h3>
			<span>Periode {tahap}</span>
		  </div>

		  <div className="table-actions">
			{/* BUAT KUITANSI */}
			<input
			  type="text"
			  placeholder="Cari No Kuitansi..."
			  value={searchNo}
			  onChange={e => setSearchNo(e.target.value)}
			  className="input-search"
			/>

			<select
			  value={filterJenis}
			  onChange={e => setFilterJenis(e.target.value)}
			  className="input-select"
			>
			  <option value="">Semua Jenis</option>
			  <option value="Pengadaan Barang">Pengadaan Barang</option>
			  <option value="Konsumsi">Konsumsi</option>
			  <option value="Perjalanan Dinas">Perjalanan Dinas</option>
			  <option value="Honor">Honor</option>
			</select>
			
			<div className="dropdown-wrapper">
			  <button
				className="btn-primary"
				onClick={() => setOpenDropdown(!openDropdown)}
			  >
				+ Buat Kuitansi
			  </button>

			  {openDropdown && (
				<ul className="dropdown-menu">
					<li
					  onClick={() =>
						router.push(
						  "/kuitansi?jenis=pengadaan&title=Kuitansi%20Pengadaan%20Barang"
						)
					  }
					>
					  Buat Kuitansi Barang
					</li>

				  <li>Buat Kuitansi Makan/Minum</li>
				  <li>Buat Kuitansi Perjalanan Dinas</li>
				  <li>Buat Kuitansi Honor</li>
				</ul>
			  )}
			</div>
		  </div>
		</div>

        <table>
			<thead>
			  <tr>
				<th>No Kuitansi</th>
				<th>Jenis</th>
				<th>Tanggal</th>
				<th>Nominal</th>
				<th>Aksi</th>
			  </tr>
			</thead>

          <tbody>
            {filteredData.map((item, i) => (
              <tr key={i}>
                <td>{item.no}</td>
                <td>{item.jenis}</td>
                <td>{formatTanggalIndo(item.tanggal)}</td>
                <td>Rp {item.nominal.toLocaleString("id-ID")}</td>
				<td>
				  <div className="aksi-group">
					<button
					  className="btn-neo edit"
					  onClick={() => {
						const jenisSlug = jenisLabelToSlug(item.jenis);

						router.push(
						  `/kuitansi?id=${item.no}&jenis=${jenisSlug}&title=${encodeURIComponent(
							`Kuitansi ${item.jenis}`
						  )}`
						);
					  }}
					  title="Edit"
					>
					  <Pencil size={16} />
					</button>


					<button
					  className="btn-neo delete"
					  onClick={() => handleDelete(item.no)}
					  title="Hapus"
					>
					  <Trash2 size={16} />
					</button>
				  </div>
				</td>

              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
