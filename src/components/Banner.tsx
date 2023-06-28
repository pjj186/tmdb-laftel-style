import styled from 'styled-components';
import { options } from '../utils/tmdb';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './Slick/NextArrow';
import PrevArrow from './Slick/PrevArrow';

interface IBackdropContainerProps {
  imageurl: string;
}

interface IMovieData {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  title: string;
}

const Container = styled.div`
  width: 100%;
  height: 78.375rem;
  .slick-dots {
    width: fit-content;
    bottom: 8rem;
    right: 5rem;
    li {
      margin: 0 10px;
      button::before {
        font-size: 1.6rem;
      }
    }
    .slick-active {
      button::before {
        color: #c1c1c1;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }
`;

const BackdropContainer = styled.div<IBackdropContainerProps>`
  position: relative;
  width: 100%;
  height: 78.375rem;
  background-image: url(${(props) => props.imageurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 3.125em;
  bottom: 15em;
  max-width: 38.75em;
`;

const Title = styled.h1`
  color: white;
  font-size: 4.5rem;
  font-weight: 600;
`;

const OverView = styled.p`
  margin-top: 2rem;
  color: white;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
`;

const GotoSeeBtn = styled.button`
  all: unset;
  display: flex;
  cursor: pointer;
  margin-top: 2rem;
  background-color: white;
  font-weight: 600;
  font-size: 2rem;
  align-items: center;
  justify-content: center;
  padding: 0.75em 1.125em 0.75em 1.5em;
  border-radius: 0.25em;

  svg {
    width: 1.5em;
    height: 1.5em;
    margin-left: 0.25em;
  }
`;

export default function Banner() {
  const [data, setData] = useState<IMovieData[]>([]);

  const settings = {
    dots: true,
    nextArrow: (
      <NextArrow
        className='next-arrow'
        style={{ width: '200px', height: '200px' }}
      />
    ),
    prevArrow: (
      <PrevArrow
        className='prev-arrow'
        style={{ width: '200px', height: '200px' }}
      />
    ),
    fade: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getData = async () => {
    const url =
      'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR';
    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json.results))
      .catch((err) => console.error('error:' + err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Slider {...settings}>
        {data?.map((item) => {
          return (
            <BackdropContainer
              key={item.id}
              imageurl={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
            >
              <TitleContainer>
                <Title>{item.title}</Title>
                <OverView>{item.overview}</OverView>
                <GotoSeeBtn>
                  <span>보러가기</span>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={1.5}
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </GotoSeeBtn>
              </TitleContainer>
            </BackdropContainer>
          );
        })}
      </Slider>
    </Container>
  );
}
