import styled from 'styled-components';

const Container = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3.125rem;
  padding-right: 3.125rem;
  width: 100%;
  height: 4rem;
`;

const MainNav = styled.nav`
  span {
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

const SecondaryNav = styled.nav`
  svg {
    margin-left: 2rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default function Header() {
  return (
    <Container>
      <MainNav>
        <span>LOGO</span>
        <span>태그검색</span>
        <span>요일별 신작</span>
        <span>테마추천</span>
        <span>멤버십</span>
      </MainNav>
      <SecondaryNav>
        <svg
          width={24}
          height={24}
          fill='none'
          stroke='currentColor'
          strokeWidth={2.5}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
          />
        </svg>
        <svg
          width={24}
          height={24}
          fill='none'
          stroke='currentColor'
          strokeWidth={2.5}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
          />
        </svg>
      </SecondaryNav>
    </Container>
  );
}
