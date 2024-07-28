import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

const FilterBarContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: inline-block;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgb(201, 202, 204);
  border-radius: 0.25rem;
  background-color: rgb(255, 255, 255);
  padding: 8px;
`;

const SearchIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin: 0 16px;
  color: gray;
`;

const SearchInputBox = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: black;

  &::placeholder {
    color: gray;
  }
`;

const SearchInput: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const performSearch = (query: string) => {
    console.log('performSearch query :', query);
    // 검색 로직 추가할 구각
  };

  const debouncedSearch = debounce((query: string) => performSearch(query), 300);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <FilterBarContainer>
      <SearchContainer>
        <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" focusable="false" role="img" aria-hidden="true" data-icon="eilSearch" data-prefix="eil" data-unicode="" rotate="0">
          <path fill="currentColor" d="M90 441C90 247.05 247.05 90 441 90s351 157.05 351 351c0 80.705-27.193 155.021-72.923 214.291l252.901 252.901-63.639 63.639-252.882-252.882C596.16 764.756 521.78 792 441 792 247.05 792 90 634.95 90 441zm623.25 0c0-150.3-121.95-272.25-272.25-272.25S168.75 290.7 168.75 441 290.7 713.25 441 713.25 713.25 591.3 713.25 441z"></path>
        </SearchIcon>
        <SearchInputBox
          placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>
    </FilterBarContainer>
  );
};

export default SearchInput;
