// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./access/Ownable.sol";
import "./token/ERC721/ERC721.sol";
import "./ERC721EnumerableNew.sol";

contract NFT is ERC721EnumerableNew, Ownable {
    // Maximum amount of NFT in existance. Ever.
    uint public constant MAX_NFT_SUPPLY = 10000;

    // The provenance hash of all NFT. (Root hash of all 1000 NFT properties hashes concatenated)
    string public constant METADATA_PROVENANCE_HASH =
        "a860602523bb2225a9bb3f4a29e2459338ea5xxxxxxxxxx";

    // Sale switch.
    bool public hasSaleStarted = false;

    // Base URI of NFT's metadata
    string private baseURI;

    constructor() ERC721("NFT", "NFT") {}

    function tokensOfOwner(address _owner) external view returns (uint[] memory) {
        uint tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint[](0); // Return an empty array
        } else {
            uint[] memory result = new uint[](tokenCount);
            for (uint index = 0; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }
            return result;
        }
    }

    function calculatePrice() public view returns (uint) {
        require(hasSaleStarted, "Sale hasn't started");
        return calculatePriceForToken(totalSupply());
    }

    function calculatePriceForToken(uint _id) public pure returns (uint) {
        require(_id < MAX_NFT_SUPPLY, "Sale has already ended");
        // this price stratgegy is for reference only
        // you can create your own strategy

        if (_id >= 900) {
            return 1 ether; //    9000-10000: 1.00 ETH
        } else if (_id >= 800) {
            return 0.64 ether; // 8000-8999:  0.64 ETH
        } else if (_id >= 600) {
            return 0.32 ether; // 6000-7999:  0.32 ETH
        } else if (_id >= 400) {
            return 0.16 ether; // 4000-5999:  0.16 ETH
        } else if (_id >= 200) {
            return 0.08 ether; // 2000-3999:  0.08 ETH
        } else if (_id >= 100) {
            return 0.04 ether; // 1000-1999:   0.04 ETH
        } else {
            return 0.02 ether; // 0 - 999     0.02 ETH
        }
    }

    function buyNFT(uint numNFT) public payable { //buy NFT function, take the quantity of NFT as the only argument
        uint _totalSupply = totalSupply();
        require(_totalSupply < MAX_NFT_SUPPLY, "Sale has already ended");
        require(_totalSupply + numNFT <= MAX_NFT_SUPPLY, "Exceeds maximum NFT supply");
        require(numNFT > 0 && numNFT <= 20, "You can buy minimum 1, maximum 20 NFT");
        require(msg.value >= calculatePrice() * numNFT, "Ether value sent is below the price");

        for (uint i = 0; i < numNFT; i++) {
            uint mintIndex = totalSupply();
            _safeMint(msg.sender, mintIndex);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory __baseURI) public onlyOwner {
        baseURI = __baseURI;
    }

    function startSale() public onlyOwner {
        hasSaleStarted = true;
    }

    function pauseSale() public onlyOwner {
        hasSaleStarted = false;
    }

    function withdrawAll() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }

    // #0 - #19: Reserved for giveaways
    function reserveGiveaway(uint numNFT) public onlyOwner {
        uint currentSupply = totalSupply();
        require(currentSupply + numNFT <= 20, "Exceeded giveaway limit");
        for (uint index = 0; index < numNFT; index++) {
            _safeMint(owner(), currentSupply + index);
        }
    }
}
