import data from './data';
import React from 'react';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import ParallaxSlide from '@mui-treasury/components/slide/parallax';
import DotIndicator from '@mui-treasury/components/indicator/dot';
import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import { Root, LeftButton, RightButton, Slide, StyledImage, StyledTitle } from './styles.js';

const ParallaxCarousel = () => {
  const arrowStyles = useArrowDarkButtonStyles();
  const createStyle = (slideIndex, fineIndex) => {
    const diff = slideIndex - fineIndex;
    if (Math.abs(diff) > 1) return {};
    return {
      transform: `rotateY(${(-diff + 1) * 45}deg)`,
    };
  };
  // eslint-disable-next-line react/prop-types
  const renderElements = ({ index, onChangeIndex }) => (
    <>
      <LeftButton
        classes={arrowStyles}
        disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
        sx={{ display: { sm: 'none' } }}>
        <KeyboardArrowLeft />
      </LeftButton>
      <RightButton
        classes={arrowStyles}
        disabled={index === data.length - 1}
        onClick={() => onChangeIndex(index + 1)}
        sx={{ display: { sm: 'none' } }}>
        <KeyboardArrowRight />
      </RightButton>
      <div style={{ textAlign: 'center' }}>
        {data.map(({ id }, i) => (
          <DotIndicator key={id} active={i === index} onClick={() => onChangeIndex(i)} />
        ))}
      </div>
    </>
  );
  const renderChildren = ({ injectStyle, fineIndex }) =>
    data.map(({ id, title, subtitle, image }, i) => (
      <Slide key={id}>
        <StyledTitle
          noWrap
          style={{ ...injectStyle(i, 60), ...createStyle(i, fineIndex) }}
          sx={{ display: { sm: 'none' } }}>
          {title}
        </StyledTitle>
        {/* <StyledSubtitle noWrap style={{ ...injectStyle(i, 40), ...createStyle(i, fineIndex) }}>
          {subtitle}
        </StyledSubtitle> */}
        <div
          style={{
            display: 'block',
            position: 'relative',
            zIndex: 2,
            paddingBottom: '56.25%',
          }}>
          <StyledImage src={image} alt={'slide'}></StyledImage>
        </div>
      </Slide>
    ));
  return (
    <Root>
      <ParallaxSlide renderElements={renderElements}>{renderChildren}</ParallaxSlide>
    </Root>
  );
};

export default ParallaxCarousel;
