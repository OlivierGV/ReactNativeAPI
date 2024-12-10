import { Utilisateur } from "../components/utilisateur.component";

/**
 * Code emprunté de Christiane Lagacé
 * https://apical.xyz/fiches/utiliser_un_api/utiliser_fetch_avec_react_native
 */
export const plusieursUsers = (setUtilisateurs : React.Dispatch<React.SetStateAction<Utilisateur[]>>) => {
    fetch("https://randomuser.me/api/?results=10")
    .then(response => {
      if (!response.ok) {
        // le catch pourra réagir à l'erreur
        throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
      }
      return response.json();   // selon ce que l'API retourne, on pourrait devoir utiliser response.text() ou response.url.
    }).then(body => {
      console.log(body.results)
      setUtilisateurs(body.results);
      // faire quelque chose avec les informations générées
    }).catch((error) => {
      console.error(error)
      // réagir en cas d'erreur
    }).finally(() => {
      // instructions à faire quand l'appel est terminé ou quand l'appel a échoué
    });
  };
  /**
   * Fin du code emprunté
   */

  export const unUser = async (): Promise<Utilisateur | null> => {
    try {
        const response = await fetch("https://randomuser.me/api/");
        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }
        const body = await response.json();
        console.log(body.results);
        return body.results[0]; // Retourne un seul utilisateur (le premier) s'il y en a.
    } catch (error) {
        console.error(error);
        return null; // Retourne null en cas d'erreur
    }
};