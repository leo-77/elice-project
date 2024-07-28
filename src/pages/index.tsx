import React from 'react';
import styled from 'styled-components';

import GlobalStyle from '../components/GlobalStyle';
import Layout from "../components/Layout";
import SearchInput from '../components/SearchInput';
import SearchFilter from "../components/SearchFilter";
import CourseList from '../components/CourseList';

const Space = styled.div`
    display: block;
    width: 0px;
    height: 0px;
    margin: 0px 0px 0.625rem;
    padding: 0px;
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <SearchInput />
        <Space />
        <SearchFilter />
        <CourseList />
      </Layout>
    </>
  );
};

export default Home;
