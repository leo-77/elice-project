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

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  align-items: center;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? '#e0e0e0' : '#ffffff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#000000')};
  font-size: 16px;

  &:hover:not([disabled]) {
    background-color: #f0f0f0;
  }
`;

const PageNumber = styled.button<{ isActive?: boolean }>`
  margin: 0 5px;
  padding: 8px 16px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? '#524fa1' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#000000')};
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#524fa1' : '#f0f0f0')};
  }
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
  enroll_type: number | null;
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterConditions, setFilterConditions] = useState<any>({
    "$and": [
      { "title": "%%" },
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
  });

  const coursesPerPage = 20;

  const fetchCourses = async (conditions: any, page: number = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * coursesPerPage;
      const queryParams = new URLSearchParams({
        filter_conditions: JSON.stringify(conditions),
        sort_by: 'created_datetime.desc',
        offset: offset.toString(),
        count: coursesPerPage.toString(),
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
    fetchCourses(filterConditions);
  }, []);

  const handleSearch = (query: string) => {
    const newConditions = {
      ...filterConditions,
      "$and": [
        { "title": `%${query}%` },
        ...filterConditions["$and"].slice(1)
      ]
    };
    setFilterConditions(newConditions);
    setCurrentPage(1);
    fetchCourses(newConditions, 1);
  };

  const handleFilterChange = (newConditions: any) => {
    setFilterConditions(newConditions);
    setCurrentPage(1);
    fetchCourses(newConditions, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCourses(filterConditions, page);
  };

  const totalPages = Math.ceil(totalCount / coursesPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (currentPage - 1 <= halfMaxPages) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }

    if (totalPages - currentPage < halfMaxPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          isActive={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageNumber>
      );
    }

    if (startPage > 1) {
      pages.unshift(<span key="start-ellipsis">...</span>);
      pages.unshift(
        <PageNumber key={1} onClick={() => handlePageChange(1)}>
          1
        </PageNumber>
      );
    }

    if (endPage < totalPages) {
      pages.push(<span key="end-ellipsis">...</span>);
      pages.push(
        <PageNumber key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </PageNumber>
      );
    }

    return pages;
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SearchInput onSearch={handleSearch} />
        <Space />
        <SearchFilter onFilterChange={handleFilterChange} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <CourseList courses={courses} totalCount={totalCount} />
            {totalPages > 1 && (
              <PaginationControls>
                <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  &lt;
                </PageButton>
                {renderPageNumbers()}
                <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  &gt;
                </PageButton>
              </PaginationControls>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
