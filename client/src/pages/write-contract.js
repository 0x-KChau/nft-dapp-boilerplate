import React from 'react'
import axios from 'axios'
import NextImage from 'next/image'
import Web3Container from '../lib/Web3Container'
import { Box, Button } from 'rebass/styled-components';
import { Container, Content, Modal, Input, DialogBox } from '../styledComponents'

const WriteContract = ({ web3, accounts, contract }) => {

  const onClickUpdateOpensea = () => {
    console.log('contract', contract.methods)
  }

  return (
    <Container>
      <Content width={['100%', '90%', '80%', '70%']}>
        <h2>My Address</h2>
        <p>{accounts[0]}</p>
        <h3>Update Opensea Metadata</h3>
        <Button onClick={onClickUpdateOpensea}>Update</Button>
      </Content>
    </Container>
  )
}

export default () => (
  <Web3Container
    renderLoading={() => (
      <Box
        width={['100%']}
        p={3}
        mt={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NextImage
          src="/images/egg.gif"
          alt="egg"
          width="250" height="250"
        />
        </Box>
    )}
    render={({ web3, accounts, contract }) => (
      <WriteContract accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
