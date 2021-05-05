const fs = require('fs');

if (process.argv.length !== 4) {
    console.error('process.argv: network name, and number of Tokens are needed');
    process.exit(1);
}

const networkName = process.argv[2]
const numOfToken = process.argv[3]

// console.log('numOfToken', numOfToken);

const shibaTypeList = ['0', '1', '2'];
const headwearList = ['0', '1', '2'];
const bodywareList = ['0', '1', '2'];
const tailList = ['0', '1', '2'];
const propsList = ['0', '1', '2'];
const costumeList = ['0', '1', '2'];
const accessoriesList = ['0', '1', '2'];
const backgroundList = ['0', '1', '2'];

const uniqueMap = new Map();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let shibaType;
let headwear;
let bodyware;
let tail;
let props;
let costume;
let accessories;
let background;
let trait_types;

function setTraitTypes() {
    shibaType = shibaTypeList[getRandomInt(3)];
    headwear = headwearList[getRandomInt(3)];
    bodyware = bodywareList[getRandomInt(3)];
    tail = tailList[getRandomInt(3)];
    props = propsList[getRandomInt(3)];
    costume = costumeList[getRandomInt(3)];
    accessories = accessoriesList[getRandomInt(3)];
    background = backgroundList[getRandomInt(3)];

    trait_types = shibaType + headwear + bodyware + tail + props + costume + accessories + background;
}

for (let index = 0; index <= parseInt(numOfToken); index++) {
    const filePath = __dirname + `/tmp/${networkName}/${index}`;
    // console.log('index', index, filePath);

    setTraitTypes();
    
    // console.log('#index', index, 'uniqueMap.has(trait_types)', uniqueMap.has(trait_types))

    while (uniqueMap.has(trait_types)) {
        // console.log('#index', index, 'trait_types old', trait_types)
        setTraitTypes();
        // console.log('#index', index, 'trait_types new', trait_types)
        // console.log('#index', index, 'uniqueMap.has(trait_types)', uniqueMap.has(trait_types))
    }

    uniqueMap.set(trait_types, true);

    fs.writeFile(filePath, `{
        "name": "SHIBA #${index}",
        "description": "SHIBA as the name implies, one of the most coolest dog in the universe. This project aims to bring adorable SHIBAs to the Ethereum network with only limited 1000 unit.",
        "external_url": "https://shibanft.io",
        "attributes": [
            {
                "trait_type": "Shiba Type",
                "value": ${shibaType}
            },
            {
                "trait_type": "Headwear",
                "value": ${headwear}
            },
            {
                "trait_type": "Bodyware",
                "value": ${bodyware}
            },
            {
                "trait_type": "Tail",
                "value": ${tail}
            },
            {
                "trait_type": "Props",
                "value": ${props}
            },
            {
                "trait_type": "Costume",
                "value": ${costume}
            },
            {
                "trait_type": "Accessories",
                "value": ${accessories}
            },
            {
                "trait_type": "Background",
                "value": ${background}
            },
        ],
        "image": "https://gateway.pinata.cloud/ipfs/Qma2H11jrMYES8MtQHxLmnZRo7G4Ky94sx7dVog78bcdDw/0.gif"
    }`, { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log(`Metadata of token #${index} is saved`);
    });
}
