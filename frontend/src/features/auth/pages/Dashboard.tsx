import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import { roleVerification } from '../services/roleVerification';
import { getUsernameFromToken } from '../services/authService';

export default function Dashboard() {
  const [role, setRole] = useState<'admin' | 'analyst'>('analyst');
  const [activeSection, setActiveSection] = useState<string>('services');
  const [username, setUsername] = useState<string>('');
  const [token1,setToken1] = useState<string>('')

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found');
      }
      setToken1(token)
      const storedRole = await roleVerification(token);
      const storedUsername = await getUsernameFromToken(token);

      if (storedUsername) setUsername(storedUsername);
      else setUsername('Analista');

      if (storedRole === 'admin' || storedRole === 'analyst') setRole(storedRole);
      else setRole('analyst');
    };
    fetchRole();
  }, []);

   return (
    <div
      className="h-screen bg-cover bg-center flex"
      style={{ backgroundImage: "url('/backgroundImage.png')" }}
    >
      <div className="bg-white/10 backdrop-blur-md border-r border-white/20 w-64 p-6">
        <Sidebar role={role} onSelect={setActiveSection} active={activeSection} />
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        <DashboardContent role={role} username={username} section={activeSection} token= {token1}/>
      </div>
    </div>
  );
}
