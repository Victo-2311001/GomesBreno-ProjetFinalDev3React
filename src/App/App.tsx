import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import CombattantProvider from "../contexts/favoris.context";
import LoginProvider from '../contexts/login.context';
import Liste from "../components/liste.component";
import Menu from '../components/menu.component';
import PagePrincipal from '../components/principal.component';
import FormulaireAjout from '../components/formulaireAjout.component';
import FormulaireModification from '../components/formulaireModification.component';
import Login from '../components/login.component'


function App() {
  return (
     <BrowserRouter>
      <LoginProvider>
        <CombattantProvider>

          <Routes>
            <Route path="/" element={<Menu />}>
              <Route index element={<PagePrincipal />} />
              <Route path="listeTous" element={<Liste />} />
              <Route path="ajout" element={<FormulaireAjout />} />
              <Route path="modification/:combattantId" element={<FormulaireModification />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>

        </CombattantProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
