import { useState } from "react";
import { JenisKuitansi } from "@/lib/kuitansi-helper";

export function useKuitansiFlow(jenis: JenisKuitansi) {
  const TOTAL_STEP =
    jenis === "BARANG" || jenis === "KONSUMSI"
      ? 6
      : 5; // honor / perjalanan (jika nanti beda)

  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(1);

  const nextStep = () =>
    setStep(s => Math.min(TOTAL_STEP - 1, s + 1));

  const prevStep = () =>
    setStep(s => Math.max(0, s - 1));

  const goToStep = (n: number) => {
    if (n >= 0 && n < TOTAL_STEP) setStep(n);
  };

  return {
    step,
    TOTAL_STEP,
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
    kuitansi: {
      noBku: "",
      noKuitansi: "",
      pemberiDana: "",
      nominalDana: 0,
      keteranganDana: ""
    },

    barang: [
      {
        namaBarang: "",
        qty: 0,
        satuan: "",
        harga: 0,
        subtotal: 0
      }
    ],

    pajak: {
      ppnPersen: 0,
      pphPersen: 0
    },

    penerima: {
      penerimaDana: "",
      namaBank: "",
      noRekening: "",
      namaRekening: "",
      npwp: ""
    },

    penyerahan: {
      tanggalPenyerahan: "",
      tanggalPengajuan: "",
      persetujuan: {
        nama: "",
        jabatan: "",
        nip: ""
      },
      pengajuan: {
        nama: "",
        jabatan: "",
        nip: ""
      }
    },
	
	bonPesanan: {
	  tanggalPesanan: "",
	  tempatPesanan: "",
	  noSuratPesanan: "",
	  perihal: "",

	  tujuan: {
		kepada: "",
		lokasi: ""
	  },

	  isi: {
		uraianKegiatan: "",
		uraianPesanan: ""
	  }
	},
	
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
		npwpbast: ""
	  },

	  pihakKedua: {
		namabast2: "",
		jabatanbast2: "",
		namaSekolahbast2: "",
		alamatSekolahbast2: "",
		telpKepalaSekolahbast2: ""
	  },

	  pemeriksa: {
		namabast3: "",
		nipbast3: ""
	  }
	}

  });

  return { payload, setPayload };
}
