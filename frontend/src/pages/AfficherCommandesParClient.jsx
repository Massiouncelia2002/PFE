

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



const AfficherCommandesParClient = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { codeDepot } = location.state || {};

    const [commandesParClient, setCommandesParClient] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [quantitesStockees, setQuantitesStockees] = useState({});
    const [erreurs, setErreurs] = useState({});
    const [vehicules, setVehicules] = useState([]);
    const [planificationsTemporaires, setPlanificationsTemporaires] = useState([]);



    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const heuresDisponibles = [
        "06:00", "07:00", "08:00", "09:00", "10:00",
        "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00"
    ];



    useEffect(() => {
        const fetchCommandes = async () => {
            if (!codeDepot) {
                setMessage("⚠️ Aucun dépôt sélectionné.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:5000/api/commande/commandes/clients?codeDepot=${codeDepot}`,
                    { headers }
                );



                const commandes = res.data.data.filter(client => client.codeDepot === codeDepot);
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
                    const commandesFiltrees = client.commandes
                        .map((cmd) => {
                            const key = `${client.codeClient}-${cmd.codeCommande}-${cmd.codeArticle}`;
                            const quantiteALivrer = suggestions[key] || 0;

                            const totalPlanifieDB = cmd.planifications?.reduce(
                                (sum, p) => sum + (parseFloat(p.quantiteTransporte) || 0),
                                0
                            ) || 0;

                            // ✅ Exclure les commandes totalement planifiées
                            // if (cmd.planifications && cmd.planifications.length > 0) return null;

                            // if (totalPlanifieDB > 0) return null;

                            if (totalPlanifieDB >= cmd.quantiteCommandee) return null;

                            // // ❌ Cette commande est déjà planifiée, on la masque
                            // if (totalPlanifieDB >= quantiteALivrer) return null;


                            return {
                                ...cmd,
                                quantiteALivrer,
                                affectations: [{
                                    matricule: "",
                                    datePrevue: "",
                                    heurePrevue: "",
                                    dureePrevue: "",
                                    quantiteTransporte: ""
                                }]
                            };
                        })
                        .filter(c => c !== null);

                    return {
                        ...client,
                        commandes: commandesFiltrees
                    };
                }).filter(client => client.commandes.length > 0);



                setCommandesParClient(commandesAvecSuggestions);
            } catch (err) {
                console.error(err);
                setMessage("❌ Erreur lors de la récupération des commandes.");
            } finally {
                setLoading(false);
            }
        };

        const fetchVehicules = async () => {
            try {
                const res = await axios.get("http://localhost:5000/vehicules", { headers });
                setVehicules(res.data);
            } catch (err) {
                console.error("❌ Erreur récupération véhicules:", err);
            }
        };

        fetchCommandes();
        fetchVehicules();
    }, [codeDepot]);


    const [plagesOccupeesDB, setPlagesOccupeesDB] = useState({});


    useEffect(() => {
        const chargerPlagesOccupees = async () => {
            try {
                const result = {};

                // Exécuter tous les appels API en parallèle
                const requetes = vehicules.map(vehicule =>
                    axios.get(
                        `http://localhost:5000/vehicules/${vehicule.matricule}/plages-occupees`,
                        { headers }
                    ).then(res => ({ vehicule, plages: res.data }))
                );

                const reponses = await Promise.all(requetes);

                reponses.forEach(({ vehicule, plages }) => {
                    plages.forEach(plage => {
                        const date = plage.date.split("T")[0];
                        const start = parseInt(plage.heureDebut.split(":")[0]);
                        const end = parseInt(plage.heureFin.split(":")[0]);

                        if (!result[vehicule.matricule]) result[vehicule.matricule] = {};
                        if (!result[vehicule.matricule][date]) result[vehicule.matricule][date] = new Set();

                        for (let h = start; h < end; h++) {
                            result[vehicule.matricule][date].add(`${h.toString().padStart(2, '0')}:00`);
                        }
                    });
                });

                setPlagesOccupeesDB(result);
            } catch (err) {
                console.error("Erreur chargement plages occupées DB:", err);
            }
        };

        if (vehicules.length > 0) {
            chargerPlagesOccupees();
        }
    }, [vehicules]);


    const getHeuresOccupees = (matricule, date, skipAffectation = null) => {
        const heuresOccupees = new Set();

        // ✅ Données locales (affectations non sauvegardées encore)
        commandesParClient.forEach(client => {
            client.commandes.forEach(cmd => {
                cmd.affectations.forEach(aff => {
                    const currentKey = `${client.codeClient}-${cmd.codeArticle}-${cmd.affectations.indexOf(aff)}`;
                    if (
                        aff.matricule === matricule &&
                        aff.datePrevue === date &&
                        aff.heurePrevue &&
                        aff.dureePrevue &&
                        (!skipAffectation || skipAffectation !== currentKey)
                    ) {
                        const debut = parseInt(aff.heurePrevue.split(':')[0]);
                        const fin = debut + parseInt(aff.dureePrevue);
                        for (let h = debut; h < fin; h++) {
                            heuresOccupees.add(`${h.toString().padStart(2, '0')}:00`);
                        }
                    }
                });
            });
        });

        planificationsTemporaires.forEach(planif => {
            if (
                planif.matricule === matricule &&
                planif.date === date &&
                planif.heure &&
                planif.duree &&
                (!skipAffectation || skipAffectation !== `${matricule}-${planif.date}-${planif.heure}`)
            ) {
                const debut = parseInt(planif.heure);
                const fin = debut + parseInt(planif.duree);
                for (let h = debut; h < fin; h++) {
                    heuresOccupees.add(`${h.toString().padStart(2, '0')}:00`);
                }
            }
        });

        // ✅ Données de la base de données (sauvegardées précédemment)
        if (plagesOccupeesDB[matricule] && plagesOccupeesDB[matricule][date]) {
            plagesOccupeesDB[matricule][date].forEach(h => heuresOccupees.add(h));
        }

        return heuresOccupees;
    };





    const validerConflits = (matricule, date, heure, duree, skipKey) => {
        const heuresOccupees = getHeuresOccupees(matricule, date, skipKey);
        const debut = parseInt(heure.split(':')[0]);
        const fin = debut + parseInt(duree);

        for (let h = debut; h < fin; h++) {
            const heureTest = `${h.toString().padStart(2, '0')}:00`;
            if (heuresOccupees.has(heureTest)) {
                return `Conflit avec la plage horaire ${heureTest}`;
            }
        }

        return null;
    };




    useEffect(() => {
        const nouvellesErreurs = {};

        commandesParClient.forEach((client) => {
            client.commandes.forEach((cmd) => {
                const totalQuantiteTransporte = cmd.affectations.reduce(
                    (sum, aff) => sum + (parseFloat(aff.quantiteTransporte) || 0),
                    0
                );

                const quantiteALivrer = parseFloat(cmd.quantiteALivrer) || 0;

                const hasAffectation = cmd.affectations.some(aff =>
                    aff.matricule && aff.datePrevue && aff.heurePrevue && aff.dureePrevue && aff.quantiteTransporte !== ""
                );


                cmd.affectations.forEach((aff, idx) => {
                    if (!aff.matricule || !aff.datePrevue) return;

                    const capacite = vehicules.find(
                        v => v.matricule === aff.matricule
                    )?.capaciteVehicule || 0;

                    const debutAff = parseInt(aff.heurePrevue?.split(':')[0]);
                    const finAff = debutAff + parseInt(aff.dureePrevue || 0);

                    // On filtre les affectations **du même véhicule**, **même date**, et **plage horaire qui chevauche**
                    const totalTransporteParHeure = commandesParClient
                        .flatMap(c => c.commandes)
                        .flatMap(c => c.affectations)
                        .filter(a => {
                            if (
                                a.matricule !== aff.matricule ||
                                a.datePrevue !== aff.datePrevue ||
                                !a.heurePrevue ||
                                !a.dureePrevue
                            ) return false;

                            const debutAutre = parseInt(a.heurePrevue.split(':')[0]);
                            const finAutre = debutAutre + parseInt(a.dureePrevue);

                            return debutAff < finAutre && finAff > debutAutre; // chevauchement
                        })
                        .reduce((sum, a) => sum + (parseFloat(a.quantiteTransporte) || 0), 0);

                    if (totalTransporteParHeure > capacite) {
                        const key = `${client.codeClient}-${cmd.codeArticle}-${idx}`;
                        nouvellesErreurs[key] = `Capacité dépassée sur le créneau horaire (${capacite})`;
                    }


                    if (aff.heurePrevue && aff.dureePrevue) {
                        const conflit = validerConflits(
                            aff.matricule,
                            aff.datePrevue,
                            aff.heurePrevue,
                            aff.dureePrevue,
                            `${client.codeClient}-${cmd.codeArticle}-${idx}`
                        );

                        if (conflit) {
                            const key = `${client.codeClient}-${cmd.codeArticle}-${idx}`;
                            nouvellesErreurs[key] = conflit;
                        }
                    }

                    if (
                        aff.quantiteTransporte !== "" &&
                        (isNaN(aff.quantiteTransporte) || parseFloat(aff.quantiteTransporte) < 0)
                    ) {
                        const key = `${client.codeClient}-${cmd.codeArticle}-${idx}`;
                        nouvellesErreurs[key] = " Quantité transportée invalide";
                    }
                });
            });
        });

        setErreurs(nouvellesErreurs);
    }, [commandesParClient, vehicules, planificationsTemporaires]);

    const ajouterVehiculeACommande = (codeClient, codeArticle) => {
        setCommandesParClient(prev =>
            prev.map(client => {
                if (client.codeClient !== codeClient) return client;
                return {
                    ...client,
                    commandes: client.commandes.map(cmd => {
                        if (cmd.codeArticle !== codeArticle) return cmd;

                        const qteRestante = cmd.quantiteALivrer -
                            cmd.affectations.reduce((sum, a) => sum + (parseFloat(a.quantiteTransporte) || 0), 0);

                        const nouvelle = {
                            matricule: "",
                            datePrevue: "",
                            heurePrevue: "",
                            dureePrevue: "",
                            quantiteTransporte: qteRestante > 0 ? qteRestante : 0
                        };

                        return {
                            ...cmd,
                            affectations: [...cmd.affectations, nouvelle]
                        };
                    })
                };
            })
        );
    };


    const supprimerVehiculeDeCommande = (codeClient, codeArticle, idx) => {
        setCommandesParClient(prev =>
            prev.map(client => {
                if (client.codeClient !== codeClient) return client;
                return {
                    ...client,
                    commandes: client.commandes.map(cmd => {
                        if (cmd.codeArticle !== codeArticle) return cmd;

                        // Supprimer aussi la planification temporaire associée
                        const affASupprimer = cmd.affectations[idx];
                        if (affASupprimer.heurePrevue && affASupprimer.datePrevue) {
                            setPlanificationsTemporaires(prev =>
                                prev.filter(p => !(
                                    p.matricule === affASupprimer.matricule &&
                                    p.date === affASupprimer.datePrevue &&
                                    p.heure === affASupprimer.heurePrevue
                                ))
                            );
                        }

                        return {
                            ...cmd,
                            affectations: cmd.affectations.filter((_, i) => i !== idx)
                        };
                    })
                };
            })
        );
    };


    const ajouterPlanificationTemporaire = (matricule, date, heure, duree) => {
        setPlanificationsTemporaires(prev => [
            ...prev,
            { matricule, date, heure, duree }
        ]);
    };


    const handleAffectationChange = (codeClient, codeArticle, index, field, value) => {
        setCommandesParClient(prev =>
            prev.map(client => {
                if (client.codeClient !== codeClient) return client;

                const updatedCommandes = client.commandes.map(cmd => {
                    if (cmd.codeArticle !== codeArticle) return cmd;

                    const newAffectations = [...cmd.affectations];







                    const oldValue = newAffectations[index][field];
                    newAffectations[index][field] = value;

                    if (['heurePrevue', 'datePrevue', 'dureePrevue'].includes(field)) {
                        if (oldValue && newAffectations[index].matricule) {
                            setPlanificationsTemporaires(prev =>
                                prev.filter(p => !(
                                    p.matricule === newAffectations[index].matricule &&
                                    p.date === newAffectations[index].datePrevue &&
                                    p.heure === oldValue
                                ))
                            );
                        }

                        if (value && newAffectations[index].matricule) {
                            ajouterPlanificationTemporaire(


                                newAffectations[index].matricule,
                                field === 'datePrevue' ? value : newAffectations[index].datePrevue,
                                field === 'heurePrevue' ? value : newAffectations[index].heurePrevue,
                                field === 'dureePrevue' ? value : newAffectations[index].dureePrevue
                            );
                        }
                    }

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
                [key]: " Quantité négative non autorisée",
            }));
        } else if (totalLivraison > stockDisponible) {
            setErreurs((prev) => ({
                ...prev,
                [key]: ` Stock dépassé (max: ${stockDisponible})`,
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



    // const handleSaveLivraisons = async () => {
    //     const affectations = [];
    //     let erreursBloquantes = {};

    //     commandesParClient.forEach(client => {
    //         client.commandes.forEach(cmd => {
    //             const isPlanified = cmd.affectations.some(aff =>
    //                 aff.matricule && aff.datePrevue && aff.heurePrevue && aff.dureePrevue && aff.quantiteTransporte !== ""
    //             );

    //             if (!cmd.codeCommande || !isPlanified) return;

    //             const totalTransport = cmd.affectations.reduce(
    //                 (sum, aff) => sum + (parseFloat(aff.quantiteTransporte) || 0),
    //                 0
    //             );

    //             const quantiteALivrer = parseFloat(cmd.quantiteALivrer) || 0;

    //             if (totalTransport !== quantiteALivrer) {
    //                 const key = `${client.codeClient}-${cmd.codeArticle}`;
    //                 erreursBloquantes[key] = ` Qté transportée (${totalTransport}) ≠ Qté à livrer (${quantiteALivrer})`;
    //             }

    //             cmd.affectations.forEach(aff => {
    //                 if (
    //                     aff.matricule &&
    //                     aff.datePrevue &&
    //                     aff.heurePrevue &&
    //                     aff.dureePrevue &&
    //                     aff.quantiteTransporte !== "" &&
    //                     !isNaN(parseFloat(aff.quantiteTransporte))
    //                 ) {
    //                     affectations.push({
    //                         codeCommande: cmd.codeCommande,
    //                         matricule: aff.matricule,
    //                         datePrevue: aff.datePrevue,
    //                         heurePrevue: aff.heurePrevue,
    //                         dureePrevue: aff.dureePrevue,
    //                         quantiteTransporte: aff.quantiteTransporte
    //                     });
    //                 }
    //             });
    //         });
    //     });

    //     // 🔥 Affiche l’erreur maintenant SEULEMENT
    //     if (Object.keys(erreursBloquantes).length > 0) {
    //         setErreurs(erreursBloquantes);
    //         return alert(" Certaines commandes planifiées sont invalides. Vérifiez les erreurs affichées.");
    //     }

    //     if (affectations.length === 0) {
    //         return alert("Aucune affectation valide à enregistrer.");
    //     }

    //     try {
    //         await axios.post(
    //             "http://localhost:5000/api/commandePlanifie/planification/affecter",
    //             affectations,
    //             { headers }
    //         );

    //         alert(" Livraisons enregistrées avec succès !");
    //         setPlanificationsTemporaires([]);
    //     } catch (error) {
    //         console.error(error);
    //         alert(" " + (error.response?.data?.message || "Erreur lors de l'enregistrement"));
    //     }
    // };



    const handleSaveLivraisons = async () => {
        const affectations = [];
        let erreursBloquantes = {};

        commandesParClient.forEach(client => {
            client.commandes.forEach(cmd => {
                const isPlanified = cmd.affectations.some(aff =>
                    aff.matricule && aff.datePrevue && aff.heurePrevue && aff.dureePrevue && aff.quantiteTransporte !== ""
                );

                if (!cmd.codeCommande || !isPlanified) return;

                const totalTransport = cmd.affectations.reduce(
                    (sum, aff) => sum + (parseFloat(aff.quantiteTransporte) || 0),
                    0
                );

                const quantiteALivrer = parseFloat(cmd.quantiteALivrer) || 0;

                if (totalTransport !== quantiteALivrer) {
                    const key = `${client.codeClient}-${cmd.codeArticle}`;
                    erreursBloquantes[key] = ` Qté transportée (${totalTransport}) ≠ Qté à livrer (${quantiteALivrer})`;
                }

                cmd.affectations.forEach(aff => {
                    if (
                        aff.matricule &&
                        aff.datePrevue &&
                        aff.heurePrevue &&
                        aff.dureePrevue &&
                        aff.quantiteTransporte !== "" &&
                        !isNaN(parseFloat(aff.quantiteTransporte))
                    ) {
                        affectations.push({
                            codeCommande: cmd.codeCommande,
                            matricule: aff.matricule,
                            datePrevue: aff.datePrevue,
                            heurePrevue: aff.heurePrevue,
                            dureePrevue: aff.dureePrevue,
                            quantiteTransporte: aff.quantiteTransporte
                        });
                    }
                });
            });
        });

        if (Object.keys(erreursBloquantes).length > 0) {
            setErreurs(erreursBloquantes);
            return alert(" Certaines commandes planifiées sont invalides. Vérifiez les erreurs affichées.");
        }

        if (affectations.length === 0) {
            return alert("Aucune affectation valide à enregistrer.");
        }

        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        try {
            console.log("📤 Données envoyées au backend :", affectations);
            const response = await axios.post(
                "http://localhost:5000/api/commandePlanifie/planification/affecter",
                affectations,
                { headers }
            );
            console.log("✅ Réponse du backend :", response.data);

            alert(" Livraisons enregistrées avec succès !");
            setPlanificationsTemporaires([]);
            // Optionnel :
            // setCommandesParClient([]);
        } catch (error) {
            console.error("❌ Erreur POST :", error.response?.data || error.message);
            alert(" " + (error.response?.data?.message || "Erreur lors de l'enregistrement"));
        }
    };





    if (loading) return <div>Chargement des commandes...</div>;


    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Commandes par client</h2>

            <div className="mb-4">
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
                    onClick={() => navigate("/AfficherCommandesPlanifiees", { state: { codeDepot } })}
                >
                    📊 Visualiser les états des commandes planifiées
                </button>
            </div>

            {message && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    {message}
                </div>
            )}

            {commandesParClient.map((client) => (
                <div key={client.codeClient} className="mb-8 border rounded-lg shadow p-4 bg-white">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">
                        {client.nomClient} ({client.codeClient})
                    </h4>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-blue-100 text-gray-800">

                                <tr>
                                    <th className="px-3 py-2 text-left">Article</th>
                                    <th className="px-3 py-2 text-left">Quantité Commandée</th>
                                    <th className="px-3 py-2 text-left">Quantité à Livrer</th>
                                    <th className="px-3 py-2 text-left">Véhicule</th>
                                    <th className="px-3 py-2 text-left">Date</th>
                                    <th className="px-3 py-2 text-left">Heure</th>
                                    <th className="px-3 py-2 text-left">Durée</th>
                                    <th className="px-3 py-2 text-left">Qté Transportée</th>
                                    <th className="px-3 py-2 text-left">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {client.commandes.map((cmd) => (
                                    <React.Fragment key={`${cmd.codeArticle}-${cmd.codeCommande}`}>
                                        <tr className="bg-gray-50 border-t">
                                            <td className="px-3 py-2">{cmd.designation}</td>
                                            <td className="px-3 py-2">{cmd.quantiteCommandee}</td>


                                            <td className="px-3 py-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className={`border rounded px-2 py-1 w-full ${erreurs[`${client.codeClient}-${cmd.codeArticle}`]
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                        }`}
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
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {erreurs[`${client.codeClient}-${cmd.codeArticle}`]}
                                                    </div>
                                                )}

                                                <small className="text-gray-500">
                                                    Stock dispo: {quantitesStockees[cmd.codeArticle] ?? "?"}
                                                </small>
                                            </td>






                                            <td colSpan="4" className="px-3 py-2">
                                                <button
                                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                                    onClick={() =>
                                                        ajouterVehiculeACommande(
                                                            client.codeClient,
                                                            cmd.codeArticle
                                                        )
                                                    }
                                                >
                                                    ➕ Ajouter un véhicule
                                                </button>
                                            </td>
                                        </tr>

                                        {cmd.affectations.map((aff, idx) => {
                                            const heuresOccupees = getHeuresOccupees(
                                                aff.matricule,
                                                aff.datePrevue
                                            );

                                            return (
                                                <tr key={`affect-${idx}`} className="border-t">
                                                    <td colSpan="3"></td>
                                                    <td className="px-2 py-1">
                                                        <select
                                                            className="border px-2 py-1 rounded w-full"
                                                            value={aff.matricule}
                                                            onChange={(e) =>
                                                                handleAffectationChange(
                                                                    client.codeClient,
                                                                    cmd.codeArticle,
                                                                    idx,
                                                                    "matricule",
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            <option value="">Choisir...</option>
                                                            {vehicules.map((v) => (
                                                                <option key={v.matricule} value={v.matricule}>
                                                                    {v.matricule} (Cap: {v.capaciteVehicule})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <input
                                                            type="date"
                                                            className="border px-2 py-1 rounded w-full"
                                                            value={aff.datePrevue}
                                                            min={new Date().toISOString().split("T")[0]}
                                                            onChange={(e) =>
                                                                handleAffectationChange(
                                                                    client.codeClient,
                                                                    cmd.codeArticle,
                                                                    idx,
                                                                    "datePrevue",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <select
                                                            className="border px-2 py-1 rounded w-full"
                                                            value={aff.heurePrevue}
                                                            onChange={(e) =>
                                                                handleAffectationChange(
                                                                    client.codeClient,
                                                                    cmd.codeArticle,
                                                                    idx,
                                                                    "heurePrevue",
                                                                    e.target.value
                                                                )
                                                            }
                                                            disabled={!aff.matricule || !aff.datePrevue}
                                                        >
                                                            <option value="">Choisir...</option>
                                                            {heuresDisponibles.map((heure) => {
                                                                const estOccupee = heuresOccupees.has(heure);
                                                                return (
                                                                    <option
                                                                        key={heure}
                                                                        value={heure}
                                                                        disabled={estOccupee}
                                                                    >
                                                                        {heure} {estOccupee ? "(indisponible)" : ""}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <select
                                                            className="border px-2 py-1 rounded w-full"
                                                            value={aff.dureePrevue}
                                                            onChange={(e) =>
                                                                handleAffectationChange(
                                                                    client.codeClient,
                                                                    cmd.codeArticle,
                                                                    idx,
                                                                    "dureePrevue",
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            <option value="">Choisir...</option>
                                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                                                <option key={n} value={n}>
                                                                    {n}h
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <input
                                                            type="number"
                                                            className={`border px-2 py-1 rounded w-full ${erreurs[
                                                                `${client.codeClient}-${cmd.codeArticle}-${idx}`
                                                            ]
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                                }`}
                                                            value={aff.quantiteTransporte}
                                                            onChange={(e) =>
                                                                handleAffectationChange(
                                                                    client.codeClient,
                                                                    cmd.codeArticle,
                                                                    idx,
                                                                    "quantiteTransporte",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="px-2 py-1">
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() =>
                                                                supprimerVehiculeDeCommande(
                                                                    client.codeClient,
                                                                    cmd.codeArticle,
                                                                    idx
                                                                )
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
                </div>
            ))}

            {commandesParClient.length > 0 && (

                <div className="flex justify-end mt-6">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow"
                        onClick={() => handleSaveLivraisons()}
                    >
                        💾 Enregistrer les livraisons
                    </button>
                </div>

            )}
        </div>



    );

};

export default AfficherCommandesParClient;










