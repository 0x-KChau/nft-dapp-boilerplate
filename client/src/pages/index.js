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
    networkId: 1,
  };

  async componentDidMount() {
    const { accounts, contract, web3 } = this.props;
    const { shibaKept, totalSupply, hasSaleStarted, networkId } = await this._loadContractProperties(contract, web3);
    this.setState({ accounts, contract, web3, shibaKept, totalSupply, hasSaleStarted, networkId });
  }

  _loadContractProperties = async (contract, web3) => {
    const shibaKept = await contract?.methods?.totalSupply()?.call();
    const totalSupply = await contract?.methods?.MAX_SHIBA_SUPPLY()?.call();
    const hasSaleStarted = await contract?.methods?.hasSaleStarted()?.call();
    const networkId = await web3?.eth?.net?.getId();
    return { shibaKept, totalSupply, hasSaleStarted, networkId };
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
      
      const { shibaKept, totalSupply, hasSaleStarted } = await this._loadContractProperties(contract, web3);

      this.setState({ accounts, contract, web3, shibaKept, totalSupply, hasSaleStarted, isButtonLoading: false });

    } catch (error) {
      debug('walletConnector connect: ', error);
      this._unMount();
    }
  }

  onClickStartSale = async (e) => {
    e.preventDefault();

    if (isDev) {
      this.setState({ isButtonLoading: true });

      try {
        const { contract, accounts, web3 } = this.state;
        
        const res = await contract.methods.startSale().send({ from: accounts[0] });
        
        if (res.status) {
          const { shibaKept, totalSupply, hasSaleStarted } = await this._loadContractProperties(contract, web3);
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

      if (res.status) {
        const { shibaKept, totalSupply } = await this._loadContractProperties(contract, web3);
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
    const { isButtonLoading, isToggleDialogBox, shibaKept, numShibas, hasSaleStarted, totalSupply, accounts, contract, web3, networkId } = this.state;

    return (
      <Container>
        <Head>
          <title>SHIBA NFT</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta key="description" name="description" content="SHIBA is one of the most fantastic dogs in the universe. This project aims to bring adorable SHIBAs to the Ethereum network with only a limited number of 1000 units." />
          {/* <meta name="og:title" property="og:title" content="SHIBA NFT, buy and keep an adorable doge home." />
          <meta key="og:type" name="og:type" content="website" />
          <meta key="og:url" name="og:url" content="http://shibanft.io/" />
          <meta key="og:image" name="og:image" content="/static/favicon.png" />
          <meta key="og:description" name="og:description" content="SHIBA is one of the most fantastic dogs in the universe. This project aims to bring adorable SHIBAs to the Ethereum network with only a limited number of 1000 units." /> */}
          <link
            href="/static/favicon.png"
            rel="icon"
            type="image/png"
          />
          <script dangerouslySetInnerHTML={{ __html: `!function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};
            d=s.createElement(q);d.src='//d1l6p2sc9645hc.cloudfront.net/gosquared.js';q=
            s.getElementsByTagName(q)[0];q.parentNode.insertBefore(d,q)}(window,document
            ,'script','_gs');

            _gs('GSN-771913-J');
            _gs('set', 'anonymizeIP', true);` }} />
        </Head>

        <Content width={['100%', '90%', '80%', '70%']}>
          <h1>
            <Link href='/'>
              SHIBA NFT
            </Link>
          </h1>
          
          <h2>ABOUT SHIBA NFT</h2>
          
          <p>SHIBA is one of the most fantastic doges in the universe. This project aims to bring adorable SHIBAs to the Ethereum network with only a limited number of 1000 units. These 1000 animated SHIBA NFTs are unique, rare, and free to buy & sell, yet one person can only own each at a time.</p>
          
          <Image
            src="/images/shiba_banner.gif"
            alt="shiba_banner"
            sx={{
              width: [ '100%' ],
              borderRadius: 2,
              marginBottom: 5
            }}
          />

          <h2>SHIBA LAND</h2>
          <p>Recently a Shiba Land was found in the southeast of the Ethereum network, there are in total 1000 SHIBAs living there. Similar to Digimon, these adorable SHIBAs are transformed and evolved from a Digi-egg.</p>
          {/* <p>No mater who you are, you should heard of diffenet memes about Shiba. She is one of the hottest icon in the internet. As Elon Musk tweeted, "I love dog, and I love meme." Couldn't agree more, so I created these 1000 animated SHIBAs NFT, and bring them to the Etheurm Network. They are adorable, unique, and rare. I can't wait to see how SHIBAs bring fun and joy to all of you.</p> */}

          <Image
            src="/images/egg.gif"
            alt="egg"
            sx={{
              width: [ '30%' ],
              borderRadius: 2,
              marginBottom: 5
            }}
          />

          <h2>8 THINGS ABOUT SHIBAs</h2>
          <ol>
            <li>Adorable and unique</li>
            <li>Limited 1000 units supply</li>
            <li>Can only be owned by one person at a time</li>
            <li>Hidden inside the Digi-egg at the time you bought</li>
            <li>All sold SHIBAs Digi-egg will be hatched out on 15th of June</li>
            <li>No one knows what SHIBAs look like until incubation day</li>
            <li>8 different trait types making SHIBAs the unique doge-mon ever</li>
            <li>A special background will be randomly shown in 5 SHIBAs among the first 100 units</li>
          </ol>

          <h2>PRICING</h2>
          <p>In order to reward the early supportive backer, the first #100 and #200 will be valued at 0.02 ETH and 0.04 ETH respectively.</p>
          <p>Moreover, The only special background named FLYING TO THE MOON will be randomly generated on 5 SHIBAs among the first 100 units. The earliest you bought, the higher chance to get the special SHIBAs (Rarity: ~0.5%).</p>
          
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

          <h3>Randomly showing some SHIBAs...</h3>

          <Image
            src="/images/shiba_banner_X.gif"
            alt="shiba_banner_X"
            sx={{
              width: [ '100%' ],
              borderRadius: 2,
              marginBottom: 5
            }}
          />

          <Image
            src="/images/shiba_banner_Y.gif"
            alt="shiba_banner_Y"
            sx={{
              width: [ '100%' ],
              borderRadius: 2,
              marginBottom: 5
            }}
          />

          <h2>SHIBAs PRESALE (01.06.21)</h2>
          <p>SHIBAs PRESALE will be started on 1st of June. SHIBAs are still in incubating proccess when the time you bought. They will only be hatched out on incubation day.</p>

          <h2>INCUBATION DAY (15.06.21)</h2>
          {/* Although Christmas is yet to come, the SHIBAs boxing day is coming soon.  */}
          <p>15th of June is the first big day, all sold hidden SHIBAs Digi-egg NFTs will be revealed on that day. Those SHIBAs doge-mon will be hatched out one by one from the Digi-egg.</p>

          <h2>SHIBAs TRAIT TYPES</h2>
          <ul>
            <li>Shiba Type</li>
            <li>Headware</li>
            <li>Bodyware</li>
            <li>Tail</li>
            <li>Handy Props</li>
            <li>Background Props</li>
            <li>Accessories</li>
            <li>Background</li>
          </ul>

          <h2>PROVENANCE</h2>
          <p>As an NFT project, a final proof is hardcoded in our ERC-721 smart contract. The proof is a root hash of all the 1,000 SHIBAs properties hashes using the SHA-256 algorithm concatenated in sequential order of their IDs. It assures immutability. No one will be able to mess with the original images without notice.</p>
          <p>This project hugely inspired by a number of successful projects, especially NEKO, Pixils, and Chubbies. A 2D pixel-like style and animated GIF are the key elements, which I will keep those features in this project.</p>

          <h2>ABOUT ME</h2>
          <Box
            width={['100%']}
            sx={{
              display: 'flex',
            }}
          >

            <Image
              src="/images/profile.png"
              alt="profile"
              sx={{
                width: [ '30%', '25%', '20%', '15%' ],
                alignSelf: 'center',
              }}
            />
            
            <Box
              width={['70%', '75%', '80%']}
              ml={3}>
              <h3>KETHER</h3>
              <p>A new DEFI guy passionate about tech believes blockchain will eventually disrupt all existing markets and bring innovation to the new market.</p>
            </Box>

          </Box>

          <h4>Twitter: <a href="https://twitter.com/SHIBA_NFT">@SHIBA_NFT</a></h4>
          <h4>Discord: <a href="https://discord.gg/CTu99xZ8EB">https://discord.gg/CTu99xZ8EB</a></h4>

          <h2>FAQ</h2>
          
          <h3>What can I get started to buy NFT?</h3>
          <p>You can either download a crypto wallet in an app store or install a browser extension. Deposit with ETH via tools like Coinbase Pro or PayPal. Finally, you can buy the adorable SHIBA NFT simply by clicking the button on the Sticky banner and approving the transaction!</p>

          <h3>What is the INCUBATION DAY?</h3>
          <p>Since all SHIBAs are hidden inside the Digi-egg when the time you bought, they will only be hatched out after incubation day. So INCUBATION DAY is our first big day.</p>
          
          <h3>Where can I trade my SHIBAs?</h3>
          <p>SHIBAs are built upon ERC-721 standard and attached to Ethereum Blockchain. So you can trade on all Etherurm marketplaces, such as <a href="https://opensea.io/">OpenSea</a>.</p>
          
          <h3>What can I do with my SHIBAs?</h3>
          <p>You are the sole owner of your unique SHIBAs as the ownership is already marked on the Ethereum Blockchain. So you are free to do anything with them.</p>

          <h3>Related Links</h3>
          <p>Twitter: <a href="https://twitter.com/SHIBA_NFT">@SHIBA_NFT</a></p>
          <p>Discord: <a href="https://discord.gg/CTu99xZ8EB">https://discord.gg/CTu99xZ8EB</a></p>
          {/* <p>Opensea: <a href="https://opensea.io/collection/shiba">https://opensea.io/collection/shiba</a></p> */}
          <p>Contract: <a href="https://etherscan.io/address/0xa7a53014EBb4615Ad694ADAEb209f3A647915642">0xa7a53014EBb4615Ad694ADAEb209f3A647915642</a></p>
          
          <Modal
              mb={4}
              p={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isButtonLoading ? '#c7c3c3' : '#f2f2f2',
              }}
            >
              {
                web3 && accounts?.length && contract
                  ? <Box
                      sx={{
                        position: 'relative',
                      }}>
                      {
                        isButtonLoading && (
                          <Box
                            width={['100%']}
                            p={3}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              position: 'absolute',
                            }}
                          >
                            <Image
                              src="/images/loading.gif"
                              alt="loading"
                              sx={{
                                width: [ '250px' ],
                              }}
                            />
                          </Box>
                        )
                      }
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
                        Buy
                        <Input type="number" min="1" max="10" value={numShibas} onChange={this.onChangeInput} />
                        SHIBAs (Max 10)
                      </h4>
                      
                      {
                        hasSaleStarted
                          ? <Button onClick={this.onClickBuy} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>
                              BUY
                            </Button>
                          : <Button onClick={this.onClickStartSale} disabled={isButtonLoading} variant={isButtonLoading ? 'disabled' : 'primary'}>PRESALE STARTED ON 01.06</Button>
                      }
                      
                    </Box>
                  : <Box>
                      <h3>It seems no crypto wallet connected yet. We support multiple wallets, ranging from MetaMask to Rainbow. Press the button below to connect.</h3>
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

            {
              networkId !== 1 && (
                <Snackbar>
                  <h4>Reminder: You are not at the Ethereum Mainnet.</h4>
                </Snackbar>
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
