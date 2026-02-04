"use client";

import { useState, useRef, useEffect } from "react";

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TabDataPengadaan from "./tabs/TabDataPengadaan";
import TabBarang from "./tabs/TabBarang";
import TabPenerima from "./tabs/TabPenerima";
import TabPersetujuan from "./tabs/TabPersetujuan";
import TabBonPesanan from "./tabs/TabBonPesanan";
import TabTandaTerima from "./tabs/TabTandaTerima";
import TabBAST from "./tabs/TabBAST";

import "@/styles/pages/kuitansi-pengadaan-barang.css";
import "@/styles/tabs/kuitansi-pengadaan-barang-tabs.css";

import PreviewPersetujuanBarang from "./preview/PreviewPersetujuanBarang";
import PreviewBonPesanan from "./preview/PreviewBonPesanan";
import PreviewTandaTerima from "./preview/PreviewTandaTerima";
import PreviewBAST from "./preview/PreviewBAST";

const steps = [
  { key: "dataPengadaan", label: "Data Pengadaan" },
  { key: "barang", label: "Barang" },
  { key: "penerima", label: "Penerima" },
  { key: "persetujuan", label: "Persetujuan" },
  { key: "bonPesanan", label: "Bon Pesanan" },
  { key: "tandaTerima", label: "Tanda Terima" },
  { key: "bast", label: "Berita Acara Serah Terima" },
];

const stepPagesMap = {
  dataPengadaan: 1,
  barang: 1,
  penerima: 1,
  persetujuan: 2,
  bonPesanan: 1,
  tandaTerima: 1,
  bast: 2,
};

export default function KuitansiPengadaanBarangPage() {
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);
  const page1Steps = ["dataPengadaan", "barang", "penerima", "persetujuan"];
  const page2Steps = ["bonPesanan"];
  const page3Steps = ["tandaTerima"];
  const page4Steps = ["bast"];
  const router = useRouter();
  const exportRef = useRef(null);
  
const viewportRef = useRef(null);
const [autoScale, setAutoScale] = useState(1);

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const previewRef = useRef(null);
const [totalPages, setTotalPages] = useState(1);

