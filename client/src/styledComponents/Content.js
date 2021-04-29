import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Div = styled(Box)`
  flex-direction: column;

  & > img {
    margin: 3% 0;
  }

  & > a {
    font-size: 54px;
    text-decoration: none;
    color: black;
    font-weight: 700;
    line-height: 2;
  }

  & > p, span {
    font-family: monospace;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  & > h2 {
    margin-top: 5%;
  }

  & > ol > li {
    line-height: 2;
  }

  & > ul > li {
    line-height: 2;
  }
`;

export const Content = props => (
    <Div {...props}>
        {props.children}
    </Div>
  );
  