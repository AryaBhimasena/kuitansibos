interface Props {
  label: string;
  value: number;
  color: string;
}

export default function KpiCard({ label, value, color }: Props) {
  return (
    <div className={`menu-card ${color}`}>
      <span className="menu-kpi">
        Rp {value.toLocaleString("id-ID")}
      </span>
      <h4>{label}</h4>
    </div>
  );
}
