import CombattantProvider from "../contexts/favoris.context";
import Home from "../components/home.component";

function App() {
  return (
    <CombattantProvider>
      <Home />
    </CombattantProvider>
  );
}

export default App;
