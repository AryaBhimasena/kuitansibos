import KuitansiBarangHalamanSatu from "@/components/forms/kuitansi-barang-halaman-satu";
import KuitansiBarangHalamanDua from "@/components/forms/kuitansi-barang-halaman-dua";
import KuitansiBarangHalamanEmpat from "@/components/forms/kuitansi-barang-halaman-empat";
import StepTigaDataPenerimaHonor from "@/components/forms/kuitansi-honor-data-penerima";

/* ============================================================
 * PLACEHOLDER (TIDAK DIGUNAKAN SAAT INI)
 * ============================================================ */
function FormPlaceholder({ title }: { title: string }) {
  return (
    <div className="form-card">
      <h4>{title}</h4>
      <p>Form field step ini akan di-render di sini</p>
    </div>
  );
}

/* ============================================================
 * SUPPORTED JENIS KUITANSI
 * ============================================================ */
const FORM_SUPPORTED = [
  "BARANG",
  "KONSUMSI",
  "PERJALANAN",
  "HONOR",
];

/* ============================================================
 * MAIN FORM RENDERER
 * ============================================================ */
export function renderKuitansiForm(
  jenis: string,
  step: number,
  payload: any,
  setPayload: any
) {
  if (!FORM_SUPPORTED.includes(jenis)) return null;

  /* ========================================================
   * KHUSUS HONOR
   * ======================================================== */
	if (jenis === "HONOR") {
	  switch (step) {
		case 0:
		case 2:
		case 3:
		  return (
			<KuitansiBarangHalamanSatu
			  jenis={jenis}
			  step={step}
			  data={payload}
			  setData={setPayload}
			/>
		  );

		case 6:
		  return (
			<StepTigaDataPenerimaHonor
			  jenis={jenis}
			  step={step}
			  data={payload}
			  setData={setPayload}
			/>
		  );

		default:
		  return null;
	  }
	}

  /* ========================================================
   * SELAIN HONOR (BARANG, KONSUMSI, PERJALANAN)
   * Mapping tetap sama
   * ======================================================== */
	switch (step) {
	  case 0:
	  case 1:
	  case 2:
	  case 3:
		return (
		  <KuitansiBarangHalamanSatu
			jenis={jenis}
			step={step}
			data={payload}
			setData={setPayload}
		  />
		);

	  case 4:
		return (
		  <KuitansiBarangHalamanDua
			step={step}
			data={payload}
			setData={setPayload}
		  />
		);

	  case 5:
		return (
		  <KuitansiBarangHalamanEmpat
			step={step}
			data={payload}
			setData={setPayload}
		  />
		);

	  default:
		return null;
	}

}
