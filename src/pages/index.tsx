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
  const [courseCount, setCourseCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const query = new URLSearchParams({
          filter_conditions: '{"$and":[{"title":"%%"},{"$or":[{"status":2},{"status":3},{"status":4}]},{"$or":[]},{"is_datetime_enrollable":true}]}',
          sort_by: 'created_datetime.desc',
          offset: '0',
          count: '12',
        }).toString();

        const response = await fetch(`/api/courses?${query}`);
        const data = await response.json();
        setCourses(data.courses);
        setCourseCount(data.course_count);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SearchInput />
        <Space />
        <SearchFilter />
        <CourseList courses={courses} course_count={courseCount} />
      </Layout>
    </>
  );
};

export default Home;
