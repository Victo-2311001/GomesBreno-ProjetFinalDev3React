interface IMatchesRecents {
  adversaire: string;
  date: Date;
  resultat: string;
}

export interface ICombattant {
  id: string;
  nom: string;
  prenom: string;
  surnom: string;
  dateNaissance: Date;
  age: number;
  nationalite: string;
  categorie: string;
  victoires: number;
  defaites: number;
  ufcChampion: boolean;
  techniqueFavorite: string[];
  urlImage?: string;
  matchRecents: IMatchesRecents[]
}