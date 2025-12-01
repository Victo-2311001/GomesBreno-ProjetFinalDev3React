import { useState } from "react";
import {TextField, Typography } from '@mui/material';

export default function FormulaireAjout() {
  const [nom, setNom] = useState('');
  const [nomValide, setNomValide] = useState<boolean | null>(null);

  const validerNom = () => {
    setNomValide(nom.length < 1); //-vérifier
    setNomValide(nom.length > 0);
  };
  return (
    <>
      <h2>Formulaire d'ajout de combattant</h2>
        
      <TextField
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        onBlur={validerNom}
      />
      {nomValide !== null && !nomValide && (
        <Typography sx={{ color: 'red' }}>
          Le nom ne peut pas être valide et dois avoir au moins 2 caractères!.
        </Typography>
      )}
    </>
  );    
}
//Inspiré de https://apical.xyz/fiches/formulaire_react_native/la_validation
//Quelques modifications réalisées par l'IA pour améliorer seulement la visualisation de la page