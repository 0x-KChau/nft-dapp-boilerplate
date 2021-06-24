import React from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Debug from 'debug';
import { Box, Button } from 'rebass/styled-components';
import { Container, Content, Modal, Input, DialogBox, Snackbar } from '../styledComponents'
import { Image } from 'rebass/styled-components'
import Web3Container from '../lib/Web3Container'
import { connectWallet } from '../lib/walletConnector';

// initial debug log
const debug = Debug('web:connection.context');

// check node environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

class App extends React.Component {
  state = {
    ethBalance: undefined,
    accounts: null,
    contract: null,
    web3: null,
    totalSupply: null,
    hasSaleStarted: false,
    isButtonLoading: false,
    numNFTs: 0,
  };

  async componentDidMount() {
    const { accounts, contract, web3 } = this.props;
    const { nftBought, totalSupply, hasSaleStarted } = await this._loadContractProperties(contract, web3);
    const balance = await web3?.eth.getBalance(accounts[0]);
    const ethBalance = web3?.utils.fromWei(balance, "ether")
    this.setState({ ethBalance, accounts, contract, web3, nftBought, totalSupply, hasSaleStarted });
  }

  _loadContractProperties = async (contract, web3) => {
    const nftBought = await contract?.methods?.totalSupply()?.call();
    const totalSupply = await contract?.methods?.MAX_NFT_SUPPLY()?.call();
    const hasSaleStarted = await contract?.methods?.hasSaleStarted()?.call();
    return { nftBought, totalSupply, hasSaleStarted };
  }

  _unMount = () => {
    this.setState({
      ethBalance: undefined,
      accounts: null,
      contract: null,
      web3: null,
      totalSupply: null,
      hasSaleStarted: false,
      isButtonLoading: false,
      numNFTs: 0,
    });
  }

  calNFTPrice = () => {

    const { nftBought } = this.state;

    if (nftBought >= 9000) {
        return 1.00; //    9000-10000: 1.00 ETH
    } else if (nftBought >= 800) {
        return 0.64; // 8000-8999:  0.64 ETH
    } else if (nftBought >= 600) {
        return 0.32; // 6000-7999:  0.32 ETH
    } else if (nftBought >= 400) {
        return 0.16; // 4000-5999:  0.16 ETH
    } else if (nftBought >= 200) {
        return 0.08; // 2000-3999:  0.08 ETH
    } else if (nftBought >= 100) {
        return 0.04; // 1000-1999:   0.04 ETH
    } else {
        return 0.02; // 0 - 999     0.02 ETH
    }
  }

  onChangeInput = e => {
    e.preventDefault();

    const numNFTs = e.target.value;
    this.setState({ numNFTs });
  }


  onClickBuy = async (e) => {
    e.preventDefault();
    this.setState({ isButtonLoading: true })
    
    const { contract, accounts, web3, numNFTs } = this.state;
    const price = this.calShibaPrice();
    const value = (price * numNFTs).toString();
    
    try {
      const res = await contract.methods.buyNFT(numNFTs).send({from: accounts[0], value: web3.utils.toWei(value, "ether")});

      if (res.status) {
        const { nftBought, totalSupply } = await this._loadContractProperties(contract, web3);
        this.setState({ nftBought, totalSupply, isToggleDialogBox: true });
      }

      window.setTimeout(() => {
        this._unMount();
      }, 5000)

    } catch (error) {
      debug('onClickBuy: ', error);
      this._unMount();
    }

  }

  onClickConnect = async (e) => {
    e.preventDefault();
    this.setState({ isButtonLoading: true })

    try {
      //  Enable session (triggers QR Code modal)
      const { accounts, contract, web3 } = await connectWallet();
      
      const { nftBought, totalSupply, hasSaleStarted } = await this._loadContractProperties(contract, web3);
      const networkId = await web3?.eth?.net?.getId();

      this.setState({ networkId, accounts, contract, web3, nftBought, totalSupply, hasSaleStarted, isButtonLoading: false });

    } catch (error) {
      debug('walletConnector connect: ', error);
      this._unMount();
    }
  }

  render () {
    const { ethBalance, contract, accounts, web3, isButtonLoading, hasSaleStarted, totalSupply, numNFTs, nftBought } = this.state;

    return (
      <Container>
        <Head>
          <title>NFT</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta key="description" name="description" content="description" />
          <link
            href="/static/favicon.png"
            rel="icon"
            type="image/png"
          />
        </Head>
        <Content width={['100%']}>
          {
            web3 && accounts?.length && contract
              ? <Box
                  sx={{
                    position: 'relative',
                  }}>
                  <h3>Buy NFTs</h3>
                  <h4>
                    Your Wallet: 
                    <span> {accounts[0]}</span>
                  </h4>
                  <h4>
                    Your Balance: 
                    <span> {ethBalance}</span>
                  </h4>
                  <h4>
                    Number of NFTs being kept:
                    <span> {nftBought}/{totalSupply}</span>
                  </h4>
                  <h4>
                    Price of a NFT:
                    <span> {this.calNFTPrice()} ETH + gas</span>
                  </h4>

                  <h4>
                    Buy
                    <Input type="number" min="1" max="10" value={numNFTs} onChange={this.onChangeInput} />
                    NFTs (Max 10)
                  </h4>
                  
                  {
                    hasSaleStarted
                      ? <Button onClick={this.onClickBuy} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>
                          BUY
                        </Button>
                      : <Button onClick={this.onClickStartSale} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>PRESALE STARTED ON xx.xx</Button>
                  }
                  
                </Box>
              : <Box>
                  <h3>It seems no crypto wallet connected yet. We support multiple wallets, ranging from MetaMask to Rainbow. Press the button below to connect.</h3>
                    <Button onClick={this.onClickConnect} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>
                      CONNECT
                    </Button>
                </Box>
          }
        </Content>
      </Container>
    )
  }
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
        Loading...
        </Box>
    )}
    render={({ web3, accounts, contract }) => (
      <App accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
