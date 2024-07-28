import React from 'react';
import styled from 'styled-components';

interface CourseCardProps {
  title: string;
  short_description: string;
  level: string;
  duration: string;
  enroll_type: number;
  is_free: boolean;
  logo_file_url?: string;
}

const Card = styled.div`
  width: 296px;
  height: 338px;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
`;

const Body = styled.div`
  padding: 28px 24px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #524fa1;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #222;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  font-size: 14px;
  color: #5e5f61;
  line-height: 1.6;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconTextWrapper = styled.div`
  align-items: center;
  margin: 8px 0;
`;

const IconText = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #7d7e80;
  margin-right: 16px;

  & svg {
    margin-right: 8px;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 28px;
  right: 24px;
  width: 52px;
  height: 52px;
  object-fit: contain;
`;

const CardButton = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  short_description,
  level,
  duration,
  enroll_type,
  is_free,
  logo_file_url
}) => {
  let label;
  if (enroll_type === 0) {
    label = is_free ? '무료' : '유료';
  } else if (enroll_type === 4) {
    label = '구독';
  } else {
    label = '기타';
  }

  return (
    <Card>
      <Body>
        <Label>{label}</Label>
        <Title>{title}</Title>
        <Description>{short_description}</Description>
        <IconTextWrapper>
          <IconText> 난이도 : {level || '미설정'}</IconText>
          <IconText> 수업 : 온라인</IconText>
          <IconText> 기간 : {duration || '무제한'}</IconText>
        </IconTextWrapper>
        <CardButton>구독</CardButton>
      </Body>
      {logo_file_url && <Logo src={logo_file_url} alt="Course Logo" />}
    </Card>
  );
};

export default CourseCard;
