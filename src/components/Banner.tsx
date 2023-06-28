import styled from 'styled-components';
import { options } from '../utils/tmdb';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 85.375rem;
`;

const BackdropImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default function Banner() {
  const [data, setData] = useState<any[]>([]);

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
      {data?.map((item: any) => {
        return (
          <BackdropImage
            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
          />
        );
      })}
    </Container>
  );
}
