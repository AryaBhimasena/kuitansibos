interface Props {
  tahap: string;
  onLogout: () => void;
}

export default function DashboardHeader({ tahap, onLogout }: Props) {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h1>Dashboard Pemanfaatan Dana BOSP</h1>

        <div className="header-bottom">
          {/* <p>
             Periode Aktif: <strong>{tahap}</strong> 
          </p> */}

          <span className="logout-text" onClick={onLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
