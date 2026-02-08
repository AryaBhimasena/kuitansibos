import KuitansiBarangHalamanSatu from "@/components/forms/kuitansi-barang-halaman-satu";
import KuitansiBarangHalamanDua from "@/components/forms/kuitansi-barang-halaman-dua";
import KuitansiBarangHalamanEmpat from "@/components/forms/kuitansi-barang-halaman-empat";

function FormPlaceholder({ title }: { title: string }) {
  return (
    <div className="form-card">
      <h4>{title}</h4>
      <p>Form field step ini akan di-render di sini</p>
    </div>
  );
}

const FORM_SUPPORTED = ["BARANG", "KONSUMSI"];

export function renderKuitansiForm(
  jenis: string,
  step: number,
  payload: any,
  setPayload: any
) {
  if (!FORM_SUPPORTED.includes(jenis)) return null;

  switch (step) {
    case 0:
    case 1:
    case 2:
    case 3:
      return (
        <KuitansiBarangHalamanSatu
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
