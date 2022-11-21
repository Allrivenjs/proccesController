import { Route, Routes } from 'react-router-dom';
import { CreateProcessCatalogPage } from '../process';
import { RoundRobinPage } from '../process/pages/RoundRobinPage';
import { Grupo } from '../process/pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateProcessCatalogPage />} />
      <Route
        path="/round-robin/:processesCatalogIndex"
        element={<RoundRobinPage />}
      />
      {/*<Route*/}
      {/*  path="/grupos"*/}
      {/*  element={<Grupo />}*/}
      {/*/>*/}
    </Routes>
  );
};
