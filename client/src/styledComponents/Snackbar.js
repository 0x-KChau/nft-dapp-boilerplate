import React from 'react';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Div = styled(Box)`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    border: 2px solid #501c19;
    box-shadow: 3px 3px 0 #65110c;
    padding: 5px 10px;
    background: #fbff5b;
`;

export const Snackbar = props => (
    <Div {...props}>
        {props.children}
    </Div>
  );
  