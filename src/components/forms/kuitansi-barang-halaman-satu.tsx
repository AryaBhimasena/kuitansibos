"use client";

import Step1DataKuitansi from "./StepSatu";
import Step2DataBarang from "./StepDua";
import Step3DataPenerima from "./StepTiga";
import Step4PenyerahanDana from "./StepEmpat";

type Props = {
  step: number;
  data: any;
  setData: (fn: (prev: any) => any) => void;
};

export default function KuitansiBarangHalamanSatu({
  jenis,
  step,
  data,
  setData,
}: Props) {
  switch (step) {
    case 0:
      return (
        <Step1DataKuitansi
          data={data}
          setData={setData}
        />
      );

    case 1:
      return (
        <Step2DataBarang
          data={data}
          setData={setData}
        />
      );

    case 2:
      return (
        <Step3DataPenerima
		  jenis={jenis}
          data={data}
          setData={setData}
        />
      );

    case 3:
      return (
        <Step4PenyerahanDana
          jenis={jenis}
          data={data}
          setData={setData}
        />
      );

    default:
      return null;
  }
}
