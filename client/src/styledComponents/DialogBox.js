import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Div = styled(Box)`
    position: fixed;
    width: 50%;
    top: 5%;
    left: 25%;
    background-color: #f2f2f2;
    border: 4px solid #151313;
    box-shadow: -5px -5px 0 #2d2a2a;
    padding: 0px 20px;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    & > button {
        background-color: #211f1f;
    }

`;

export const DialogBox = props => (
    <Div {...props}>
        {props.children}
    </Div>
  );
  