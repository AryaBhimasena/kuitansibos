import { Suspense } from "react";
import KuitansiClient from "./KuitansiClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Memuat kuitansi…</div>}>
      <KuitansiClient />
    </Suspense>
  );
}
