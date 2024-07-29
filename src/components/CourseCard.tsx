import React from 'react';
import styled from 'styled-components';

interface CourseCardProps {
  title: string;
  short_description: string;
  level: string | null;
  duration: string | null;
  price: string;
  is_free: boolean;
  image_file_url: string | null;
  logo_file_url: string | null;
}

const CardWrapper = styled.div`
  margin: 12px;
  width: calc(25% - 24px);
`
const CardFrame = styled.div`
  min-height: 381px;
  min-width: auto;
  white-space: normal;
  overflow: hidden;
  padding: 0px;
  position: relative;
  height: 24rem;
  border: 1px solid rgba(225, 226, 228, 0.75);
  max-width: 100%;
`

const CardHeader = styled.div`
  position: relative;
  padding: 0px;
  border-bottom: 1px solid rgb(240, 241, 243);
  background-color: transparent;
`

const CardHeaderImageWrapper = styled.div`
  height: 145px;
  background-color: rgb(58, 58, 76);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardHeaderImage = styled.div<{ imageFileUrl: string | null, logoFileUrl: string | null }>`
  display: inline-block;
  width: ${({ imageFileUrl }) => imageFileUrl ? "100%" : "6.5rem"};
  min-width: ${({ imageFileUrl }) => imageFileUrl ? "100%" : "6.5rem"};
  height: ${({ imageFileUrl }) => imageFileUrl ? "100%" : "6.5rem"};
  background-color: rgb(58, 58, 76);
  background-image: ${({ imageFileUrl, logoFileUrl }) => imageFileUrl ? `url(${imageFileUrl})` : `url(${logoFileUrl})`};
  background-position: center center;
  background-size: ${({ imageFileUrl }) => imageFileUrl ? "cover" : "contain"};
  background-repeat: no-repeat;
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
  display: flex;
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

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  price,
  is_free,
  image_file_url,
  logo_file_url,
}) => {
  let label;
  if (is_free) {
    label = '무료';
  } else if (price === '유료') {
    label = '유료';
  } else if (price === '구독') {
    label = '구독';
  } else {
    label = '기타';
  }

  return (
    <CardWrapper>
      <CardFrame>
        <CardHeader>
          <CardHeaderImageWrapper>
            <CardHeaderImage imageFileUrl={image_file_url} logoFileUrl={logo_file_url} />
          </CardHeaderImageWrapper>
        </CardHeader>

        <Body>
          <Label>{label}</Label>
          <Title>{title}</Title>
          <Description>{short_description}</Description>
          <IconTextWrapper>
            <IconText>난이도 : {level || '미설정'}</IconText>
            <IconText>기간 : {duration || '무제한'}</IconText>
          </IconTextWrapper>
          <CardButton>구독</CardButton>
        </Body>
      </CardFrame>
    </CardWrapper>
  );
};

export default CourseCard;
