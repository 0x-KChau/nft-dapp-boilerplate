import React from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import Debug from 'debug';
import { Box, Button } from 'rebass/styled-components';
import { Container, Content, Modal, Input, DialogBox } from '../styledComponents'
import { Image } from 'rebass/styled-components'
import Web3Container from '../lib/Web3Container'
import { connectWallet } from '../lib/walletConnector';

// initial debug log
const debug = Debug('web:connection.context');

// check node environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

const coverImg = 'https://nekonft.io/static/banner-768x256-5d5bf2f1b641e30fa4d14ce800526f48.gif'

class App extends React.Component {
  state = {
    balance: undefined,
    ethBalance: undefined,
    accounts: null,
    contract: null,
    web3: null,
    shibaKept: null,
    totalSupply: null,
    hasSaleStarted: false,
    isToggleDialogBox: false,
    isButtonLoading: false,
    numShibas: 1,
  };

  async componentDidMount() {
    const { accounts, contract, web3 } = this.props;
    const { shibaKept, totalSupply, hasSaleStarted } = await this._loadContractProperties(contract);
    this.setState({ accounts, contract, web3, shibaKept, totalSupply, hasSaleStarted });
  }

  _loadContractProperties = async (contract) => {
    const shibaKept = await contract?.methods?.totalSupply()?.call();
    const totalSupply = await contract?.methods?.MAX_SHIBA_SUPPLY()?.call();
    const hasSaleStarted = await contract?.methods?.hasSaleStarted()?.call();
    return { shibaKept, totalSupply, hasSaleStarted };
  }

  _unMount = () => {
    this.setState({ isToggleDialogBox: false, isButtonLoading: false });
  }

  onClickConnect = async (e) => {
    e.preventDefault();
    this.setState({ isButtonLoading: true })

    try {
      //  Enable session (triggers QR Code modal)
      const { accounts, contract, web3 } = await connectWallet();
      
      const { shibaKept, totalSupply } = await this._loadContractProperties(contract);

      this.setState({ accounts, contract, web3, shibaKept, totalSupply, isButtonLoading: false });

    } catch (error) {
      debug('walletConnector connect: ', error);
      this._unMount();
    }
  }

  onClickStartSale = async (e) => {
    e.preventDefault();
    this.setState({ isButtonLoading: true })

    if (isDev) {
      try {
        const { contract, accounts } = this.state;
        
        const res = await contract.methods.startSale().send({ from: accounts[0] });
        
        if (res.status) {
          const { shibaKept, totalSupply, hasSaleStarted } = await this._loadContractProperties(contract);
          this.setState({ hasSaleStarted, shibaKept, totalSupply });
        }
        
        this.setState({ isButtonLoading: false });
  
      } catch (error) {
        debug('onClickStartSale: ', error);
        this._unMount();
      }
    }
  }

  onClickBuy = async (e) => {
    e.preventDefault();
    this.setState({ isButtonLoading: true })
    
    const { contract, accounts, web3, numShibas } = this.state;
    const price = this.calShibaPrice();
    const value = (price * numShibas).toString();

    try {
      const res = await contract.methods.adoptShibas(numShibas).send({from: accounts[0], value: web3.utils.toWei(value, "ether")});
      console.log('res', res);

      if (res.status) {
        const { shibaKept, totalSupply } = await this._loadContractProperties(contract);
        this.setState({ shibaKept, totalSupply, isToggleDialogBox: true });
      }

      window.setTimeout(() => {
        this._unMount();
      }, 5000)

    } catch (error) {
      debug('onClickBuy: ', error);
      this._unMount();
    }

  }

  onChangeInput = e => {
    e.preventDefault();

    const numShibas = e.target.value;
    this.setState({ numShibas });
  }

  calShibaPrice = () => {

    const { shibaKept } = this.state;

    if (shibaKept >= 900) {
        return 1.00; //    900-1000: 1.00 ETH
    } else if (shibaKept >= 800) {
        return 0.64; // 800-900:  0.64 ETH
    } else if (shibaKept >= 600) {
        return 0.32; // 600-800:  0.32 ETH
    } else if (shibaKept >= 400) {
        return 0.16; // 400-600:  0.16 ETH
    } else if (shibaKept >= 200) {
        return 0.08; // 200-400:  0.08 ETH
    } else if (shibaKept >= 100) {
        return 0.04; // 100-200:   0.04 ETH
    } else {
        return 0.02; // 0 - 100     0.02 ETH
    }
  }

