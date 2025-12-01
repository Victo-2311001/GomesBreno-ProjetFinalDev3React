import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom';

import CombattantProvider from "../contexts/favoris.context";
import Liste from "../components/liste.component";
import Menu from '../components/menu.component';
import PagePrincipal from '../components/principal.component';
import FormulaireAjout from '../components/formulaireAjout.component';
import FormulaireModification from '../components/formulaireModification.component';


function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<PagePrincipal />} />
          <Route path="listeTous" element={<CombattantProvider><Liste /></CombattantProvider>} />
          <Route path="ajout" element={<FormulaireAjout />} />
          //<Route path="modification" element={<FormulaireModification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
