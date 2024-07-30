import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const FilterContainer = styled.div`
  border: 1px solid rgb(225, 226, 228);
`;

const FilterSection = styled.div<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(236 238 242); /* 기본 구분선 */

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
`;

const FilterButtons = styled.div`
  padding: 9.5px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1; /* 남은 공간을 차지 */
  padding-left: 16px; /* 좌측 여백 추가 */
  background-color: rgb(255, 255, 255);
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 1px solid rgb(201, 202, 204);
  border-radius: 16px;
  background-color: ${({ isActive }) => (isActive ? 'rgb(82, 79, 161)' : 'rgb(248, 249, 250)')}; /* 배경 색상 */
  color: ${({ isActive }) => (isActive ? 'white' : 'rgb(0, 0, 0)')}; /* 텍스트 색상 */
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? 'rgb(82, 79, 161)' : 'rgb(235, 235, 235)')}; /* 호버 색상 */
  }
`;

const filters = [
  // {
  //   title: "유형",
  //   options: [
  //     { key: "courseType", value: 1, name: "과목" },
  //     { key: "courseType", value: 2, name: "챌린지" },
  //     { key: "courseType", value: 3, name: "테스트" },
  //   ],
  // },
  // {
  //   title: "진행 방식",
  //   options: [
  //     { key: "format", value: 4, name: "자유 선택형" },
  //     { key: "format", value: 5, name: "순차 완료형" },
  //   ],
  // },
  // {
  //   title: "분야",
  //   options: [
  //     { key: "category", value: 6, name: "프로그래밍 기초" },
  //     { key: "category", value: 7, name: "데이터 분석" },
  //     { key: "category", value: 8, name: "웹" },
  //     { key: "category", value: 9, name: "인공지능" },
  //     { key: "category", value: 10, name: "알고리즘" }
  //   ],
  // },
  // {
  //   title: "난이도",
  //   options: [
  //     { key: "level", value: 11, name: "입문" },
  //     { key: "level", value: 12, name: "초급" },
  //     { key: "level", value: 13, name: "중급" },
  //     { key: "level", value: 14, name: "고급" },
  //     { key: "level", value: 15, name: "심화" }
  //   ],
  // },
  // {
  //   title: "언어",
  //   options: [
  //     { key: "programmingLanguage", value: 16, name: "C" },
  //     { key: "programmingLanguage", value: 17, name: "C++" },
  //     { key: "programmingLanguage", value: 18, name: "자바" },
  //     { key: "programmingLanguage", value: 19, name: "파이썬" },
  //     { key: "programmingLanguage", value: 20, name: "자바스크립트" },
  //     { key: "programmingLanguage", value: 21, name: "R" },
  //     { key: "programmingLanguage", value: 22, name: "HTML/CSS" },
  //     { key: "programmingLanguage", value: 23, name: "SQL" },
  //     { key: "programmingLanguage", value: 24, name: "아두이노" },
  //     { key: "programmingLanguage", value: 25, name: "스크래치" },
  //     { key: "programmingLanguage", value: 26, name: "코틀린" },
  //     { key: "programmingLanguage", value: 27, name: "스위프트" },
  //     { key: "programmingLanguage", value: 28, name: "엔트리" },
  //   ],
  // },
  {
    title: "가격",
    options: [
      { key: "price", value: "무료", name: "무료" },
      { key: "price", value: "유료", name: "유료" },
      { key: "price", value: "구독", name: "구독" },
      { key: "price", value: "학점", name: "학점" },
    ],
  },
];

interface SearchFilterProps {
  onFilterChange: (filterConditions: any) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const handleFilterClick = (value: string) => {
    setSelectedFilters((prevSelectedFilters) => {
      const newSelectedFilters = new Set(prevSelectedFilters);
      if (newSelectedFilters.has(value)) {
        newSelectedFilters.delete(value);
      } else {
        newSelectedFilters.add(value);
      }

      const priceConditions = Array.from(newSelectedFilters).map((filter) => {
        if (filter === '무료') return { "enroll_type": 0, "is_free": true };
        if (filter === '유료') return { "enroll_type": 0, "is_free": false };
        return {};
      });

      const filterConditions = {
        "$and": [
          { "title": "%%" },
          { "$or": [{ "status": 2 }, { "status": 3 }, { "status": 4 }] },
          { "$or": priceConditions.length > 0 ? priceConditions : [{}] },
          { "is_datetime_enrollable": true }
        ]
      };

      onFilterChange(filterConditions);
      return newSelectedFilters;
    });
  };

  return (
    <FilterContainer>
      {filters.map((filter, index) => (
        <FilterSection key={index} isLast={index === filters.length - 1}>
          <FilterTitle>
            <FilterText>{filter.title}</FilterText>
          </FilterTitle>
          <FilterButtons>
            {filter.options.map(({ name, value }, idx) => (
              <FilterButton
                key={idx}
                isActive={selectedFilters.has(value)}
                onClick={() => handleFilterClick(value)}
              >
                {name}
              </FilterButton>
            ))}
          </FilterButtons>
        </FilterSection>
      ))}
    </FilterContainer>
  );
};

export default SearchFilter;
