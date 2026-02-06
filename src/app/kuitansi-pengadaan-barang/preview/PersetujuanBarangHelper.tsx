/* ================= TYPES ================= */

export type ItemBarang = {
  nama: string;
  qty: number;
  satuan: string;
  harga: number;
};

export type Penerima = {
  namaPenerima: string;
  bank: string;
  noRekening: string;
  atasNama: string;
  npwp: string;
};

export type DataPreview = {
  tanggal: string;
  noBku: string;
  noKuitansi: string;
  pemberiDana: string;
  nominal: number;
  keteranganPembayaran: string;
  items: ItemBarang[];
  tempat?: string;
  penerima: Penerima[];

  jabatanKepala?: string;
  namaKepala?: string;
  nipKepala?: string;

  jabatanBendahara?: string;
  namaBendahara?: string;
  nipBendahara?: string;

  tanggalLunas?: string;
};

/* ================= CONSTANT ================= */

export const MAX_ITEMS_PER_PAGE = 5;

/* ================= UTIL ================= */

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);
  
export function formatTanggalDDMMYYYY(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const bulan = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = bulan[date.getMonth()];
  const yyyy = date.getFullYear();

  return `${dd} ${mm} ${yyyy}`;
}

/* ================= CALCULATION ================= */

export function hitungSubtotal(items: ItemBarang[]) {
  return items.reduce((sum, item) => sum + item.qty * item.harga, 0);
}

export function hitungPPN(subtotal: number) {
  return subtotal * 0.11;
}

export function hitungTotal(subtotal: number, ppn: number, pph22 = 0) {
  return subtotal + ppn - pph22;
}

export function isFooterOverflow(items: ItemBarang[]) {
  return items.length > MAX_ITEMS_PER_PAGE;
}

/* ================= FOOTER SECTION ================= */

type FooterProps = {
  total: number;
  data: DataPreview;
};

export function FooterSection({ total, data }: FooterProps) {
  return (
    <>
		<div className="preview-bank">
		  <div className="bank-info">
			<div className="row">
			  <span className="label">Nama Bank</span>
			  <span className="colon">:</span>
			  <span className="value">{data.penerima.bank || "........"}</span>
			</div>
			<div className="row">
			  <span className="label">No Rekening</span>
			  <span className="colon">:</span>
			  <span className="value">{data.penerima.noRekening || "........"}</span>
			</div>
			<div className="row">
			  <span className="label">Rekening an</span>
			  <span className="colon">:</span>
			  <span className="value">{data.penerima.atasNama || "........"}</span>
			</div>
			<div className="row">
			  <span className="label">NPWP</span>
			  <span className="colon">:</span>
			  <span className="value">{data.penerima.npwp || "........"}</span>
			</div>
		  </div>

		  <div className="preview-receiver">
			Yang Menerima
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			{data.penerima.namaPenerima || "Nama"}
		  </div>
		</div>

      <div className="preview-jumlah">
        <b>Jumlah Rp. {formatRupiah(total)}</b>
      </div>

      <hr />

      <div className="preview-lunas">
        Lunas dibayar, {formatTanggalDDMMYYYY(data.tanggalLunas) || "............."}
        <br />
        Jumlah dalam kuitansi ini telah lunas dibayarkan kepada yang berhak
        menerimanya
      </div>

      <div className="preview-signature">
        <div>
          Setuju dibayar,
          <br />
          {data.jabatanKepala || "Kepala"}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <b>{data.namaKepala || "Nama"}</b>
          <br />
          NIP. {data.nipKepala || "-"}
        </div>

        <div>
          {data.tempat || "Pontianak"}, {formatTanggalDDMMYYYY(data.tanggal) || "........"}
          <br />
          {data.jabatanBendahara || "Bendahara"}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <b>{data.namaBendahara || "Nama"}</b>
          <br />
          NIP. {data.nipBendahara || "-"}
        </div>
      </div>
    </>
  );
}

export function terbilang(n: number): string {
  if (n === 0) return "Nol";

  const angka = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  function convert(x: number): string {
    let str = "";

    if (x < 12) {
      str = angka[x];
    } else if (x < 20) {
      str = convert(x - 10) + " Belas";
    } else if (x < 100) {
      str = convert(Math.floor(x / 10)) + " Puluh";
      if (x % 10 !== 0) str += " " + convert(x % 10);
    } else if (x < 200) {
      str = "Seratus";
      if (x - 100 !== 0) str += " " + convert(x - 100);
    } else if (x < 1000) {
      str = convert(Math.floor(x / 100)) + " Ratus";
      if (x % 100 !== 0) str += " " + convert(x % 100);
    } else if (x < 2000) {
      str = "Seribu";
      if (x - 1000 !== 0) str += " " + convert(x - 1000);
    } else if (x < 1_000_000) {
      str = convert(Math.floor(x / 1000)) + " Ribu";
      if (x % 1000 !== 0) str += " " + convert(x % 1000);
    } else if (x < 1_000_000_000) {
      str = convert(Math.floor(x / 1_000_000)) + " Juta";
      if (x % 1_000_000 !== 0) str += " " + convert(x % 1_000_000);
    } else if (x < 1_000_000_000_000) {
      str = convert(Math.floor(x / 1_000_000_000)) + " Milyar";
      if (x % 1_000_000_000 !== 0) str += " " + convert(x % 1_000_000_000);
    } else if (x < 1_000_000_000_000_000) {
      str = convert(Math.floor(x / 1_000_000_000_000)) + " Triliun";
      if (x % 1_000_000_000_000 !== 0) str += " " + convert(x % 1_000_000_000_000);
    }

    return str.trim();
  }

  return convert(Math.floor(n));
}
