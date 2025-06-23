



// useEffect(() => {
//         const nouvellesErreurs = {};

//         commandesParClient.forEach((client) => {
//             client.commandes.forEach((cmd) => {
//                 cmd.affectations.forEach((aff, idx) => {
//                     if (!aff.matricule || !aff.datePrevue) return;

//                     const capacite = vehicules.find(v => v.matricule === aff.matricule)?.capaciteVehicule || 0;

//                     const totalTransporte = commandesParClient
//                         .flatMap(c => c.commandes)
//                         .flatMap(c => c.affectations)
//                         .filter(a => a.matricule === aff.matricule && a.datePrevue === aff.datePrevue)
//                         .reduce((sum, a) => sum + (parseFloat(a.quantiteTransporte) || 0), 0);

//                     if (totalTransporte > capacite) {
//                         const key = `${client.codeClient}-${cmd.codeArticle}-${idx}`;
//                         nouvellesErreurs[key] = `🚫 Dépasse la capacité du véhicule (${capacite})`;
//                     }
//                 });
//             });

//             // ✅ Ajouter cette vérification juste après les affectations
//             const totalQuantiteTransporte = cmd.affectations.reduce(
//                 (sum, aff) => sum + (parseFloat(aff.quantiteTransporte) || 0),
//                 0
//             );

//             const quantiteALivrer = parseFloat(cmd.quantiteALivrer) || 0;

//             if (totalQuantiteTransporte > quantiteALivrer) {
//                 const key = `${client.codeClient}-${cmd.codeArticle}`;
//                 nouvellesErreurs[key] = `🚫 Qté transportée (${totalQuantiteTransporte}) > Qté à livrer (${quantiteALivrer})`;
//             }
//         });
//     });

//      setErreurs(prev => ({ ...prev, ...nouvellesErreurs }));
// }, [commandesParClient, vehicules]);



// useEffect(() => {
//     const nouvellesErreurs = {};

//     commandesParClient.forEach((client) => {
//         client.commandes.forEach((cmd) => {
//             // 1. Vérif dépassement de capacité du véhicule
//             cmd.affectations.forEach((aff, idx) => {
//                 if (!aff.matricule || !aff.datePrevue) return;

//                 const capacite = vehicules.find(v => v.matricule === aff.matricule)?.capaciteVehicule || 0;

//                 const totalTransporte = commandesParClient
//                     .flatMap(c => c.commandes)
//                     .flatMap(c => c.affectations)
//                     .filter(a => a.matricule === aff.matricule && a.datePrevue === aff.datePrevue)
//                     .reduce((sum, a) => sum + (parseFloat(a.quantiteTransporte) || 0), 0);

//                 if (totalTransporte > capacite) {
//                     const key = `${client.codeClient}-${cmd.codeArticle}-${idx}`;
//                     nouvellesErreurs[key] = `🚫 Dépasse la capacité du véhicule (${capacite})`;
//                 }
//             });

//             // 2. Vérif dépassement de la quantité à livrer
//             const totalQuantiteTransporte = cmd.affectations.reduce(
//                 (sum, aff) => sum + (parseFloat(aff.quantiteTransporte) || 0),
//                 0
//             );

//             const quantiteALivrer = parseFloat(cmd.quantiteALivrer) || 0;

//             if (totalQuantiteTransporte > quantiteALivrer) {
//                 const key = `${client.codeClient}-${cmd.codeArticle}`;
//                 nouvellesErreurs[key] = `🚫 Qté transportée (${totalQuantiteTransporte}) > Qté à livrer (${quantiteALivrer})`;
//             }
//         });
//     });

//     // ✅ mise à jour des erreurs après toutes les vérifications
//     setErreurs((prev) => ({ ...prev, ...nouvellesErreurs }));
// }, [commandesParClient, vehicules]);







