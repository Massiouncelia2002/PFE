// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profil = () => {
//   const [profil, setProfil] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfil = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No authentication token found");
//         }

//         console.log("Fetching profile from:", `${process.env.REACT_APP_API_URL}/utilisateur/profil`);
        
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/utilisateur/profil`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.data) {
//           throw new Error("Empty response from server");
//         }

//         console.log("Profile data received:", response.data);
//         setProfil(response.data);
//       } catch (err) {
//         console.error("Profile fetch error:", {
//           message: err.message,
//           status: err.response?.status,
//           data: err.response?.data,
//           config: err.config,
//         });
//         setError(
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to load profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfil();
//   }, []);

//   if (loading) {
//     return <div className="p-4 text-gray-500">Loading profile...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-red-500">Error: {error}</div>;
//   }

//   if (!profil) {
//     return <div className="p-4 text-yellow-600">No profile data available</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-blue-800">Mon Profil</h2>
//       <div className="space-y-3">
//         <p><span className="font-semibold">Code utilisateur:</span> {profil.codeUtilisateur}</p>
//         <p><span className="font-semibold">Nom:</span> {profil.nom}</p>
//         <p><span className="font-semibold">Prénom:</span> {profil.prenom}</p>
//         <p><span className="font-semibold">Email:</span> {profil.email}</p>
//         <p><span className="font-semibold">Poste de travail:</span> {profil.posteTravail || "Non renseigné"}</p>
//         <p><span className="font-semibold">Branche fonctionnelle:</span> {profil.brancheFonction || "Non renseignée"}</p>
//         <p><span className="font-semibold">Rôle:</span> {profil.role}</p>
//         <p><span className="font-semibold">Date création:</span> {new Date(profil.dateCreation).toLocaleDateString()}</p>
//         {profil.dateFin && (
//           <p><span className="font-semibold">Date fin:</span> {new Date(profil.dateFin).toLocaleDateString()}</p>
//         )}
//         <p>
//           <span className="font-semibold">Statut:</span> 
//           <span className={profil.statut ? "text-green-600" : "text-red-600"}>
//             {profil.statut ? " Actif" : " Inactif"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Profil;


import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Briefcase, Calendar, Shield, Building, Hash, Clock } from "lucide-react";

const Profil = () => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        console.log("Fetching profile from:", `${process.env.REACT_APP_API_URL}/utilisateur/profil`);
        
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/utilisateur/profil`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          throw new Error("Empty response from server");
        }

        console.log("Profile data received:", response.data);
        setProfil(response.data);
      } catch (err) {
        console.error("Profile fetch error:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          config: err.config,
        });
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mb-4"></div>
          <p className="text-blue-900 font-medium">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 border-l-4 border-red-500">
          <div className="text-red-600 text-center">
            <div className="mb-4">⚠️</div>
            <h3 className="font-semibold text-lg mb-2">Erreur de chargement</h3>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 border-l-4 border-yellow-500">
          <div className="text-yellow-600 text-center">
            <div className="mb-4">📋</div>
            <h3 className="font-semibold text-lg mb-2">Aucune donnée</h3>
            <p className="text-sm text-gray-600">Aucune information de profil disponible</p>
          </div>
        </div>
      </div>
    );
  }

  const profileFields = [
    {
      icon: Hash,
      label: "Code utilisateur",
      value: profil.codeUtilisateur,
      type: "code"
    },
    {
      icon: User,
      label: "Nom complet",
      value: `${profil.prenom} ${profil.nom}`,
      type: "name"
    },
    {
      icon: Mail,
      label: "Adresse email",
      value: profil.email,
      type: "email"
    },
    {
      icon: Briefcase,
      label: "Poste de travail",
      value: profil.posteTravail || "Non renseigné",
      type: "job"
    },
    {
      icon: Building,
      label: "Branche fonctionnelle",
      value: profil.brancheFonction || "Non renseignée",
      type: "department"
    },
    {
      icon: Shield,
      label: "Rôle",
      value: profil.role,
      type: "role"
    },
    {
      icon: Calendar,
      label: "Date de création",
      value: new Date(profil.dateCreation).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      type: "date"
    }
  ];

  if (profil.dateFin) {
    profileFields.push({
      icon: Clock,
      label: "Date de fin",
      value: new Date(profil.dateFin).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      type: "date"
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600 text-lg">Informations personnelles et professionnelles</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Status Banner */}
          <div 
            className={`px-8 py-4 ${
              profil.statut 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-red-500 to-rose-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${profil.statut ? 'bg-white' : 'bg-white'} animate-pulse`}></div>
                <span className="text-white font-semibold">
                  Statut: {profil.statut ? 'Compte Actif' : 'Compte Inactif'}
                </span>
              </div>
              <div className="text-white text-sm opacity-90">
                Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {profileFields.map((field, index) => {
                const IconComponent = field.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-blue-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center group-hover:from-blue-900 group-hover:to-blue-700 transition-all duration-300 group-hover:scale-110">
                            <IconComponent className="w-6 h-6 text-blue-700 group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <dt className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                            {field.label}
                          </dt>
                          <dd className={`text-lg font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 ${
                            field.type === 'email' ? 'break-all' : 'break-words'
                          }`}>
                            {field.value}
                          </dd>
                        </div>
                      </div>
                      
                      {/* Special styling for different field types */}
                      {field.type === 'name' && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            <span>Utilisateur principal</span>
                          </div>
                        </div>
                      )}
                      
                      {field.type === 'role' && (
                        <div className="mt-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 group-hover:bg-yellow-100 group-hover:text-yellow-800 transition-colors duration-300">
                            {field.value}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-500">
                Profil créé le {new Date(profil.dateCreation).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-md transition-all duration-300 font-medium">
                  Modifier
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
                  Paramètres
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temps d'activité</p>
                <p className="text-2xl font-bold text-blue-900">
                  {Math.floor((new Date() - new Date(profil.dateCreation)) / (1000 * 60 * 60 * 24))} jours
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-700" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Niveau d'accès</p>
                <p className="text-2xl font-bold text-yellow-600">{profil.role}</p>
              </div>
              <Shield className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Statut du compte</p>
                <p className={`text-2xl font-bold ${profil.statut ? 'text-green-600' : 'text-red-600'}`}>
                  {profil.statut ? 'Actif' : 'Inactif'}
                </p>
              </div>
              <User className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;