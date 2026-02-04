"use client";

import { useState, useRef, useEffect } from "react";

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* ===== HONOR TABS ===== */
import DataKuitansiHonor from "./tabs/DataKuitansiHonor";
import DataPembayaranHonor from "./tabs/DataPembayaranHonor";

/* ===== HONOR PREVIEW ===== */
import PreviewPembayaranHonor from "./preview/PreviewPembayaranHonor";

import "@/styles/pages/kuitansi-honor.css";
import "@/styles/tabs/kuitansi-honor-tab.css";

/* ================================
   STEP CONFIG
================================ */
const khSteps = [
  { key: "dataKuitansi", label: "Data Kuitansi" },
  { key: "dataHonor", label: "Data Honor" },
];

/* ================================
   A4 CONSTANT
================================ */
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function KuitansiPembayaranHonorPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);

  const [autoScale, setAutoScale] = useState(1);

  /* ================================
     FORM DATA (HONOR)
  ================================ */
  const [khFormData, setKhFormData] = useState({
    tanggal: "",
    tempat: "",

    noKuitansi: "",
    pemberiDana: "",
    nominal: "",
    keteranganPembayaran: "",

    penerima: {
      nama: "",
      nip: "",
      jabatan: "",
      bank: "",
      rekening: "",
    },

    honorItems: [],
  });

  /* ================================
     EXPORT PDF
  ================================ */
  const handleExportPDF = async () => {
    if (!exportRef.current) return;

    const pdf = new jsPDF("p", "px", [A4_WIDTH, A4_HEIGHT]);
    const children = exportRef.current.children;

    let first = true;

    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;

      const totalHeight = el.scrollHeight;
      const pages = Math.ceil(totalHeight / A4_HEIGHT);

      for (let p = 0; p < pages; p++) {
        const canvas = await html2canvas(el, {
          scale: 2,
          y: p * A4_HEIGHT,
          height: A4_HEIGHT,
          windowWidth: A4_WIDTH,
          windowHeight: A4_HEIGHT,
        });

        const img = canvas.toDataURL("image/png");

        if (!first) pdf.addPage();
        first = false;

        pdf.addImage(img, "PNG", 0, 0, A4_WIDTH, A4_HEIGHT);
      }
    }

    pdf.save(
      khFormData.noKuitansi
        ? `${khFormData.noKuitansi}.pdf`
        : "kuitansi-honor.pdf"
    );
  };

  /* ================================
     AUTO SCALE PREVIEW
  ================================ */
  useEffect(() => {
    if (!viewportRef.current) return;

    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;

    const scaleX = vw / A4_WIDTH;
    const scaleY = vh / A4_HEIGHT;

    setAutoScale(Math.min(scaleX, scaleY) * zoom);
  }, [zoom, step]);

  /* ================================
     PAGINATION CALC
  ================================ */
  useEffect(() => {
    if (!previewRef.current) return;

    const height = previewRef.current.scrollHeight;
    setTotalPages(Math.ceil(height / A4_HEIGHT));
  }, [khFormData, step, zoom]);

  /* ================================
     STEP RENDER
  ================================ */
  const renderStep = () => {
    switch (khSteps[step].key) {
      case "dataKuitansi":
        return (
          <DataKuitansiHonor
            data={khFormData}
            setData={setKhFormData}
          />
        );
      case "dataHonor":
        return (
          <DataPembayaranHonor
            data={khFormData}
            setData={setKhFormData}
          />
        );
    }
  };

  /* ================================
     PREVIEW RENDER
  ================================ */
  const renderPreview = () => {
    return <PreviewPembayaranHonor data={khFormData} />;
  };

  /* ================================
     NAVIGATION
  ================================ */
  const nextStep = () => {
    setStep(s => Math.min(s + 1, khSteps.length - 1));
    setPage(1);
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0));
    setPage(1);
  };

  const nextPage = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  /* ================================
     RENDER
  ================================ */
  return (
    <div className="kh-page">

      {/* ===== LEFT FORM ===== */}
      <div className="kh-form-card">

        <div className="kh-form-header">
          <button onClick={() => router.push("/kuitansi")}>
            <ChevronLeft size={18} />
          </button>
          <h2>Form Kuitansi Pembayaran Honor</h2>
        </div>

        <p className="kh-step-title">
          Step {step + 1} : {khSteps[step].label}
        </p>

        <div className="kh-step-content">
          {renderStep()}
        </div>

        <div className="kh-step-navigation">

          <button onClick={prevStep} disabled={step === 0}>
            <ChevronLeft size={16} /> Kembali
          </button>

          {step === khSteps.length - 1 ? (
            <button onClick={handleExportPDF}>
              📄 Export PDF
            </button>
          ) : (
            <button onClick={nextStep}>
              Lanjut <ChevronRight size={16} />
            </button>
          )}

        </div>
      </div>

      {/* ===== RIGHT PREVIEW ===== */}
      <div className="kh-preview-card">

        <div className="kh-preview-toolbar">
          <button onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))}>
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}>
            <ZoomOut size={16} />
          </button>
        </div>

        <div className="kh-preview-viewport" ref={viewportRef}>
          <div className="a4-wrapper">
            <div
              className="a4"
              style={{ transform: `scale(${autoScale})` }}
            >
              <div
                className="a4-content"
                ref={previewRef}
                style={{
                  transform: `translateY(${-(page - 1) * A4_HEIGHT}px)`
                }}
              >
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>

        <div className="kh-preview-footer">
          <button onClick={prevPage} disabled={page === 1}>Prev</button>
          <span>Halaman {page} dari {totalPages}</span>
          <button onClick={nextPage} disabled={page === totalPages}>Next</button>
        </div>

      </div>

      {/* ===== HIDDEN EXPORT ===== */}
      <div
        ref={exportRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: A4_WIDTH
        }}
      >
        <div className="a4-export">
          
        </div>
      </div>

    </div>
  );
}
