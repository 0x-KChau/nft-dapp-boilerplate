import React from 'react'
import Debug from 'debug';
import getWeb3 from './getWeb3'
import getContract from './getContract'
import contractShibas from './contracts/Shibas.json'

const debug = Debug('web:connection.context');

export default class Web3Container extends React.Component {
  state = { loading: true, web3: null, accounts: null, contract: null };

  async componentDidMount () {
    try {
      const web3 = await getWeb3()

      console.log('web3', web3)

      if (web3) {
        const accounts = await web3.eth.getAccounts()
        const contract = await getContract(web3, contractShibas)
        this.setState({ web3, accounts, contract })
        console.log('web3, accounts, contract', web3, accounts, contract)
      }

      this.setState({ loading: false })
      
    } catch (error) {
      // console.error(error)
      debug('web3 container: ', error);
    }
  }

  render () {
    const { loading, web3, accounts, contract } = this.state

    return loading
      ? this.props.renderLoading()
      : this.props.render({ web3, accounts, contract })
  }
}
