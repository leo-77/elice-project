import React from 'react';
import styled, { css } from 'styled-components';

const FilterContainer = styled.div`
  border: 1px solid rgb(225, 226, 228);
`;

const FilterSection = styled.div<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(225, 226, 228); /* 기본 구분선 */

  ${({ isLast }) =>
    isLast &&
    css`
      border-bottom: none; /* 마지막 항목일 경우 구분선 제거 */
      background-color: rgb(255, 255, 255); /* 배경색 변경 */
    `}
`;

const FilterTitle = styled.div`
  min-width: 6rem;
  padding: 0.875rem 1rem;
  background-color: rgb(249, 250, 252);
  border-right: 1px solid rgb(225, 226, 228);
`;

const FilterText = styled.div`
  line-height: 1.5;
  user-select: auto;
`

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1; /* 남은 공간을 차지 */
  padding-left: 16px; /* 좌측 여백 추가 */
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid rgb(201, 202, 204);
  border-radius: 16px;
  background-color: rgb(248, 249, 250); /* 배경 색상 */
  color: rgb(0, 0, 0); /* Gray1 */
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

const filters = [
  {
    title: "유형",
    options: ["과목", "챌린지", "테스트"],
  },
  {
    title: "진행 방식",
    options: ["자유 선택형", "순차 완료형"],
  },
  {
    title: "분야",
    options: ["프로그래밍 기초", "데이터 분석", "웹", "인공지능", "알고리즘"],
  },
  {
    title: "난이도",
    options: ["입문", "초급", "중급", "고급", "심화"],
  },
  {
    title: "언어",
    options: [
      "C",
      "C++",
      "자바",
      "파이썬",
      "자바스크립트",
      "R",
      "HTML/CSS",
      "SQL",
      "아두이노",
      "스크래치",
      "코틀린",
      "스위프트",
      "엔트리",
    ],
  },
  {
    title: "가격",
    options: ["무료", "유료", "구독", "학점"],
  },
];

const SearchFilter = () => {
  return (
    <FilterContainer>
      {filters.map((filter, index) => (
        <FilterSection key={index} isLast={index === filters.length - 1}>
          <FilterTitle>
            <FilterText>
              {filter.title}
            </FilterText>
          </FilterTitle>
          <FilterButtons>
            {filter.options.map((option, idx) => (
              <FilterButton key={idx}>{option}</FilterButton>
            ))}
          </FilterButtons>
        </FilterSection>
      ))}
    </FilterContainer>
  );
};

export default SearchFilter;