  render () {
    const { isButtonLoading, isToggleDialogBox, shibaKept, numShibas, hasSaleStarted, totalSupply, accounts, contract, web3 } = this.state;

    return (
      <Container>
        <Content width={['100%', '90%', '80%', '70%']}>
          <Link href='/'>
            SHIBA NFT
          </Link>
          <h2>ABOUT SHIBA NFT</h2>
          <p>SHIBA as the name implies, one of the most coolest dog in the universe. This project aims to bring adorable SHIBAs to the Ethereum network with only limited 1000 unit. These 1000 animated SHIBA NFTs are completely unique, rare, and free to buy & sell, yet each can only be owned by one person at a time.</p>

          <Image
            src={coverImg}
            sx={{
              width: [ '100%' ],
              borderRadius: 2,
              marginBottom: 10
            }}
          />

          <p>No mater who you are, you should heard of diffenet memes about Shiba. She is one of the hottest icon in the internet. As Elon Musk tweeted, "I love dog, and I love meme." Couldn't agree more, so I created these 1000 animated SHIBAs NFT, and bring them to the Etheurm Network. They are adorable, unique, and rare. I can't wait to see how SHIBAs bring fun and joy to all of you.</p>

          <h2>8 THINGS ABOUT SHIBAs</h2>
          <ol>
            <li>Adorable and unique</li>
            <li>Limited 1000 units supply</li>
            <li>Can only be owned by one person at a time</li>
            <li>Hidden at the time you bought</li>
            <li>All sold hidden SHIBAs will be unboxed on 15th of June</li>
            <li>No one knows what SHIBAs look like until boxing day</li>
            <li>8 different properties making SHIBAs the unique doge ever</li>
            <li>A special background will be randomly shown in 10 SHIBAs among the first 100 units</li>
          </ol>

          <h2>PRICING</h2>
          <p>In order to reward the early supportive backer, the first #100 and #200 will be valued at 0.02 ETH and 0.04 ETH repectively.</p>
          <p>Moreover, the one and only special background named flying to the moon, will be randomly appeared on 10 units of SHIBAs among the first 100  units. The earliest you bought, the higher chance to get the special SHIBAs.</p>
          
          <ul>
            <li>#000 - #019: Reserved for people who helped along the way</li>
            <li>#020 - #100: 0.02 ETH</li>
            <li>#101 - #200: 0.04 ETH</li>
            <li>#201 - #400: 0.08 ETH</li>
            <li>#401 - #600: 0.16 ETH</li>
            <li>#601 - #800: 0.32 ETH</li>
            <li>#801 - #900: 0.64 ETH</li>
            <li>#901 - #999: 1.00 ETH</li>
          </ul>

          <h2>SHIBAs PRESALE (15.05.21)</h2>
          <p>SHIBAs PRESALE will be started on 15th of May. SHIBAs are shy, when the time you bought, they are hidden. They will only be shown up until boxing day.</p>

          <h2>BOXING DAY (15.06.21)</h2>
          <p>Although Christmas is yet to come, the SHIBAs boxing day is coming soon. 15th of June is the first big day, all sold hidden SHIBA NFTs will be revealed on that day.</p>

          <h2>SHIBAs PROPERTIES</h2>
          <ul>
            <li>Shiba Type</li>
            <li>Headware</li>
            <li>Bodyware</li>
            <li>Tail</li>
            <li>Props</li>
            <li>Costume</li>
            <li>Accessories</li>
            <li>Background</li>
          </ul>

          <h2>PROVENANCE</h2>
          <p>As an NFT project, a final proof is hardcoded in our ERC-721 smart contract. The proof is a root hash of all the 1,000 SHIBAs image hashes using the SHA-256 algorithm concatenated in sequential order of their IDs. It assures immutability. No one will be able to mess with the original images without notice.</p>
          <p>This project hugely inspired by a number of successful projects, especially NEKO, Pixils, and Chubbies. A 2D pixel-like style and animated GIF are the key elements, which I will keep those features in this project.</p>

          <h2>ABOUT ME</h2>
          <p>A new DEFI guy who has passtionate in tech, and belives blockchain will eventually disrupt all existing market and bring innovation to the new market.</p>

          <h2>FAQ</h2>
          <h3>Buying NFT for the first time, how can I get started?</h3>
          <p>Get a MetaMask chrome extension. Load it with ETH through services that allow you to change your money to ETH like Coinbase Pro or PayPal. Finally, click the button on the Sticky banner and approve the transaction on MetaMask. Voila!</p>
          
          <Modal
              mb={4}
              p={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {
                web3 && accounts && contract
                  ? <Box>
                      <h3>Buy & keep SHIBAs</h3>
                      <h4>
                        Your Wallet: 
                        <span> {accounts[0]}</span>
                      </h4>
                      <h4>
                        Number of SHIBAs being kept:
                        <span> {shibaKept}/{totalSupply}</span>
                      </h4>
                      <h4>
                        Price of a SHIBA:
                        <span> {this.calShibaPrice()} ETH + gas</span>
                      </h4>

                      <h4>
                        Keep
                        <Input type="number" min="1" max="10" value={numShibas} onChange={this.onChangeInput} />
                        SHIBAs (Max 10)
                      </h4>
                      
                      {
                        hasSaleStarted
                          ? <Button onClick={this.onClickBuy} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>
                              BUY
                            </Button>
                          : <Button onClick={this.onClickStartSale} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>PRESALE STARTED ON 15.05</Button>
                      }
                      
                    </Box>
                  : <Box>
                      <h3>Seems you haven't install any crypto wallet yet, we support multiple wallets, ranging from MetaMask to Rainbow. Press below button to connect.</h3>
                        <Button onClick={this.onClickConnect} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>
                          CONNECT
                        </Button>
                    </Box>
              }
            </Modal>

            {
              isToggleDialogBox && (
                <DialogBox>
                  <h4>Congrats, buy & keep our adorable SHIBA successfully!</h4>
                </DialogBox>
              )
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
        <NextImage
          src="/images/egg.gif"
          alt="egg"
          width="250" height="250"
        />
        </Box>
    )}
    render={({ web3, accounts, contract }) => (
      <App accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