const handleExportPDF = async () => {
  if (!exportRef.current) return;

  const MARGIN = 32;

  const CONTENT_WIDTH = A4_WIDTH - MARGIN * 2;
  const CONTENT_HEIGHT = A4_HEIGHT - MARGIN * 2;

  const pdf = new jsPDF("p", "px", [A4_WIDTH, A4_HEIGHT]);

  const children = exportRef.current.children;

  let isFirstPage = true;

  for (let i = 0; i < children.length; i++) {
    const el = children[i];

    const totalHeight = el.scrollHeight;

    let renderedHeight = 0;

    while (renderedHeight < totalHeight) {
      const sliceHeight = Math.min(
        CONTENT_HEIGHT,
        totalHeight - renderedHeight
      );

      // safety: skip blank slice
      if (sliceHeight < 10) break;

      const canvas = await html2canvas(el, {
        scale: 2,
        y: renderedHeight,
        height: sliceHeight,
        windowWidth: A4_WIDTH,
        windowHeight: sliceHeight,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");

      if (!isFirstPage) pdf.addPage();
      isFirstPage = false;

      // keep aspect ratio for last partial page
      const ratio = sliceHeight / CONTENT_HEIGHT;

      pdf.addImage(
        imgData,
        "PNG",
        MARGIN,
        MARGIN,
        CONTENT_WIDTH,
        CONTENT_HEIGHT * ratio
      );

      renderedHeight += sliceHeight;
    }
  }

  const fileName = formData.noKuitansi
    ? `${formData.noKuitansi}.pdf`
    : "kuitansi.pdf";

  pdf.save(fileName);
};

const handleSave = () => {
  console.log("DATA DISIMPAN:", formData);
};

useEffect(() => {
  if (!viewportRef.current) return;

  const vw = viewportRef.current.clientWidth;
  const vh = viewportRef.current.clientHeight;

  const scaleX = vw / A4_WIDTH;
  const scaleY = vh / A4_HEIGHT;

  const scale = Math.min(scaleX, scaleY) * zoom;

  setAutoScale(scale);
}, [zoom, step]);


  const currentStepKey = steps[step].key;

  
  	const nextStep = () => {
	  setStep((s) => Math.min(s + 1, steps.length - 1));
	  setPage(1);
	};

	const prevStep = () => {
	  setStep((s) => Math.max(s - 1, 0));
	  setPage(1);
	};

	const [formData, setFormData] = useState({
	  tanggal: "",          // tanggal kuitansi (kanan bawah)
	  tempat: "",

	  tanggalLunas: "",     // untuk preview-lunas

	  jabatanKepala: "",
	  namaKepala: "",
	  nipKepala: "",

	  jabatanBendahara: "",
	  namaBendahara: "",
	  nipBendahara: "",

	  noBku: "",
	  noKuitansi: "",
	  pemberiDana: "",
	  nominal: "",
	  keteranganPembayaran: "",
	  items: [],

	  penerima: {
		namaPenerima: "",
		bank: "",
		noRekening: "",
		atasNama: "",
		npwp: ""
	  },

	  pembayaran: {},
	  lampiran: {},
	  bast: {},
	  fotoBarang: [],
	  fotoNota: []
	});

const renderPreview = () => {
  const key = steps[step].key;

  if (page1Steps.includes(key)) {
    return <PreviewPersetujuanBarang data={formData} />;
  }

  switch (key) {
    case "bonPesanan":
      return <PreviewBonPesanan data={formData} />;
	case "tandaTerima":
      return <PreviewTandaTerima data={formData} />;
	case "bast":
      return <PreviewBAST data={formData} />;
    default:
      return null;
  }
};

  const renderStep = () => {
    switch (steps[step].key) {
      case "dataPengadaan":
        return <TabDataPengadaan data={formData} setData={setFormData} />;
      case "barang":
        return <TabBarang data={formData} setData={setFormData} />;
      case "penerima":
        return <TabPenerima data={formData} setData={setFormData} />;
	  case "persetujuan":
        return <TabPersetujuan data={formData} setData={setFormData} />;
	  case "bonPesanan":
        return <TabBonPesanan data={formData} setData={setFormData} />;
	  case "tandaTerima":
        return <TabTandaTerima data={formData} setData={setFormData} />;
	  case "bast":
        return <TabBAST data={formData} setData={setFormData} />;
    }
  };

const nextPage = () => {
  if (page < totalPages) {
    setPage(p => p + 1);
  }
};

const prevPage = () => {
  if (page > 1) {
    setPage(p => p - 1);
  }
};

useEffect(() => {
  if (!previewRef.current) return;

  const height = previewRef.current.scrollHeight;
  const pages = Math.ceil(height / A4_HEIGHT);

  setTotalPages(pages);
}, [formData, step, zoom]);

  return (
    <div className="kuitansi-page">

      {/* LEFT FORM */}
      <div className="form-card">
		<div className="form-header">
		  <button
			className="back-button"
			onClick={() => router.push("/pengadaan-barang")}
		  >
			<ChevronLeft size={18} />
		  </button>

		  <h2>Form Kuitansi Pengadaan Barang</h2>
		</div>

        <p className="step-title">
          Step {step + 1} : {steps[step].label}
        </p>

        <div className="step-content">
          {renderStep()}
        </div>

<div className="step-navigation">
  <button onClick={prevStep} disabled={step === 0}>
    <ChevronLeft size={16}/> Kembali
  </button>

  {step === steps.length - 1 ? (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleSave}>
        💾 Simpan
      </button>

      <button onClick={handleExportPDF}>
        📄 Export PDF
      </button>
    </div>
  ) : (
    <button onClick={nextStep}>
      Lanjut <ChevronRight size={16}/>
    </button>
  )}
</div>

      </div>

		{/* RIGHT PREVIEW */}
		<div className="preview-card">

		  <div className="preview-toolbar">
			<button onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))}>
			  <ZoomIn size={16}/>
			</button>
			<button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}>
			  <ZoomOut size={16}/>
			</button>
		  </div>

			<div className="preview-viewport" ref={viewportRef}>
			  <div className="a4-wrapper">
				<div
				  className="a4"
				  style={{
					transform: `scale(${autoScale})`
				  }}
				>
				  <div
					className="a4-content"
					ref={previewRef}
					style={{
					  transform: `translateY(${-(page - 1) * 1123}px)`
					}}
				  >
					{renderPreview()}
				  </div>
				</div>
			  </div>
			</div>

			<div className="preview-footer">
			  <button onClick={prevPage} disabled={page === 1}>Prev</button>

			  <span>
				Halaman {page} dari {totalPages} halaman
			  </span>

			  <button onClick={nextPage} disabled={page === totalPages}>Next</button>
			</div>

		</div>
{/* HIDDEN EXPORT AREA */}
<div
  ref={exportRef}
  style={{
    position: "absolute",
    top: "-9999px",
    left: "-9999px",
    width: "794px"
  }}
>
  <div className="a4-export">
    <PreviewPersetujuanBarang data={formData} />
  </div>

  <div className="a4-export">
    <PreviewBonPesanan data={formData} />
  </div>

  <div className="a4-export">
    <PreviewTandaTerima data={formData} />
  </div>

  <div className="a4-export">
    <PreviewBAST data={formData} />
  </div>
</div>

    </div>
  );
}