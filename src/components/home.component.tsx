import React, { useState, useEffect, useContext } from 'react';
import Fiche from './fiche.component';
import { CombattantContext } from '../contexts/favoris.context';
import Favoris from './favoris.component';
import type { ICombattant } from '../models/icombattant.model';
import axios from 'axios';

export default function Home() {
  const [nombreFavoris, setNombreFavoris] = useState(0);
  const { favoris, setFavorisOuvert } = useContext(CombattantContext);
  const [listeCombattants, setListeCombattants] = useState<ICombattant[]>([]);

  useEffect(() => {
    setNombreFavoris(favoris.length);
  }, [favoris]);

  useEffect(() => {
    axios
      .get('https://combattantsapi-hyghhjcae9dcdgav.canadacentral-01.azurewebsites.net/api/combattants/all')
      .then((response) => {
        // eslint-disable-next-line no-console
        console.debug('API combattants response (axios):', response.data);
        const data = response.data && response.data.combattants ? response.data.combattants : response.data;
        setListeCombattants(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Erreur récupération combattants', err);
        setListeCombattants([]);
      });
  }, []);

  const toggleFavoris = (event: React.MouseEvent) => {
    event.preventDefault();
    setFavorisOuvert(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Combattants UFC</h1>
          <button onClick={toggleFavoris} className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.993 3.055A9.001 9.001 0 2 0 19.102 4.996M9 6h.01M15 6h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {nombreFavoris > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{nombreFavoris}</span>
            )}
          </button>
        </div>
      </header>

      <Favoris />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listeCombattants && listeCombattants.map((combattant) => (
            <div key={combattant.id}>
              <Fiche combattant={combattant} enFavoris={false} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
