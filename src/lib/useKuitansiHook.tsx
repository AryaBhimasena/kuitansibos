import { useState } from "react";
import { JenisKuitansi } from "@/lib/kuitansi-helper";

export function useKuitansiFlow(
  jenis: JenisKuitansi,
  activeSteps: number[]
) {
  const [step, setStep] = useState(activeSteps[0]);
  const [zoom, setZoom] = useState(1);

  const currentIndex = activeSteps.indexOf(step);

  const nextStep = () => {
    if (currentIndex < activeSteps.length - 1) {
      setStep(activeSteps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setStep(activeSteps[currentIndex - 1]);
    }
  };

  const goToStep = (n: number) => {
    if (activeSteps.includes(n)) setStep(n);
  };

  return {
    step,
    nextStep,
    prevStep,
    goToStep,
    zoom,
    zoomIn: () => setZoom(z => Math.min(1.5, z + 0.1)),
    zoomOut: () => setZoom(z => Math.max(0.6, z - 0.1)),
  };
}

export function useKuitansiPayload() {
  const [payload, setPayload] = useState({
    /* =========================
     * DATA KUITANSI UTAMA
     * ========================= */
    kuitansi: {
      noBku: "",
      noKuitansi: "",
      pemberiDana: "",
      nominalDana: 0,
      keteranganDana: "",
    },

    /* =========================
     * BARANG
     * ========================= */
    barang: [
      {
        namaBarang: "",
        qty: 0,
        satuan: "",
        harga: 0,
        subtotal: 0,
      },
    ],

    /* =========================
     * PAJAK
     * ========================= */
    pajak: {
      ppnPersen: 0,
      pphPersen: 0,
    },

    /* =========================
     * PENERIMA (NON HONOR)
     * ========================= */
    penerima: {
      penerimaDana: "",
      namaBank: "",
      noRekening: "",
      namaRekening: "",
      npwp: "",
    },

    /* =========================
     * 🔥 PENERIMA HONOR (WAJIB)
     * ========================= */
    penerimaHonor: [],

    /* =========================
     * PENYERAHAN
     * ========================= */
    penyerahan: {
      tanggalPenyerahan: "",
      tanggalPengajuan: "",
	  lokasiPenyerahan:"",
      persetujuan: {
        nama: "",
        jabatan: "",
        nip: "",
      },
      pengajuan: {
        nama: "",
        jabatan: "",
        nip: "",
      },
    },

    /* =========================
     * BON PESANAN
     * ========================= */
    bonPesanan: {
      tanggalPesanan: "",
      tempatPesanan: "",
      noSuratPesanan: "",
      perihal: "",
      tujuan: {
        kepada: "",
        lokasi: "",
      },
      isi: {
	    periodeAnggaran: "",
        uraianKegiatan: "",
        uraianPesanan: "",
      },
    },

    /* =========================
     * BAST
     * ========================= */
    bast: {
      nomorbast: "",
      tanggalbast: "",
      haribast: "",
      pihakPertama: {
        namabast: "",
        jabatanbast: "",
        namaPerusahaanbast: "",
        alamatPerusahaanbast: "",
        telpbast: "",
        npwpbast: "",
      },
      pihakKedua: {
        namabast2: "",
        jabatanbast2: "",
        namaSekolahbast2: "",
        alamatSekolahbast2: "",
        telpKepalaSekolahbast2: "",
      },
      pemeriksa: {
        namabast3: "",
        nipbast3: "",
      },
    },
  });

  return { payload, setPayload };
}
