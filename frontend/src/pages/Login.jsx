
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tentatives, setTentatives] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  const isBlocked = tentatives >= 3 && remainingTime > 0;

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const finalMode = savedMode ?? systemDark;
    setDarkMode(finalMode);
    document.documentElement.classList.toggle("dark", finalMode);

    const savedTentatives = parseInt(localStorage.getItem("tentatives")) || 0;
    const savedBlockedAt = localStorage.getItem("blockedAt");

    if (savedTentatives >= 3 && savedBlockedAt) {
      const elapsed = Date.now() - parseInt(savedBlockedAt);
      const cooldown = 1 * 60 * 1000;
      const remaining = Math.max(cooldown - elapsed, 0);

      if (remaining > 0) {
        setTentatives(savedTentatives);
        setRemainingTime(Math.ceil(remaining / 1000));
        const interval = setInterval(() => {
          const newRemaining = Math.ceil((parseInt(savedBlockedAt) + cooldown - Date.now()) / 1000);
          if (newRemaining <= 0) {
            clearInterval(interval);
            localStorage.removeItem("tentatives");
            localStorage.removeItem("blockedAt");
            setTentatives(0);
            setRemainingTime(0);
          } else {
            setRemainingTime(newRemaining);
          }
        }, 1000);
        return () => clearInterval(interval);
      } else {
        localStorage.removeItem("tentatives");
        localStorage.removeItem("blockedAt");
      }
    }

    setTentatives(savedTentatives);
  }, []);

  const escapeInput = (input) => input.replace(/[<>"';(){}]/g, "");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      toast.error("Trop de tentatives. Veuillez patienter...", { theme: darkMode ? "dark" : "light" });
      return;
    }

    setLoading(true);
    const safeEmail = escapeInput(email.trim());
    const safePassword = escapeInput(password.trim());

    if (!safeEmail || !safePassword) {
      toast.error("Veuillez remplir tous les champs.", { theme: darkMode ? "dark" : "light" });
      setLoading(false);
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL;

    if (!API_URL) {
      toast.error("URL API non définie. Contactez l’administrateur.", { theme: darkMode ? "dark" : "light" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: safeEmail, password: safePassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Échec de la connexion");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("nom", data.nom || "");
      localStorage.setItem("prenom", data.prenom || "");
      localStorage.removeItem("tentatives");
      localStorage.removeItem("blockedAt");
      setTentatives(0);
      setRemainingTime(0);

      const roleRoutes = {
        "Admin Fonctionnel": "/admin-fonctionnel",
        "Planificateur": "/gestionnaire-depot",
        "Admin Dépôt": "/admin-depot",
      };

      const route = roleRoutes[data.role];
      if (!route) {
        toast.error("Rôle inconnu. Contactez l’administrateur.", { theme: darkMode ? "dark" : "light" });
        setLoading(false);
        return;
      }

      toast.success(`Connexion réussie, bienvenue ${data.prenom || data.nom || ""}!`, {
        theme: darkMode ? "dark" : "light",
        position: "top-center",
      });
      setTimeout(() => navigate(route), 1000);
    } catch (error) {
      const newTentatives = tentatives + 1;
      setTentatives(newTentatives);
      localStorage.setItem("tentatives", newTentatives.toString());

      if (newTentatives >= 3) {
        const now = Date.now();
        localStorage.setItem("blockedAt", now.toString());
        setRemainingTime(1 * 60); // 15 minutes en secondes
      }

      toast.error(error.message, { theme: darkMode ? "dark" : "light", position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#dfefff] dark:bg-gray-900 overflow-hidden">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: false,
          background: { color: { value: darkMode ? "#1f2937" : "#dfefff" } },
          particles: {
            color: { value: "#002855" },
            links: { enable: true, color: "#002855", distance: 100 },
            move: { enable: true, speed: 0.5 },
            number: { value: 40 },
            opacity: { value: 0.2 },
            size: { value: 2 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 w-[90%] max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center relative">
          <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Basculer le mode sombre"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <h2 className="text-3xl font-bold text-[#002855] dark:text-gray-200 mb-1">Bienvenue sur</h2>
          <h1 className="text-4xl font-extrabold text-[#FFC72C] mb-8">StockFlow</h1>

          {tentatives > 0 && !isBlocked && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg dark:bg-red-200 dark:text-red-900">
              ⚠️ Tentatives échouées : <strong>{tentatives}</strong>
            </div>
          )}

          {isBlocked && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg dark:bg-yellow-200 dark:text-yellow-900">
              🔒 Trop de tentatives. Réessayez dans <strong>{formatTime(remainingTime)}</strong>.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                Adresse Email
              </label>
              <input
                id="email"
                type="email"
                disabled={isBlocked || loading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002855] dark:focus:ring-[#FFC72C] dark:bg-gray-700 dark:text-white transition"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                disabled={isBlocked || loading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002855] dark:focus:ring-[#FFC72C] dark:bg-gray-700 dark:text-white transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isBlocked}
              className="w-full flex items-center justify-center gap-2 bg-[#002855] text-white font-bold py-2 rounded-xl hover:bg-[#001f3f] dark:bg-[#FFC72C] dark:text-[#002855] dark:hover:bg-[#e6b400] transition duration-300 shadow-md disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white dark:text-[#002855]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Chargement...
                </>
              ) : (
                "Authentiflow"
              )}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-6">
          <img
            src="/images/logosansback.png"
            alt="Logo StockFlow"
            className="w-[80%] max-h-[400px] object-contain dark:invert drop-shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
