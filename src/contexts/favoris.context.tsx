import React, { useState } from 'react';

export interface ICombattantFavori {
  id: string;
  nom: string;
  prenom: string;
  urlImage?: string;
}

export type CombattantContextType = {
  favoris: ICombattantFavori[];
  favorisOuvert: boolean;
  setFavoris: (items: ICombattantFavori[]) => void;
  setFavorisOuvert: (open: boolean) => void;
};

const favorisVide: ICombattantFavori[] = [];

export const CombattantContext = React.createContext<CombattantContextType>({
  favoris: favorisVide,
  favorisOuvert: false,
  setFavoris: () => {},
  setFavorisOuvert: () => {},
});

export default function CombattantProvider(props: any) {
  const [favoris, setFavoris] = useState(favorisVide);
  const [favorisOuvert, setFavorisOuvert] = useState(false);

  const values = {
    favoris,
    favorisOuvert,
    setFavoris,
    setFavorisOuvert,
  };

  return (
    <CombattantContext.Provider value={values}>
      {props.children}
    </CombattantContext.Provider>
  );
}
