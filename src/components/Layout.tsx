import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
  @media (max-width: 1280px) {
    padding: 24px;
  }
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
