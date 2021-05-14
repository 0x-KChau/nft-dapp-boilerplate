const fs = require('fs');

if (process.argv.length !== 4) {
    console.error('process.argv: network name, and number of Tokens are needed');
    process.exit(1);
}

const networkName = process.argv[2]
const numOfToken = process.argv[3]

// console.log('numOfToken', numOfToken);

for (let index = 0; index <= parseInt(numOfToken); index++) {
    const filePath = __dirname + `/tmp/${networkName}/${index}`;
    // console.log('index', index, filePath);

    fs.writeFile(filePath, `{
        "name": "SHIBA #${index}",
        "description": "Recently a Shiba Land was found in the southern east of Ethereum network, there are in total 1000 SHIBAs living there. Similar to Digimon, these adorable SHIBAs are transformed and evolved from a digi-egg.",
        "external_url": "https://shibanft.io",
        "attributes": [
            {
                "trait_type": "Shiba Type",
                "value": N/A
            },
            {
                "trait_type": "Headwear",
                "value": N/A
            },
            {
                "trait_type": "Bodyware",
                "value": N/A
            },
            {
                "trait_type": "Tail",
                "value": N/A
            },
            {
                "trait_type": "Handy Props",
                "value": N/A
            },
            {
                "trait_type": "Background Props",
                "value": N/A
            },
            {
                "trait_type": "Accessories",
                "value": N/A
            },
            {
                "trait_type": "Background",
                "value": N/A
            },
        ],
        "image": "https://gateway.pinata.cloud/ipfs/Qma2H11jrMYES8MtQHxLmnZRo7G4Ky94sx7dVog78bcdDw/0.gif"
    }`, { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log(`Metadata of token #${index} is saved`);
    });
}
