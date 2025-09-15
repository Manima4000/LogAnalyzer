import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await registerUser({ username, password });
      if (success) {
        navigate('/login');
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/backgroundImage.png')" }}
    >
      {showError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Erro ao registrar</h2>
            <p className="text-gray-700 mb-6">Não foi possível concluir o registro. Tente novamente.</p>
            <button
              onClick={() => setShowError(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center space-y-6">
        
        {/* Ícone no topo */}
        <div className="bg-blue-500 p-5 rounded-full shadow-lg">
          <i className="bi bi-person-plus text-white text-3xl"></i>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-blue-300 tracking-wide text-center">
          Criar Conta
        </h1>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="w-full space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 pl-10 rounded bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-white">
              <i className="bi bi-person"></i>
            </div>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-3 pl-10 rounded bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-white">
              <i className="bi bi-shield-lock"></i>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300 font-semibold"
          >
            REGISTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
