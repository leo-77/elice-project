import React from 'react';
import styled from 'styled-components';

import CourseCard from './CourseCard';

const TotalCountContainer = styled.div`
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  border-bottom: 1px solid rgb(225, 226, 228);
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
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const CardListItemWrapper = styled.div`
  margin: -12px;

  & > .card-list-item {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
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

const courses = [
  { title: 'Docker', short_description: 'Docker란 무엇인지 알아보고, 직접 사용해보며 Devops에 한 발짝...', level: '중급', duration: '무제한', enroll_type: 4, is_free: false, logo_file_url: '' },
  { title: '취준생을 위한 현직자 IT 직무 특강', short_description: '데이터 엔지니어, 데이터 분석가, 리서치 엔지니어', level: '미설정', duration: '무제한', enroll_type: 0, is_free: true, logo_file_url: '' },
  { title: '딥러닝을 이용한 자연어 처리', short_description: '자연어 처리에 대해 학습하고 처리 결과를 제공하는 서비스를 만드는 방법을...', level: '고급', duration: '무제한', enroll_type: 4, is_free: false, logo_file_url: '' },
  { title: 'YOLO를 이용한 객체 인식', short_description: 'OpenCV와 YOLOv3를 통해 이미지 처리를 하는 방법에 대해 배웁니다.', level: '고급', duration: '무제한', enroll_type: 4, is_free: false, logo_file_url: '' }
];

const CourseList: React.FC = () => {
  return (
    <div>
      <TotalCountContainer>
        <TotalCount>전체 234개</TotalCount>
      </TotalCountContainer>
      <Space />
      <CardListContainer>
        <CardListHeader />
        <CardListItemWrapper>
          <CardListItem>
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </CardListItem>
        </CardListItemWrapper>
      </CardListContainer>
    </div>
  );
};

export default CourseList;
