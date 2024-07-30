import React, { useState, useEffect } from 'react';
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
  enroll_type: number | null;
}

const CardWrapper = styled.div`
  margin: 12px;
  width: calc(25% - 24px);
`;

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
`;

const CardHeader = styled.div`
  position: relative;
  padding: 0px;
  border-bottom: 1px solid rgb(240, 241, 243);
  background-color: transparent;
`;

const CardHeaderImageWrapper = styled.div`
  height: 145px;
  background-color: rgb(58, 58, 76);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardHeaderImage = styled.div<{ imageFileUrl: string | null; logoFileUrl: string | null }>`
  display: inline-block;
  width: ${({ imageFileUrl }) => (imageFileUrl ? '100%' : '6.5rem')};
  min-width: ${({ imageFileUrl }) => (imageFileUrl ? '100%' : '6.5rem')};
  height: ${({ imageFileUrl }) => (imageFileUrl ? '100%' : '6.5rem')};
  background-color: rgb(58, 58, 76);
  background-image: ${({ imageFileUrl, logoFileUrl }) => (imageFileUrl ? `url(${imageFileUrl})` : `url(${logoFileUrl})`)};
  background-position: center center;
  background-size: ${({ imageFileUrl }) => (imageFileUrl ? 'cover' : 'contain')};
  background-repeat: no-repeat;
`;

const BodyWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: rgb(255, 255, 255);
  transition: height 0.3s ease-out 0s;
  padding: 0px;
  height: calc(100% - 145px);
`;

const Body = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  padding: 1.25rem;
`;

const CardBodyTitle = styled.div`
  box-sizing: border-box;
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

const LabelWapper = styled.div`
  padding: 0px 1.25rem 1.25rem;
  background-color: rgb(255, 255, 255);
  width: 100%;
  z-index: 1;
  position: absolute;
  bottom: 0px;
`;

const Space = styled.div`
  display: block;
  width: 0px;
  height: 0px;
  margin: 0px 0px 0rem;
  padding: 0px;
`;

const Price = styled.div`
  width: 100%;
  border-top: 1px solid rgb(240, 241, 243);
  background-color: rgb(255, 255, 255);
  padding-top: 1rem;
`;

const TextWapper = styled.div<{ labelColor: string }>`
  line-height: 1.5rem;
  user-select: auto;
  font-size: 1rem;
  color: ${({ labelColor }) => labelColor};
  font-weight: 700;
  display: inline-block;
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

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  short_description,
  price,
  is_free,
  image_file_url,
  logo_file_url,
  enroll_type
}) => {
  const [labelColor, setLabelColor] = useState("#222");
  const [label, setLabel] = useState("관리자 등록");

  useEffect(() => {
    if (enroll_type === 5) {
      // 관리자 등록
      setLabelColor("#524fa1");
      setLabel("관리자 등록");
    } else {
      if (is_free) {
        // 무료
        setLabelColor("#00ab53");
        setLabel("무료");
      } else {
        // 금액 표기
        setLabelColor("#222");
        const formattedPrice = new Intl.NumberFormat().format(parseInt(price, 10));
        setLabel(`₩${formattedPrice}`);
      }
    }
  }, [enroll_type, is_free, price]);

  return (
    <CardWrapper>
      <CardFrame>
        <CardHeader>
          <CardHeaderImageWrapper>
            <CardHeaderImage imageFileUrl={image_file_url} logoFileUrl={logo_file_url} />
          </CardHeaderImageWrapper>
        </CardHeader>
        <BodyWrapper>
          <Body>
            <TitleWrapper>
              <CardBodyTitle>
                <Title>{title}</Title>
                <Description>{short_description}</Description>
              </CardBodyTitle>
            </TitleWrapper>
            <LabelWapper>
              <Space />
              <Price>
                <TextWapper labelColor={labelColor}>
                  {label}
                </TextWapper>
              </Price>
            </LabelWapper>
          </Body>
        </BodyWrapper>
      </CardFrame>
    </CardWrapper>
  );
};

export default CourseCard;
