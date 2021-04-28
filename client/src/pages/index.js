import React from 'react'
import Link from 'next/link'
import { Box, Button } from 'rebass/styled-components';
import { Container, Content, Modal } from '../styledComponents'
import { Image } from 'rebass/styled-components'

const coverImg = 'https://nekonft.io/static/banner-768x256-5d5bf2f1b641e30fa4d14ce800526f48.gif'

export default () =>
  <Container>

    <Content>
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

      <p>No mater who you are, you should heard of diffenet memes about Shiba. She is one of the hottest icon in the internet. As Elon Musk tweeted, "I love dog, and I love meme." Couldn't agree more, so I created these 1000 animated SHIBAs NFT, and bring it to the Etheurm Network. They are adorable, unique, and rare. I can't wait to see how SHIBAs bring fun and joy to all of you.</p>

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
      <p>In order to reward the early supportive backer, #010 - #100 and #101 - #200 will be valued at 0.02 ETH and 0.04 ETH repectively.</p>
      <p>Moreover, the one and only special background named flying to the moon, will be randomly appeared on 10 units of SHIBAs among the first 100  units. The earliest you bought, the higher chance to get the special SHIBAs.</p>
      
      <ul>
        <li>#000 - #009: Reserved for people who helped along the way</li>
        <li>#010 - #100: 0.02 ETH</li>
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

      <p>This project hugely inspired by a number of successful projects, especially NEKO, Pixils, and Chubbies. A 2D pixel-like style and animated GIF are the key elements, which I will keep those features in this project.</p>

      <h2>PROVENANCE</h2>
      <p>As an NFT project, a final proof is hardcoded in our ERC-721 smart contract. The proof is a root hash of all the 1,000 SHIBAs image hashes using the SHA-256 algorithm concatenated in sequential order of their IDs. It assures immutability. No one will be able to mess with the original images without notice.</p>

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
          <h3>Presale has started but you're probably on Mobile. Please access using a Computer Browser instead. If you're already on Desktop, please check your MetaMask extension. Or try this button:</h3>
          <Button fontSize="1.5em">
            Connect
          </Button>
        </Modal>

    </Content>
      
  </Container>
