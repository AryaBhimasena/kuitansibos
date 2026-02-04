"use client";

import "@/styles/pages/dashboard.css";
import Link from "next/link";

export default function DashboardPage() {
  const today = new Date();
  const month = today.getMonth() + 1;

  const tahap =
    month <= 6 ? "Tahap 1 (Januari - Juni)" : "Tahap 2 (Juli - Desember)";

  // dummy data kuitansi
  const lastReceipts = [
    { no: "K-001", jenis: "Pengadaan Barang", tanggal: "2026-01-10", nominal: 2500000 },
    { no: "K-002", jenis: "Honor", tanggal: "2026-01-12", nominal: 1500000 },
    { no: "K-003", jenis: "Konsumsi", tanggal: "2026-01-15", nominal: 500000 },
    { no: "K-004", jenis: "Perjalanan Dinas", tanggal: "2026-01-18", nominal: 1800000 },
    { no: "K-005", jenis: "Pengadaan Barang", tanggal: "2026-01-20", nominal: 3000000 },
    { no: "K-006", jenis: "Honor", tanggal: "2026-01-22", nominal: 1200000 },
    { no: "K-007", jenis: "Konsumsi", tanggal: "2026-01-24", nominal: 400000 },
    { no: "K-008", jenis: "Perjalanan Dinas", tanggal: "2026-01-26", nominal: 2000000 },
    { no: "K-009", jenis: "Pengadaan Barang", tanggal: "2026-01-28", nominal: 3500000 },
    { no: "K-010", jenis: "Honor", tanggal: "2026-01-30", nominal: 1700000 },
  ];

  // hitung total per kategori
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

  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Dashboard Pemanfaatan Dana BOSP</h1>
        <p>Periode Aktif: <strong>{tahap}</strong></p>
      </div>

      {/* MENU KUITANSI + KPI */}
      <div className="menu-grid">
		<Link href="/pengadaan-barang" className="menu-card soft-blue">
		  <span className="menu-kpi">
			Rp {totalPerKategori.pengadaan.toLocaleString("id-ID")}
		  </span>
		  <h4>Kuitansi Pengadaan Barang</h4>
		</Link>

        <div className="menu-card soft-green">
          <span className="menu-kpi">Rp {totalPerKategori.perjalanan.toLocaleString("id-ID")}</span>
          <h4>Kuitansi Perjalanan Dinas</h4>
        </div>

        <div className="menu-card soft-yellow">
          <span className="menu-kpi">Rp {totalPerKategori.konsumsi.toLocaleString("id-ID")}</span>
          <h4>Kuitansi Konsumsi Makan/Minum</h4>
        </div>

        <div className="menu-card soft-purple">
          <span className="menu-kpi">Rp {totalPerKategori.honor.toLocaleString("id-ID")}</span>
          <h4>Kuitansi Honor</h4>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <div className="table-title">
          <h3>Riwayat 10 Kuitansi Terakhir</h3>
          <span>Periode {tahap}</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>No Kuitansi</th>
              <th>Jenis</th>
              <th>Tanggal</th>
              <th>Nominal</th>
            </tr>
          </thead>
          <tbody>
            {lastReceipts.map((item, i) => (
              <tr key={i}>
                <td>{item.no}</td>
                <td>{item.jenis}</td>
                <td>{item.tanggal}</td>
                <td>Rp {item.nominal.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
