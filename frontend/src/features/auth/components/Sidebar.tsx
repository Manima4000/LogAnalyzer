interface Props {
  role: 'admin' | 'analyst' | null;
  onSelect: (section: string) => void;
  active: string;
}

export default function Sidebar({ role, onSelect, active }: Props) {
  const buttonClass = (key: string) =>
    `flex items-center space-x-2 cursor-pointer p-2 rounded ${
      active === key ? 'bg-blue-300 text-white' : 'text-white hover:bg-white/10'
    }`;

  return (
    <nav className="flex flex-col space-y-2">
      <div className={buttonClass('services')} onClick={() => onSelect('services')}>
        <i className="bi bi-speedometer2 text-blue-300"></i>
        <span>Serviços</span>
      </div>

      <div className={buttonClass('logs')} onClick={() => onSelect('logs')}>
        <i className="bi bi-journal-text text-blue-300"></i>
        <span>Meus Logs</span>
      </div>

      {role === 'admin' && (
        <>
          <div className={buttonClass('manage')} onClick={() => onSelect('manage')}>
            <i className="bi bi-tools text-blue-300"></i>
            <span>Gerenciar Serviços</span>
          </div>

          <div className={buttonClass('alerts')} onClick={() => onSelect('alerts')}>
            <i className="bi bi-exclamation-triangle text-blue-300"></i>
            <span>Alertas</span>
          </div>

          <div className={buttonClass('allLogs')} onClick={() => onSelect('allLogs')}>
            <i className="bi bi-clipboard-data text-blue-300"></i>
            <span>Todos os Logs</span>
          </div>
        </>
      )}
    </nav>
  );
}
