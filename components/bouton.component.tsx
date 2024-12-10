import { useState } from "react";
import { unUser } from "../util/api"
import { Utilisateur } from "./utilisateur.component"
import { Button } from '@rneui/themed';

interface propsBouton {
    utilisateurs : Utilisateur[],
    setUtilisateurs : React.Dispatch<React.SetStateAction<Utilisateur[]>>
}

/**
 * Bouton pour ajouter un user à la liste
 * @param props propsBouton
 */
export const BoutonAjout = (props: propsBouton) => {
    const [loading, setLoading] = useState(false);

    const ajouterUtilisateur = async () => {
        setLoading(true);
        try {
            let monUser: Utilisateur | null = await unUser();
            let utilisateurs: Utilisateur[] = props.utilisateurs.slice(0);
            if (monUser != null) {
                utilisateurs.push(monUser);
            }
            props.setUtilisateurs(utilisateurs);
        } catch (error) {
            console.error('Erreur lors de l’ajout de l’utilisateur:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            title={loading ? "Chargement..." : "Ajouter un utilisateur"} 
            onPress={ajouterUtilisateur}
            color={"success"}
            loading={loading}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        />
    );
};