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

const CategoryButtonContainer = styled.div`
  margin: 1rem 0;
`;

const CategoryButton = styled.button`
  all: unset;
  background-color: #636363;
  border-radius: 100%;
  width: 5rem;
  height: 5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-right: 2rem;
  cursor: pointer;
`;

const SeriesItemContainer = styled.div`
  display: flex;
`;

const SeriesItem = styled.div``;

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

  const getTVSeries = async () => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_TOKEN}&air_date.gte=${selectedDayValue}&air_date.lte=${selectedDayValue}&language=ko-KR`;
    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => setTvSeries(json.results))
      .catch((err) => console.error('error:' + err));
  };

  useEffect(() => {
    getTVSeries();
  }, [selectedDayValue]);

  console.log(tvSeries);

  return (
    <Layout>
      <Banner />
      <SectionContainer>
        <SeriesSection>
          <SectionTitleContainer>
            <SectionTitle>요일별 TV Series</SectionTitle>
            <CategoryButtonContainer>
              {DAYS.map((day) => {
                return (
                  <CategoryButton
                    key={day}
                    onClick={() => {
                      selectDayHandler(day);
                    }}
                  >
                    {DAY_KR[day]}
                  </CategoryButton>
                );
              })}
            </CategoryButtonContainer>
          </SectionTitleContainer>
          <SeriesItemContainer>
            {tvSeries?.map((item) => (
              <SeriesItem key={item.id}>
                <div />
                <span>{item.name}</span>
              </SeriesItem>
            ))}
          </SeriesItemContainer>
        </SeriesSection>
      </SectionContainer>
    </Layout>
  );
}
