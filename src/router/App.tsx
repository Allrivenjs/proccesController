import { Route, Routes } from 'react-router-dom';
import { CreateProcessCatalogPage } from '../process';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateProcessCatalogPage />} />
    </Routes>
  );
};
