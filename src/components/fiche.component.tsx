import { useContext } from 'react';
import { CombattantContext } from '../contexts/favoris.context';
import type { ICombattant } from '../models/icombattant.model';

interface IFiche {
  combattant: ICombattant;
  enFavoris: boolean;
}

export default function Fiche(props: IFiche) {
  const { favoris, setFavoris, setFavorisOuvert } = useContext(CombattantContext);

  const ajouterAuxFavoris = () => {
    //if (favoris.find((f) => f.id === props.combattant.id)) return;
    const nouvelles = [ ...favoris, { id: props.combattant.id, nom: props.combattant.nom, prenom: props.combattant.prenom,},
    ];
    setFavoris(nouvelles);
    setFavorisOuvert(true);
  };

  const retirerDesFavoris = () => {
    const nouvelles = favoris.filter((f) => f.id !== props.combattant.id);
    setFavoris(nouvelles);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {(props.combattant as any) && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={(props.combattant as any).photo}
            alt={`${props.combattant.prenom} ${props.combattant.nom}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {props.combattant.prenom} {props.combattant.nom}
        </h3>
        {props.combattant.surnom && (
          <p className="text-sm text-gray-500 italic mb-2">"{props.combattant.surnom}"</p>
        )}
        <div className="mb-3 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Nationalité:</span> {props.combattant.nationalite}
          </p>
          <p>
            <span className="font-medium">Catégorie:</span> {props.combattant.categorie}
          </p>
          <p>
            <span className="font-medium">Âge:</span> {props.combattant.age} ans
          </p>
          <p className="text-green-600 font-medium">W: {props.combattant.victoire} - L: {props.combattant.defaites}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        {!props.enFavoris && (
          <button onClick={ajouterAuxFavoris} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
            ⭐ Ajouter aux favoris
          </button>
        )}
        {props.enFavoris && (
          <button onClick={retirerDesFavoris} className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors">
            ✖ Retirer des favoris
          </button>
        )}
      </div>
    </div>
  );
}
