import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Banner from '../components/Banner';
import Layout from '../components/Layout/Layout';
import { options } from '../utils/tmdb';
import { getFormattedToday, getStartAndEndOfWeek } from '../utils/dateHelper';

interface ITvData {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const SectionContainer = styled.div`
  width: 100%;
  padding-top: 2.5em;
  padding-bottom: 9.125em;
`;

const SeriesSection = styled.section`
  width: 100%;
  color: white;
`;

const SectionTitleContainer = styled.div`
  padding: 0px 3.125em;
`;

const SectionTitle = styled.h1`
  font-size: 1.75em;
  font-weight: 600;
`;

const DayButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 37.5em;
  height: 3.75em;
  margin-top: 1em;
  margin-bottom: 1.5em;
`;

const DayButton = styled.button<{ checked: boolean }>`
  all: unset;
  background-color: ${(props) =>
    props.checked ? 'rgb(129, 107, 255)' : '#636363'};
  border-radius: 50%;
  width: 3.75em;
  height: 3.75em;
  text-align: center;
  font-weight: 600;
  cursor: pointer;

  & + & {
    margin-left: 1.875em;
  }
`;

const DayButtonText = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  color: rgb(255, 255, 255);
`;

const SeriesItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  user-select: none;
  width: 100%;
`;

const SeriesItemSubContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SeriesItems = styled.div`
  width: 100%;
  display: flex;
  min-height: 14em;
  overflow-x: visible;
  flex-wrap: nowrap;
  padding: 0px 3.125em;
  transform: translate3d(-133em, 0px, 0px px);
`;

const SeriesItem = styled.div`
  flex: 0 0 18.625em;
  width: 18.625em;
  scroll-snap-align: start;
  cursor: pointer;
  & + & {
    margin-left: 0.375em;
  }
`;

const SeriesItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 55.7047%;
  z-index: 0;
  border-radius: 0.25em;
  overflow: hidden;
`;

const SeriesItemImageSubContainer = styled.div`
  width: 100%;
  height: 100%;
  opacity: 1;
`;

const SeriesItemImagePicture = styled.picture`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SeriesItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SeriesItemTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.25rem;
  opacity: 1;
  padding-right: 0.5rem;
  min-height: 3.375em;
`;

const SeriesItemTitle = styled.p`
  margin: unset;
  font-weight: 400;
  font-size: 1.125em;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: break-word;
`;

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const DAY_KR: { [key: string]: string } = {
  mon: '월',
  tue: '화',
  wed: '수',
  thu: '목',
  fri: '금',
  sat: '토',
  sun: '일',
};

export default function Home() {
  const [tvSeries, setTvSeries] = useState<ITvData[]>([]);
  const [selectedDayValue, setSelectedDayValue] = useState<string>(
    getFormattedToday(),
  );

  const weeks = getStartAndEndOfWeek();

  const selectDayHandler = (day: string) => {
    setSelectedDayValue(weeks[day]);
  };

  useEffect(() => {
    const getTVSeries = async () => {
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_TOKEN}&air_date.gte=${selectedDayValue}&air_date.lte=${selectedDayValue}&language=ko-KR`;
      await fetch(url, options)
        .then((res) => res.json())
        .then((json) => setTvSeries(json.results))
        .catch((err) => console.error('error:' + err));
    };

    getTVSeries();
  }, [selectedDayValue]);

  return (
    <Layout>
      <Banner />
      <SectionContainer>
        <SeriesSection>
          <SectionTitleContainer>
            <SectionTitle>요일별 TV Series</SectionTitle>
            <DayButtonContainer>
              {DAYS.map((day) => {
                return (
                  <DayButton
                    key={day}
                    onClick={() => {
                      selectDayHandler(day);
                    }}
                    checked={weeks[day] === selectedDayValue}
                  >
                    <DayButtonText>{DAY_KR[day]}</DayButtonText>
                  </DayButton>
                );
              })}
            </DayButtonContainer>
          </SectionTitleContainer>
          <SeriesItemContainer>
            <SeriesItemSubContainer>
              <SeriesItems>
                {tvSeries?.map((item) => (
                  <SeriesItem key={item.id}>
                    <SeriesItemImageContainer>
                      <SeriesItemImageSubContainer>
                        <SeriesItemImagePicture>
                          <SeriesItemImage
                            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                            alt='poster'
                          />
                        </SeriesItemImagePicture>
                      </SeriesItemImageSubContainer>
                    </SeriesItemImageContainer>
                    <SeriesItemTitleContainer>
                      <SeriesItemTitle>{item.name}</SeriesItemTitle>
                    </SeriesItemTitleContainer>
                  </SeriesItem>
                ))}
              </SeriesItems>
            </SeriesItemSubContainer>
          </SeriesItemContainer>
        </SeriesSection>
      </SectionContainer>
    </Layout>
  );
}
