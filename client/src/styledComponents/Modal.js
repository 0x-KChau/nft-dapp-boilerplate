import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Div = styled(Box)`
    position: sticky;
    width: 100%;
    bottom: 20px;
    background-color: #f2f2f2;
    border: 4px solid #000;
    box-shadow: 8px 8px 0 #000;
    padding: 16px 20px;

    & > button {
    }

`;

export const Modal = props => (
    <Div {...props}>
        {props.children}
    </Div>
  );
  