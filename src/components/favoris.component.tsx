
import { useContext } from 'react';
import { CombattantContext } from '../contexts/favoris.context';

export default function Favoris() {
  const { favoris, favorisOuvert, setFavorisOuvert } = 
  useContext(CombattantContext);
  return (
    <>
      {favorisOuvert && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity" />}
      <div className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${favorisOuvert ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Mes Favoris</h2>
            <button onClick={() => setFavorisOuvert(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {favoris && favoris.length > 0 ? (
              <div className="space-y-4">
                {favoris.map((combattant) => {
                  return (
                    <div key={combattant.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-3">
                        <h1>{combattant.nom}</h1>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{combattant.prenom} {combattant.nom}</h3>
                          <p className="text-sm text-gray-500 mt-1">Cliquez sur la fiche pour plus de détails</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucun combattant en favoris</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}