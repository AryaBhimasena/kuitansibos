"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, X, FileJson } from "lucide-react";
import "@/styles/pages/buat-kuitansi.css";

import { mapJenisKuitansi } from "@/lib/kuitansi-helper";
import { renderKuitansiForm } from "@/lib/render-form-helper";
import { renderKuitansiPreview, renderAllKuitansiPreview } from "@/lib/render-preview-helper";

import { useKuitansiFlow, useKuitansiPayload } from "@/lib/useKuitansiHook";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function stepToPage(step: number) {
  if (step <= 3) return 0; // Page 1
  if (step === 4) return 1; // Page 2
  if (step === 5) return 3; // Page 4
  return 0;
}

function pageToStep(page: number) {
  if (page === 0) return 0; // Page 1 → step awal
  if (page === 1) return 4; // Page 2 → step 4
  if (page === 2) return 4; // Page 3 → step 5
  if (page === 3) return 5; // Page 4 → step 6
  if (page === 4) return 5; // Page 5 → step 6
  return 0;
}

export default function KuitansiOrchestratorPage({
  jenis,
  mode,
  id,
}) {

  const router = useRouter();
  const kuitansiJenis = mapJenisKuitansi(jenis);
  const [isLoaded, setIsLoaded] = useState(mode !== "edit");

	if (!kuitansiJenis) {
	  return (
		<div className="error-state">
		  Jenis kuitansi tidak valid
		</div>
	  );
	}

  const title =
  mode === "edit"
    ? `Edit Kuitansi ${kuitansiJenis}`
    : `Buat Kuitansi ${kuitansiJenis}`;

  const { payload, setPayload } = useKuitansiPayload();
  const {
    step,
    zoom,
    TOTAL_STEP,
    nextStep,
    prevStep,
	goToStep,
    zoomIn,
    zoomOut
  } = useKuitansiFlow(kuitansiJenis);

  const [openPayload, setOpenPayload] = useState(false);

const [previewPage, setPreviewPage] = useState(0);

useEffect(() => {
  setPreviewPage(stepToPage(step));
}, [step]);

useEffect(() => {
  console.log("RAW JENIS FROM ROUTE =", jenis);
  console.log("MAPPED JENIS =", kuitansiJenis);
}, [jenis, kuitansiJenis]);

const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("jenis", kuitansiJenis);
  formData.append("payload", JSON.stringify(payload));

  if (mode === "edit") {
    formData.append("action", "updateKuitansi");
    formData.append("id", id!);
  } else {
    formData.append("action", "saveKuitansi");
  }

  const res = await fetch('https://script.google.com/macros/s/AKfycbxRd37N6y8vsTgdtW0xcl9f3HWqUu4r1pwWr_LQeqb4bBUOm9k9XzXQqcGvdq2WzPm64w/exec', {
    method: "POST",
    body: formData
  });

  const result = await res.json();

  if (!result.success) alert(result.message);
  else alert("Berhasil disimpan");
};

useEffect(() => {
  if (!mode) return; // tunggu hydration
  if (mode !== "edit") {
    setIsLoaded(true);
    return;
  }

  if (!id) return; // tunggu id muncul

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://script.google.com/macros/s/AKfycbxRd37N6y8vsTgdtW0xcl9f3HWqUu4r1pwWr_LQeqb4bBUOm9k9XzXQqcGvdq2WzPm64w/exec?action=getKuitansiById&id=${encodeURIComponent(id)}`
      );

      const json = await res.json();

      if (!json.success) {
        console.error("Gagal fetch edit data", json);
        setIsLoaded(true); // supaya tidak infinite loading
        return;
      }

      setPayload(prev => ({
        ...prev,
        ...json.data,
        barang: json.data.barang ?? [],
      }));

      goToStep(0);
      setIsLoaded(true);

    } catch (err) {
      console.error(err);
      setIsLoaded(true); // fallback
    }
  };

  fetchData();

}, [mode, id]);

const handleExportPDF = async () => {
  const pages = document.querySelectorAll(".pdf-page");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true, // aktifkan kompresi
  });

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i] as HTMLElement, {
      scale: 1.5,              // ⬅️ turunkan dari 2
      backgroundColor: "ffffff",
      useCORS: true,
    });

    // ✅ pakai JPEG + quality 0.75
    const imgData = canvas.toDataURL("image/jpeg", 0.75);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

	const ratio = Math.min(
	  pageWidth / canvas.width,
	  pageHeight / canvas.height
	);

	const imgWidth = canvas.width * ratio;
	const imgHeight = canvas.height * ratio;

	const xOffset = (pageWidth - imgWidth) / 2;
	const yOffset = (pageHeight - imgHeight) / 2;


    if (i > 0) pdf.addPage();

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      yOffset > 0 ? yOffset : 0,
      imgWidth,
      imgHeight,
      undefined,
      "FAST" // kompres cepat
    );
  }

  const jenisNama = jenis?.toLowerCase() || "kuitansi";
  const noKuitansi = payload?.kuitansi?.noKuitansi || "nonumber";

  pdf.save(`${jenisNama}-${noKuitansi}.pdf`);
};

  return (
    <div className="kuitansi-orchestrator">
      <aside className="orchestrator-form">
        <header className="form-header">
          <button className="btn-back" onClick={() => router.push("/dashboard")}>
            <ArrowLeft size={18} />
          </button>
          <h2>{title}</h2>
        </header>

        <div className="step-indicator">
          Step {step + 1} / {TOTAL_STEP}
        </div>

        <div className="form-body">
          {renderKuitansiForm(kuitansiJenis, step, payload, setPayload)}
        </div>

        <footer className="form-footer">
          <button onClick={prevStep} disabled={step === 0}>
            Prev
          </button>
          <button onClick={nextStep} disabled={step === TOTAL_STEP - 1}>
            Next
          </button>
        </footer>

        <button className="btn-submit" onClick={handleSubmit}>
          Simpan
        </button>
      </aside>

      <section className="orchestrator-preview">
        <div className="preview-toolbar">
          <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}>
            Zoom +
          </button>
          <button onClick={() => setZoom(z => Math.max(0.6, z - 0.1))}>
            Zoom −
          </button>
		  <button onClick={handleExportPDF}>
		    Export PDF
		  </button>

			<select
			  value={previewPage}
			  onChange={(e) => {
				const page = Number(e.target.value);
				setPreviewPage(page);
				goToStep(pageToStep(page)); // sinkronkan step
			  }}
			>
			  <option value={0}>Page 1</option>
			  <option value={1}>Page 2</option>
			  <option value={2}>Page 3</option>
			  <option value={3}>Page 4</option>
			  <option value={4}>Page 5</option>
			</select>
        </div>

        <div className="preview-viewport">
          <div className="viewport-center">
            <div
              className="preview-canvas single-page"
              style={{ transform: `scale(${zoom})` }}
            >
              <div className="preview-paper">
                <div className="paper-content">{renderKuitansiPreview(kuitansiJenis, payload, previewPage)}</div>
              </div>
				<div
				  id="pdf-export-root"
				  style={{
					position: "fixed",
					left: "-9999px",
					top: 0
				  }}
				>
				  {renderAllKuitansiPreview(kuitansiJenis, payload)}
				</div>

            </div>
          </div>
        </div>
      </section>

      {openPayload && (
        <div className="payload-modal">
        <div className="payload-card">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
          <button onClick={() => setOpenPayload(false)}>
            <X size={18} />
          </button>
        </div>
        </div>
      )}
    </div>
  );
}
