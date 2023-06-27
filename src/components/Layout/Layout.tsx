import { ReactNode } from 'react';
import styeld from 'styled-components';

const LayoutContainer = styeld.main``;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
