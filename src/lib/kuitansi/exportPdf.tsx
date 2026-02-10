import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function isLandscapeElement(el: HTMLElement) {
  return el.classList.contains("preview-paper-landscape");
}

export async function exportKuitansiPDF(
  jenis: string | undefined,
  payload: any
) {
  const pages = document.querySelectorAll(
    ".pdf-page"
  ) as NodeListOf<HTMLElement>;

  if (!pages.length) return;

  let pdf: jsPDF | null = null;

  for (let i = 0; i < pages.length; i++) {
    const pageEl = pages[i];
    const landscape = pageEl.classList.contains(
      "preview-paper-landscape"
    );

    // buat PDF instance pertama
    if (!pdf) {
      pdf = new jsPDF({
        orientation: landscape ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });
    } else {
      pdf.addPage("a4", landscape ? "landscape" : "portrait");
    }

    const canvas = await html2canvas(pageEl, {
      scale: 1.5,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.8);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(
      pageWidth / canvas.width,
      pageHeight / canvas.height
    );

    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(
      imgData,
      "JPEG",
      x > 0 ? x : 0,
      y > 0 ? y : 0,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );
  }

  const jenisNama = jenis?.toLowerCase() || "kuitansi";
  const noKuitansi =
    payload?.kuitansi?.noKuitansi || "nonumber";

  pdf?.save(`${jenisNama}-${noKuitansi}.pdf`);
}
