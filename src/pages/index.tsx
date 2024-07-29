import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import GlobalStyle from '../components/GlobalStyle';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import SearchFilter from '../components/SearchFilter';
import CourseList from '../components/CourseList';

const Space = styled.div`
  display: block;
  width: 0px;
  height: 0px;
  margin: 0px 0px 0.625rem;
  padding: 0px;
`;

interface Course {
  id: number;
  title: string;
  short_description: string;
  level: string | null;
  duration: string | null;
  price: string;
  is_free: boolean;
  image_file_url: string | null;
  logo_file_url: string | null;
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchCourses = async (query: string = '') => {
    setLoading(true);
    try {
      const filterConditions = {
        "$and": [
          { "title": `%${query}%` },
          {
            "$or": [
              { "status": 2 },
              { "status": 3 },
              { "status": 4 }
            ]
          },
          {
            "$or": []
          },
          { "is_datetime_enrollable": true }
        ]
      };

      const queryParams = new URLSearchParams({
        filter_conditions: JSON.stringify(filterConditions),
        sort_by: 'created_datetime.desc',
        offset: '0',
        count: '12',
      }).toString();

      const response = await fetch(`/api/courses?${queryParams}`);
      const data = await response.json();
      setCourses(data.courses);
      setTotalCount(data.course_count);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (query: string) => {
    fetchCourses(query);
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SearchInput onSearch={handleSearch} />
        <Space />
        <SearchFilter />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <CourseList courses={courses} totalCount={totalCount} />
        )}
      </Layout>
    </>
  );
};

export default Home;
