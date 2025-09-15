import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import { roleVerification } from '../services/roleVerification';
import { getUsernameFromToken } from '../services/authService';

export default function Dashboard() {
  const [role, setRole] = useState<'admin' | 'analyst' | null>(null);
  const [activeSection, setActiveSection] = useState<string>('services');
  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error('Token não encontrado');
        return;
      }

      setToken(storedToken);

      try {
        const storedRole = await roleVerification(storedToken);
        const storedUsername = await getUsernameFromToken(storedToken);

        setRole(storedRole ?? 'analyst');
        setUsername(storedUsername ?? 'Analista');
      } catch (err) {
        console.error('Erro ao verificar role:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (isLoading || !token || !role) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className="h-screen bg-cover bg-center flex"
      style={{ backgroundImage: "url('/backgroundImage.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md border-r border-white/20 w-64 p-6">
        <Sidebar role={role} onSelect={setActiveSection} active={activeSection} />
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        <DashboardContent
          role={role}
          username={username}
          section={activeSection}
          token={token}
        />
      </div>
    </div>
  );
}