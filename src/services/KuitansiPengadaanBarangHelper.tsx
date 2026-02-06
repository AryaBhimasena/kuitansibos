import { API_URL } from "@/lib/api";

/* ================= CREATE ================= */
export async function createKuitansiBarang(payload: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      path: "createKuitansiBarang",
      ...payload
    })
  });

  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  return JSON.parse(text);
}

/* ================= GET HEADER ================= */
export async function getKuitansiBarangHeader() {
  const res = await fetch(`${API_URL}?path=getKuitansiBarangHeader`);
  const json = await res.json();
  return json;
}
