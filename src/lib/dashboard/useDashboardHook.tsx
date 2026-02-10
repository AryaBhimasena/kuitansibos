"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { JENIS_MAP } from "@/lib/dashboard/utilsDashboard";

export function useDashboard() {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchNo, setSearchNo] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  /* mount guard */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* fetch data */
  useEffect(() => {
    if (!isMounted) return;

    fetch(
      "https://script.google.com/macros/s/AKfycbxRd37N6y8vsTgdtW0xcl9f3HWqUu4r1pwWr_LQeqb4bBUOm9k9XzXQqcGvdq2WzPm64w/exec?action=lastKuitansi"
    )
      .then(res => res.json())
      .then(res => res.success && setData(res.data))
      .catch(err => console.error("Dashboard fetch error:", err));
  }, [isMounted]);

  /* KPI */
  const totalPerKategori = useMemo(() => {
    return Object.keys(JENIS_MAP).reduce((acc: any, jenis) => {
      acc[JENIS_MAP[jenis]] = data
        .filter(d => d.jenis === jenis)
        .reduce((s, d) => s + d.nominal, 0);
      return acc;
    }, {});
  }, [data]);

  /* filter table */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchNo = item.no
        .toLowerCase()
        .includes(searchNo.toLowerCase());

      const matchJenis = filterJenis
        ? item.jenis === filterJenis
        : true;

      return matchNo && matchJenis;
    });
  }, [data, searchNo, filterJenis]);

  /* actions */
  const handleLogout = () => {
    if (!confirm("Yakin ingin logout?")) return;
    localStorage.removeItem("auth_user");
    router.replace("/");
  };

  const goToEdit = (jenis: string, no: string) => {
    const key = JENIS_MAP[jenis];
    if (!key) {
      alert("Jenis kuitansi tidak dikenali");
      return;
    }
    router.push(`/kuitansi/${key}/edit/${no}`);
  };

  return {
    /* state */
    isMounted,
    searchNo,
    filterJenis,
    openDropdown,

    /* setter */
    setSearchNo,
    setFilterJenis,
    setOpenDropdown,

    /* data */
    totalPerKategori,
    filteredData,

    /* action */
    handleLogout,
    goToEdit,
  };
}