import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AfficherCommandesParClient = () => {
    const location = useLocation();
    const { codeDepot } = location.state || {};

    const [commandesParClient, setCommandesParClient] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [quantitesStockees, setQuantitesStockees] = useState({});
    const [erreurs, setErreurs] = useState({});
    const [vehicules, setVehicules] = useState([]);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        const fetchCommandes = async () => {
            if (!codeDepot) {
                setMessage("Aucun dépôt sélectionné.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:5000/api/commande/commandes/clients?codeDepot=${codeDepot}`,
                    { headers }
                );

                const commandes = res.data.filter(client => client.codeDepot === codeDepot);
                const regroupement = {};
                const stockMap = {};

                commandes.forEach((client) => {
                    client.commandes.forEach((cmd) => {
                        const key = cmd.codeArticle;
                        if (!regroupement[key]) regroupement[key] = [];

                        regroupement[key].push({
                            codeClient: client.codeClient,
                            nomClient: client.nomClient,
                            codeCommande: cmd.codeCommande,
                            dateCommande: cmd.dateCommande,
                            quantiteDemandee: parseFloat(cmd.quantiteCommandee),
                        });

                        stockMap[key] = cmd.quantiteStockee;
                    });
                });

                setQuantitesStockees(stockMap);

                const suggestions = {};
                for (const codeArticle in regroupement) {
                    const clients = regroupement[codeArticle];

                    const partageRes = await axios.post(
                        "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
                        { codeArticle, codeDepot, clients },
                        { headers }
                    );

                    partageRes.data.forEach((entry) => {
                        suggestions[
                            `${entry.codeClient}-${entry.codeCommande}-${codeArticle}`
                        ] = entry.quantiteALivrer;
                    });
                }

                const commandesAvecSuggestions = commandes.map((client) => {
                    const newCommandes = client.commandes.map((cmd) => {
                        const key = `${client.codeClient}-${cmd.codeCommande}-${cmd.codeArticle}`;
                        return {
                            ...cmd,
                            quantiteALivrer: suggestions[key] || 0,
                            affectations: [
                                {
                                    matricule: "",
                                    datePrevue: "",
                                    heurePrevue: "",
                                    dureePrevue: "",
                                    quantiteTransporte: ""
                                }
                            ]
                        };
                    });
                    return { ...client, commandes: newCommandes };
                });

                setCommandesParClient(commandesAvecSuggestions);
            } catch (err) {
                console.error(err);
                setMessage("Erreur lors de la récupération des commandes.");
            } finally {
                setLoading(false);
            }
        };

        const fetchVehicules = async () => {
            try {
                const res = await axios.get("http://localhost:5000/vehicules", { headers });
                setVehicules(res.data);
            } catch (err) {
                console.error("Erreur récupération véhicules:", err);
            }
        };

        fetchCommandes();
        fetchVehicules();
    }, [codeDepot]);




    useEffect(() => {
        const nouvellesErreurs = {};

        commandesParClient.forEach((client) => {
            client.commandes.forEach((cmd) => {
                // Vérification de dépassement de capacité du véhicule
                cmd.affectations.forEach((aff, idx) => {
                    if (!aff.matricule || !aff.datePrevue) return;

                    const capacite = vehicules.find(v => v.matricule === aff.matricule)?.capaciteVehicule || 0;

                    const totalTransporte = commandesParClient
                        .flatMap(c => c.commandes)
                        .flatMap(c => c.affectations)
                        .filter(a => a.matricule === aff.matricule && a.datePrevue === aff.datePrevue)
                        .reduce((sum, a) => sum + (parseFloat(a.quantiteTransporte) || 0), 0);

                    if (totalTransporte > capacite) {
                        const key = `${client.codeClient}-${cmd.codeArticle}-${idx}`;
                        nouvellesErreurs[key] = `🚫 Dépasse la capacité du véhicule (${capacite})`;
                    }
                });

                // Vérification que la somme des quantités transportées ne dépasse pas la quantité à livrer
                const totalQuantiteTransporte = cmd.affectations.reduce(
                    (sum, aff) => sum + (parseFloat(aff.quantiteTransporte) || 0),
                    0
                );

                const quantiteALivrer = parseFloat(cmd.quantiteALivrer) || 0;

                if (totalQuantiteTransporte > quantiteALivrer) {
                    const key = `${client.codeClient}-${cmd.codeArticle}`;
                    nouvellesErreurs[key] = `🚫 Qté transportée (${totalQuantiteTransporte}) > Qté à livrer (${quantiteALivrer})`;
                }
            });
        });

        setErreurs((prev) => ({ ...prev, ...nouvellesErreurs }));
    }, [commandesParClient, vehicules]);




    const getHeuresGrisees = (vehicule, date, currentClient) => {
        const heures = new Set();

        commandesParClient.forEach(client => {
            if (client.codeClient === currentClient) return; // ne pas bloquer les heures du même client

            client.commandes.forEach(cmd => {
                cmd.affectations?.forEach(aff => {
                    if (
                        aff.matricule === vehicule &&
                        aff.datePrevue === date &&
                        aff.heurePrevue &&
                        aff.dureePrevue
                    ) {
                        const debut = parseInt(aff.heurePrevue.split(":")[0], 10);
                        const fin = debut + parseInt(aff.dureePrevue, 10);

                        for (let h = debut; h < fin; h++) {
                            heures.add(h.toString().padStart(2, "0") + ":00");
                        }
                    }
                });
            });
        });

        return heures;
    };




    // const ajouterVehiculeACommande = (codeClient, codeArticle) => {
    //     setCommandesParClient((prev) =>
    //         prev.map((client) => {
    //             if (client.codeClient !== codeClient) return client;

    //             const updatedCommandes = client.commandes.map((cmd) => {
    //                 if (cmd.codeArticle !== codeArticle) return cmd;

    //                 return {
    //                     ...cmd,
    //                     affectations: [
    //                         ...cmd.affectations,
    //                         {
    //                             matricule: "",
    //                             datePrevue: "",
    //                             heurePrevue: "",
    //                             dureePrevue: "",
    //                             quantiteTransporte: ""
    //                         }
    //                     ]
    //                 };
    //             });

    //             return { ...client, commandes: updatedCommandes };
    //         })
    //     );
    // };



    const ajouterVehiculeACommande = (codeClient, codeArticle) => {
        setCommandesParClient((prev) =>
            prev.map((client) => {
                if (client.codeClient !== codeClient) return client;

                const updatedCommandes = client.commandes.map((cmd) => {
                    if (cmd.codeArticle !== codeArticle) return cmd;

                    const affectations = [...cmd.affectations];
                    const nouvelleAffectation = {
                        matricule: "",
                        datePrevue: "",
                        heurePrevue: "",
                        dureePrevue: "",
                        quantiteTransporte: ""
                    };

                    if (affectations.length === 0 || affectations.every(a => !a.matricule)) {
                        // Premier ajout → toute la quantité à livrer
                        nouvelleAffectation.quantiteTransporte = cmd.quantiteALivrer;
                    }

                    affectations.push(nouvelleAffectation);

                    return { ...cmd, affectations };
                });

                return { ...client, commandes: updatedCommandes };
            })
        );
    };


    const supprimerVehiculeDeCommande = (codeClient, codeArticle, index) => {
        setCommandesParClient((prev) =>
            prev.map((client) => {
                if (client.codeClient !== codeClient) return client;

                const updatedCommandes = client.commandes.map((cmd) => {
                    if (cmd.codeArticle !== codeArticle) return cmd;

                    const newAffectations = cmd.affectations.filter((_, idx) => idx !== index);
                    return { ...cmd, affectations: newAffectations };
                });

                return { ...client, commandes: updatedCommandes };
            })
        );
    };



    const handleAffectationChange = (codeClient, codeArticle, index, field, value) => {
        setCommandesParClient((prev) =>
            prev.map((client) => {
                if (client.codeClient !== codeClient) return client;

                const updatedCommandes = client.commandes.map((cmd) => {
                    if (cmd.codeArticle !== codeArticle) return cmd;

                    const newAffectations = [...cmd.affectations];
                    newAffectations[index][field] = value;

                    return { ...cmd, affectations: newAffectations };
                });

                return { ...client, commandes: updatedCommandes };
            })
        );
    };

    const handleQuantiteChange = (codeClient, codeArticle, value) => {
        const parsed = parseFloat(value);
        const newValue = isNaN(parsed) ? 0 : parsed;

        const updatedCommandes = commandesParClient.map((client) => {
            if (client.codeClient !== codeClient) return client;

            return {
                ...client,
                commandes: client.commandes.map((cmd) =>
                    cmd.codeArticle === codeArticle
                        ? { ...cmd, quantiteALivrer: newValue }
                        : cmd
                ),
            };
        });

        const totalLivraison = updatedCommandes
            .flatMap((c) => c.commandes)
            .filter((cmd) => cmd.codeArticle === codeArticle)
            .reduce((sum, cmd) => sum + parseFloat(cmd.quantiteALivrer || 0), 0);

        const stockDisponible = quantitesStockees[codeArticle] || 0;
        const key = `${codeClient}-${codeArticle}`;

        if (newValue < 0) {
            setErreurs((prev) => ({
                ...prev,
                [key]: "❌ Quantité négative non autorisée",
            }));
        } else if (totalLivraison > stockDisponible) {
            setErreurs((prev) => ({
                ...prev,
                [key]: `❌ Stock dépassé (max: ${stockDisponible})`,
            }));
        } else {
            setErreurs((prev) => {
                const copy = { ...prev };
                delete copy[key];
                return copy;
            });
            setCommandesParClient(updatedCommandes);
        }
    };

    const heuresDisponibles = [
        "06:00", "07:00", "08:00", "09:00", "10:00",
        "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00"
    ];

    const handleSaveLivraisons = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/commande/commandes/livrer",
                commandesParClient,
                { headers }
            );
            alert("✅ Livraisons enregistrées avec succès.");
        } catch (err) {
            console.error(err);
            alert("❌ Erreur lors de l'enregistrement des livraisons.");
        }
    };

    if (loading) return <div>Chargement des commandes...</div>;

    return (
        <div className="container mt-4">
            <h2>Commandes par client</h2>

            {message && <div className="alert alert-danger">{message}</div>}

            {commandesParClient.map((client) => (
                <div key={client.codeClient} className="mb-4">
                    <h4>
                        {client.nomClient} ({client.codeClient})
                    </h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Quantité Commandée</th>
                                <th>Quantité à Livrer</th>
                                <th>Véhicule</th>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Durée (h)</th>
                                <th>Qté Transportée</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {client.commandes.map((cmd) => (
                                <React.Fragment key={cmd.codeArticle}>
                                    <tr>
                                        <td>{cmd.designation}</td>
                                        <td>{cmd.quantiteCommandee}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                className={`form-control ${erreurs[`${client.codeClient}-${cmd.codeArticle}`] ? "is-invalid" : ""}`}
                                                value={cmd.quantiteALivrer}
                                                onChange={(e) =>
                                                    handleQuantiteChange(
                                                        client.codeClient,
                                                        cmd.codeArticle,
                                                        e.target.value
                                                    )
                                                }
                                            />



                                            {erreurs[`${client.codeClient}-${cmd.codeArticle}`] && (
                                                <div className="invalid-feedback">{erreurs[`${client.codeClient}-${cmd.codeArticle}`]}</div>
                                            )}
                                            <small className="text-muted">
                                                Stock dispo: {quantitesStockees[cmd.codeArticle] ?? "?"}
                                            </small>
                                        </td>
                                        <td colSpan="4">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => ajouterVehiculeACommande(client.codeClient, cmd.codeArticle)}
                                            >
                                                ➕ Ajouter un véhicule
                                            </button>
                                        </td>
                                    </tr>






                                    {cmd.affectations.map((aff, idx) => {
                                        const heuresGrisees = new Set();
                                        commandesParClient.forEach(otherClient => {
                                            if (otherClient.codeClient === client.codeClient) return;
                                            otherClient.commandes.forEach(otherCmd => {
                                                otherCmd.affectations?.forEach(otherAff => {
                                                    if (
                                                        otherAff.matricule === aff.matricule &&
                                                        otherAff.datePrevue === aff.datePrevue &&
                                                        otherAff.heurePrevue &&
                                                        otherAff.dureePrevue
                                                    ) {
                                                        const debut = parseInt(otherAff.heurePrevue.split(":"))[0];
                                                        const fin = debut + parseInt(otherAff.dureePrevue);
                                                        for (let h = debut; h < fin; h++) {
                                                            heuresGrisees.add(String(h).padStart(2, "0") + ":00");
                                                        }
                                                    }
                                                });
                                            });
                                        });

                                        return (
                                            <tr key={`affect-${idx}`}>
                                                <td colSpan="3"></td>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={aff.matricule}
                                                        onChange={(e) => handleAffectationChange(client.codeClient, cmd.codeArticle, idx, 'matricule', e.target.value)}
                                                    >
                                                        <option value="">Choisir...</option>
                                                        {vehicules.map((v) => (
                                                            <option key={v.matricule} value={v.matricule}>{v.matricule} Capacité: {v.capaciteVehicule}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={aff.datePrevue}
                                                        min={new Date().toISOString().split("T")[0]}
                                                        onChange={(e) => handleAffectationChange(client.codeClient, cmd.codeArticle, idx, 'datePrevue', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={aff.heurePrevue}
                                                        onChange={(e) => handleAffectationChange(client.codeClient, cmd.codeArticle, idx, 'heurePrevue', e.target.value)}
                                                    >
                                                        <option value="">Choisir...</option>
                                                        {heuresDisponibles.map((heure) => (
                                                            <option key={heure} value={heure} disabled={heuresGrisees.has(heure)}>
                                                                {heure} {heuresGrisees.has(heure) ? "⛔" : ""}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={aff.dureePrevue}
                                                        onChange={(e) => handleAffectationChange(client.codeClient, cmd.codeArticle, idx, 'dureePrevue', e.target.value)}
                                                    >
                                                        <option value="">Choisir...</option>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                            <option key={n} value={n}>{n}h</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${erreurs[`${client.codeClient}-${cmd.codeArticle}-${idx}`] ? "is-invalid" : ""}`}
                                                        value={aff.quantiteTransporte}
                                                        onChange={(e) =>
                                                            handleAffectationChange(client.codeClient, cmd.codeArticle, idx, 'quantiteTransporte', e.target.value)
                                                        }
                                                    />
                                                    {erreurs[`${client.codeClient}-${cmd.codeArticle}-${idx}`] && (
                                                        <div className="invalid-feedback">
                                                            {erreurs[`${client.codeClient}-${cmd.codeArticle}-${idx}`]}
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            supprimerVehiculeDeCommande(client.codeClient, cmd.codeArticle, idx)
                                                        }
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>

                                            </tr>
                                        );
                                    })}


                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            {commandesParClient.length > 0 && (
                <div className="text-end">
                    <button
                        className="btn btn-success"
                        onClick={handleSaveLivraisons}
                        disabled={Object.keys(erreurs).length > 0}
                    >
                        Enregistrer les livraisons
                    </button>

                    {/* <button
                        className="btn btn-success"
                        onClick={handleSaveLivraisons}
                        disabled={Object.keys(erreurs).length > 0}
                    ></button> */}
                </div>
            )}
        </div>
    );
};

export default AfficherCommandesParClient;
















