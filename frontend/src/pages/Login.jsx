// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();


//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem("darkMode", JSON.stringify(newMode));
//     document.documentElement.classList.toggle("dark", newMode);
//   };

 
//   useEffect(() => {
//     const savedMode = JSON.parse(localStorage.getItem("darkMode"));
//     const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     setDarkMode(savedMode ?? systemDark);
//     document.documentElement.classList.toggle("dark", savedMode ?? systemDark);
//   }, []);

//   const MoonIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" 
//          className="h-6 w-6"
//          fill="none"
//          viewBox="0 0 24 24"
//          stroke="currentColor">
//       <path strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//     </svg>
//   );


//   const SunIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg"
//          className="h-6 w-6"
//          fill="none"
//          viewBox="0 0 24 24"
//          stroke="yellow">
//       <path strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
//     </svg>
//   );

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       toast.success("Login successful!", { position: "top-center" });

//       const roleRoutes = {
//         "Admin Fonctionnel": "/admin-fonctionnel",
//         "Gestionnaire Dépôt": "/gestionnaire-depot",
//         "Admin Dépôt": "/admin-depot"
//       };

//       navigate(roleRoutes[data.role] || "/");
      
//     } catch (error) {
//       toast.error(error.message, { position: "top-center" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">

//       <button
//         onClick={toggleDarkMode}
//         className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//       >
//         {darkMode ? (
//           <SunIcon className="text-gray-800 dark:text-gray-200" />
//         ) : (
//           <MoonIcon className="text-gray-800 dark:text-gray-200" />
//         )}
//       </button>

//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienvenue sur l'application</h1>
//           <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
//             Authentification
//           </h2>
//         </div>

//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

           

//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
//             >
//               Se connecter
//             </button>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"></span>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;





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
  const navigate = useNavigate();

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
  }, []);

  // Nettoyer l'input pour éviter injections simples
  const escapeInput = (input) =>
    input.replace(/[<>"'`;(){}]/g, "");

  const handleLogin = async (e) => {
    e.preventDefault();
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

      const roleRoutes = {
        "Admin Fonctionnel": "/admin-fonctionnel",
        "Gestionnaire Dépôt": "/gestionnaire-depot",
        "Admin Dépôt": "/admin-depot",
      };

      const route = roleRoutes[data.role];
      if (!route) {
        toast.error("Rôle inconnu. Contactez l’administrateur.", { theme: darkMode ? "dark" : "light" });
        setLoading(false);
        return;
      }

      toast.success(`Connexion réussie, bienvenue ${data.prenom || data.nom || ""}!`, { theme: darkMode ? "dark" : "light", position: "top-center" });
      setTimeout(() => navigate(route), 1000);

    } catch (error) {
      toast.error(error.message, { theme: darkMode ? "dark" : "light", position: "top-center" });
    } finally {
      setLoading(false);
    }
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

          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                Adresse Email
              </label>
              <input
                id="email"
                type="email"
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
              disabled={loading}
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
