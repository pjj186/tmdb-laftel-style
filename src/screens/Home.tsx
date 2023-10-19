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
