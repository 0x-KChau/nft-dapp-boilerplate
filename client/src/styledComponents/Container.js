import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Div = styled(Box)`
  background-color: white;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Silom, monospace;
`;

export const Container = props => (
    <Div {...props}>
        {props.children}
    </Div>
  );
  