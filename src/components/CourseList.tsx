import React from 'react';
import styled from 'styled-components';
import CourseCard from './CourseCard';

const TotalCountContainer = styled.div`
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  border-bottom: 1px solid rgb(225,226,228);
`;

const TotalCount = styled.div`
  user-select: auto;
`;

const CardListContainer = styled.div`
  max-width: 100%;
`;

const CardListHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CardListItemWrapper = styled.div`
  margin: -12px;

  & > .card-list-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
`;

const CardListItem = styled.div.attrs({
  className: 'card-list-item'
})``;

const Space = styled.div`
  display: block;
  width: 0px;
  height: 0px;
  margin: 0px 0px 0.75rem;
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

interface CourseListProps {
  courses: Course[];
  totalCount: number;
}

const CourseList: React.FC<CourseListProps> = ({ courses, totalCount }) => {
  return (
    <div>
      <TotalCountContainer>
        <TotalCount>전체 {totalCount}개</TotalCount>
      </TotalCountContainer>
      <Space />
      <CardListContainer>
        <CardListHeader />
        <CardListItemWrapper>
          <CardListItem>
            {courses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </CardListItem>
        </CardListItemWrapper>
      </CardListContainer>
    </div>
  );
};

export default React.memo(CourseList);
