"use client";

import { useEffect, useState } from "react";

export function useKuitansiOrchestrator({
  mode,
  id,
  kuitansiJenis,
  setPayload,
  goToStep,
}: {
  mode?: string;
  id?: string;
  kuitansiJenis: string;
  setPayload: any;
  goToStep: (n: number) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(mode !== "edit");

  useEffect(() => {
    if (!mode) return;

    if (mode !== "edit") {
      setIsLoaded(true);
      return;
    }

    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://script.google.com/macros/s/AKfycbxRd37N6y8vsTgdtW0xcl9f3HWqUu4r1pwWr_LQeqb4bBUOm9k9XzXQqcGvdq2WzPm64w/exec?action=getKuitansiById&id=${encodeURIComponent(id)}`
        );

        const json = await res.json();

        if (!json.success) {
          setIsLoaded(true);
          return;
        }

        setPayload(prev => ({
          ...prev,
          ...json.data,
		  id_kuitansi: id,
          barang: json.data.barang ?? [],
        }));

        goToStep(0);
        setIsLoaded(true);
      } catch {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [mode, id]);

  const submit = async (payload: any) => {
    const formData = new FormData();

    formData.append("jenis", kuitansiJenis);
    formData.append("payload", JSON.stringify(payload));


	  if (mode === "edit") {
		formData.append("action", "saveKuitansi");
	  } else {
		formData.append("action", "saveKuitansi");
	  }

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxRd37N6y8vsTgdtW0xcl9f3HWqUu4r1pwWr_LQeqb4bBUOm9k9XzXQqcGvdq2WzPm64w/exec",
      { method: "POST", body: formData }
    );

    const result = await res.json();
    if (!result.success) alert(result.message);
    else alert("Berhasil disimpan");
  };

  return { isLoaded, submit };
}
