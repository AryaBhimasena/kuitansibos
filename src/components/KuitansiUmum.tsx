// components/KuitansiUmum.tsx
"use client";

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import "@/styles/pages/buat-kuitansi.css";

/* ============================================================
 * HELPERS & RENDERERS
 * ============================================================ */
import { mapJenisKuitansi } from "@/lib/kuitansi-helper";
import { renderKuitansiForm } from "@/lib/render-form-helper";
import {
  renderKuitansiPreview,
  renderAllKuitansiPreview,
  isLandscapePage,
} from "@/lib/render-preview-helper";

/* ============================================================
 * HOOKS & UTILS
 * ============================================================ */
import {
  useKuitansiFlow,
  useKuitansiPayload,
} from "@/lib/useKuitansiHook";

import {
  stepToPage,
  pageToStep,
} from "@/lib/kuitansi/stepPageMapper";

import { exportKuitansiPDF } from "@/lib/kuitansi/exportPdf";
import { useKuitansiOrchestrator } from "@/lib/kuitansi/useKuitansiOrchestrator";

/* ============================================================
 * COMPONENT
 * ============================================================ */
export default function KuitansiOrchestratorPage({
  jenis,
  mode,
  id,
}: {
  jenis?: string;
  mode?: string;
  id?: string;
}) {
  /* ==========================================================
   * ROUTER & JENIS RESOLUTION
   * ========================================================== */
  const router = useRouter();
  const kuitansiJenis = mapJenisKuitansi(jenis);

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

	/* ==========================================================
	 * LOCAL UI STATE & HELPER
	 * ========================================================== */
	const [openPayload, setOpenPayload] = useState(false);
	const [previewPage, setPreviewPage] = useState(0);

	const isHonor = kuitansiJenis === "HONOR";
	const HONOR_STEPS = [0, 2, 3, 6];
	const DEFAULT_STEPS = [0, 1, 2, 3, 4, 5];
	const ACTIVE_STEPS = isHonor ? HONOR_STEPS : DEFAULT_STEPS;

	/* ==========================================================
	 * PAYLOAD & FLOW STATE
	 * ========================================================== */
	const { payload, setPayload } = useKuitansiPayload();

	const {
	  step,
	  zoom,
	  TOTAL_STEP,
	  nextStep,
	  prevStep,
	  goToStep,
	  zoomIn,
	  zoomOut,
	} = useKuitansiFlow(kuitansiJenis, ACTIVE_STEPS);

	/* ==========================================================
	 * DERIVED STATE (SETELAH step ADA)
	 * ========================================================== */
	const currentIndex = ACTIVE_STEPS.indexOf(step);

	const PREVIEW_PAGES = isHonor
	  ? [
		  { value: 0, label: "Page 1" },
		  { value: 1, label: "Page 2" },
		]
	  : [
		  { value: 0, label: "Page 1" },
		  { value: 1, label: "Page 2" },
		  { value: 2, label: "Page 3" },
		  { value: 3, label: "Page 4" },
		  { value: 4, label: "Page 5" },
		];

  /* ==========================================================
   * ORCHESTRATOR (FETCH EDIT + SUBMIT)
   * ========================================================== */
  const { isLoaded, submit } = useKuitansiOrchestrator({
    mode,
    id,
    kuitansiJenis,
    setPayload,
    goToStep,
  });

  const handleSubmit = () => submit(payload);
  const handleExportPDF = () => exportKuitansiPDF(jenis, payload);

  /* ==========================================================
   * EFFECT: SYNC STEP → PREVIEW PAGE
   * ========================================================== */
  useEffect(() => {
    setPreviewPage(stepToPage(kuitansiJenis, step));
  }, [step]);

  /* ==========================================================
   * EFFECT: DEBUG LOG (INTENTIONAL, TIDAK DIHAPUS)
   * ========================================================== */
  useEffect(() => {
    console.log("RAW JENIS FROM ROUTE =", jenis);
    console.log("MAPPED JENIS =", kuitansiJenis);
  }, [jenis, kuitansiJenis]);

  /* ==========================================================
   * RENDER
   * ========================================================== */
  return (
    <div className="kuitansi-orchestrator">
      {/* ================= FORM SIDE ================= */}
      <aside className="orchestrator-form">
        <header className="form-header">
          <button
            className="btn-back"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>
          <h2>{title}</h2>
        </header>

        <div className="form-body">
          {renderKuitansiForm(
            kuitansiJenis,
            step,
            payload,
            setPayload
          )}
        </div>

		<footer className="form-footer">
		  <button
			onClick={() => goToStep(ACTIVE_STEPS[currentIndex - 1])}
			disabled={currentIndex === 0}
		  >
			Prev
		  </button>

		  <button
			onClick={() => goToStep(ACTIVE_STEPS[currentIndex + 1])}
			disabled={currentIndex === ACTIVE_STEPS.length - 1}
		  >
			Next
		  </button>
		</footer>

        <button className="btn-submit" onClick={/*() => setOpenPayload(true) */ handleSubmit}>
          Simpan
        </button>
      </aside>

      {/* ================= PREVIEW SIDE ================= */}
      <section className="orchestrator-preview">
        <div className="preview-toolbar">
          <button onClick={() => zoomIn()}>
            Zoom +
          </button>
          <button onClick={() => zoomOut()}>
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
			  goToStep(pageToStep(kuitansiJenis, page));
		    }}
		  >
		    {PREVIEW_PAGES.map((p) => (
			  <option key={p.value} value={p.value}>
			    {p.label}
			  </option>
		    ))}
		  </select>

        </div>

        <div className="preview-viewport">
          <div className="viewport-center">
            <div
              className="preview-canvas single-page"
              style={{ transform: `scale(${zoom})` }}
            >
				<div
				  className={`preview-paper ${
					isLandscapePage(kuitansiJenis, previewPage)
					  ? "preview-paper-landscape"
					  : "preview-paper-portrait"
				  }`}
				>
				  <div className="paper-content">
					{renderKuitansiPreview(
					  kuitansiJenis,
					  payload,
					  previewPage
					)}
				  </div>
				</div>


              {/* ===== HIDDEN PDF EXPORT ROOT ===== */}
              <div
                id="pdf-export-root"
                style={{
                  position: "fixed",
                  left: "-9999px",
                  top: 0,
                }}
              >
                {renderAllKuitansiPreview(
                  kuitansiJenis,
                  payload
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAYLOAD DEBUG MODAL ================= */}
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
