import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

const LayoutContainer = styled.main`
  padding-top: 4rem;
`;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
}
