"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, AlertCircle, X } from "lucide-react";

import "@/styles/pages/dashboard.css";
import DashboardHeader from "@/lib/dashboard/componentsHeader";
import KpiCard from "@/lib/dashboard/componentsKPI";
import { formatTanggalIndo, getTahapAktif } from "@/lib/dashboard/utilsDashboard";
import { useDashboard } from "@/lib/dashboard/useDashboardHook";

export default function DashboardPage() {
  const router = useRouter();
  const tahap = getTahapAktif();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPopupPerjalanan, setOpenPopupPerjalanan] = useState(false);

  const {
    isMounted,
    searchNo,
    filterJenis,
    setSearchNo,
    setFilterJenis,
    totalPerKategori,
    filteredData,
    handleLogout,
    goToEdit,
  } = useDashboard();

  if (!isMounted) return null;

  return (
    <div className="dashboard-wrapper">
      <DashboardHeader onLogout={handleLogout} />

      <div className="menu-grid">
        <KpiCard label="Kuitansi Pengadaan Barang" value={totalPerKategori.pengadaan || 0} color="soft-blue" />
        <KpiCard label="Kuitansi Perjalanan Dinas" value={totalPerKategori.perjalanan || 0} color="soft-green" />
        <KpiCard label="Kuitansi Konsumsi" value={totalPerKategori.konsumsi || 0} color="soft-yellow" />
        <KpiCard label="Kuitansi Honor" value={totalPerKategori.honor || 0} color="soft-purple" />
      </div>

	  <div className="table-card">
		<div className="table-header">
		  <div className="table-title">
			<h3>Riwayat 10 Kuitansi Terakhir</h3>
			{/* <span>Periode {tahap}</span> */}
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
				<li onClick={() => router.push("/kuitansi/pengadaan/new")}>
				  Buat Kuitansi Barang
				</li>

				<li onClick={() => router.push("/kuitansi/konsumsi/new")}>
				  Buat Kuitansi Makan/Minum
				</li>

				<li onClick={() => setOpenPopupPerjalanan(true)}>
				  Buat Kuitansi Perjalanan Dinas
				</li>

				<li onClick={() => router.push("/kuitansi/honor/new")}>
				  Buat Kuitansi Honor
				</li>
				</ul>
			  )}
			</div>
		  </div>
		</div>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Jenis</th>
              <th>Tanggal</th>
              <th>Nominal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(item => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.jenis}</td>
                <td>{formatTanggalIndo(item.tanggal)}</td>
                <td>Rp {item.nominal.toLocaleString("id-ID")}</td>
                <td className="aksi-group">
                  <button
                    className="btn-neo edit"
                    onClick={() => goToEdit(item.jenis, item.no)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button className="btn-neo delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {!filteredData.length && (
              <tr>
                <td colSpan={5} align="center">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
		{openPopupPerjalanan && (
		  <div className="popup-overlay">
			<div className="popup-card">
			  <button
				className="popup-close"
				onClick={() => setOpenPopupPerjalanan(false)}
			  >
				<X size={20} />
			  </button>

			  <AlertCircle size={48} className="popup-icon" />

			  <h3>Fitur Dalam Pengembangan</h3>
			  <p>
				Kuitansi Perjalanan Dinas sedang dalam tahap pengembangan.
				Silakan gunakan fitur lainnya terlebih dahulu.
			  </p>

			  <button
				className="btn-primary"
				onClick={() => setOpenPopupPerjalanan(false)}
			  >
				Mengerti
			  </button>
			</div>
		  </div>
		)}
    </div>
  );
}
