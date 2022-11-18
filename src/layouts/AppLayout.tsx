import { FC, ReactNode } from 'react';

import { Container } from '@mui/system';

import { Navbar } from '../ui';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        { children }
      </main>
    </>
  );
};
