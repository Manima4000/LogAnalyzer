import ServicesSection from './sections/ServiceSection';
import LogsSection from './sections/LogsSection';
import AlertsSection from './sections/AlertSection';
import ManageServicesSection from './sections/ManageServiceSection';

interface Props {
  role: 'admin' | 'analyst';
  section: string;
  token: string;
  username: string;
}

export default function DashboardContent({ role, section, token }: Props) {
  const renderSection = () => {
    switch (section) {
      case 'services':
        return <ServicesSection token={token} />;
      case 'logs':
        return <LogsSection token={token} role={role} />;
      case 'alerts':
        return role === 'admin' ? <AlertsSection token={token} /> : null;
      case 'manage':
        return role === 'admin' ? <ManageServicesSection token={token} /> : null;
      default:
        return <div className="text-white">Seção inválida</div>;
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-blue-300 mb-6">
        Bem-vindo, {role === 'admin' ? 'Administrador' : 'Analista'}
      </h1>
      {renderSection()}
    </div>
  );
}
