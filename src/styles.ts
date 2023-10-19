import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}
      /* other styles */

      body {
        background-color: #000000;
      }

      * {
        box-sizing: border-box;
      }

      .slick-prev,
      .slick-next {
        display: flex !important;
        justify-content: center;
        align-items: center;
        width: 4rem;
       height: 4rem;
       z-index: 1;
       &::before {
        content: none;
       }
       
       &:hover {
        svg {
          color: rgba(255, 255, 255, 1);
        }
      }
      }

      .slick-prev {
        left: 0;
      }

      .slick-next {
        right: 0;
      }
`;
