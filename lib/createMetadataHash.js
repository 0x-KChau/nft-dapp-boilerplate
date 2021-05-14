const fs = require('fs');

if (process.argv.length !== 4) {
    console.error('process.argv: network name, and number of Tokens are needed');
    process.exit(1);
}

const networkName = process.argv[2]
const numOfToken = process.argv[3]

// console.log('numOfToken', numOfToken);

// const shibaTypeList = []; //['brown_shiba', 'black_shiba', 'white_shiba', 'tongue_out_brown_shiba', 'tongue_out_black_shiba', 'tongue_out_white_shiba'];
// const headwearList = []; //['magic_hat', 'space_helmet', 'rabit_hat', 'rainsuit_hat', 'warrior_helmet', 'N/A'];
// const bodywareList = []; //['cloak_coat', 'rainsuit', 'space_suit', 'N/A'];
// const tailList = []; //['ribbon_tail', 'stripe_tail', 'chekered_tail', 'N/A'];
// const handyPropsList = []; //['lollipop', 'apple', 'sword', 'carrot', 'N/A'];
// const bgPropsList = []; //['balloon', 'heart', 'rocket', 'N/A'];
// const accessoriesList = []; //['sun_glasses', 'tie', 'neck_belt', 'ribbon', 'N/A'];
// const backgroundList = []; //['rainbow_rush', 'sweet_home', 'stary_light', 'blue', 'green', 'orange', 'wheat', 'purple', 'red', 'yellow', 'tiffany_blue', 'flying_to_the_moon', 'looking_to_mars', 'looking_to_earth'];

const trait_types_list = {
    shibaTypeList: [],
    headwearList: [],
    bodywareList: [],
    tailList: [],
    handyPropsList: [],
    bgPropsList: [],
    accessoriesList: [],
    backgroundList: [],
};

const trait_types_map = {
    shibaTypeList: {
        'brown_shiba': 0.2,
        'black_shiba': 0.2,
        'white_shiba': 0.2,
        'tongue_out_brown_shiba': 0.05,
        'tongue_out_black_shiba': 0.15,
        'tongue_out_white_shiba': 0.2,
    },
    headwearList: {
        'magic_hat': 0.2,
        'cloak_hat': 0.1,
        'space_helmet': 0.02,
        'rabit_hat': 0.1,
        'rainsuit_hat': 0.2,
        'warrior_helmet': 0.18,
        'N/A': 0.2,
    },
    bodywareList: {
        'cloak_coat': 0.22,
        'rainsuit': 0.28,
        'space_suit': 0.02,
        'N/A': 0.48,
    },
    tailList: {
        'ribbon_tail': 0.3, 
        'stripe_tail': 0.2, 
        'chekered_tail': 0.2, 
        'N/A': 0.3,
    },
    handyPropsList: {
        'lollipop': 0.12,
        'apple': 0.18,
        'sword': 0.2,
        'carrot': 0.18,
        'magician_stick': 0.12,
        'N/A': 0.2,
    },
    bgPropsList: {
        'balloon': 0.18,
        'heart': 0.1,
        'rocket': 0.02,
        'N/A': 0.7,
    },
    accessoriesList: {
        'sun_glasses': 0.1,
        'tie': 0.2,
        'neck_belt': 0.2,
        'ribbon': 0.1,
        'N/A': 0.4,
    },
    backgroundList: {
        'rainbow_rush': 0.04,
        'sweet_home': 0.04,
        'stary_light': 0.04,
        'blue': 0.11,
        'green': 0.1,
        'orange': 0.11,
        'wheat': 0.11,
        'purple': 0.1,
        'red': 0.1,
        'yellow': 0.1,
        'tiffany_blue': 0.11,
        'flying_to_the_moon': 0.0,
        'looking_to_mars': 0.02,
        'looking_to_earth': 0.02,
    }
};

Object.entries(trait_types_map).forEach(([key, value]) => {
    Object.entries(value).forEach(([k, v]) => {
        for (let i = 0; i < v*1000; i++) {
            // console.log('[key]', [key], i)
            trait_types_list[key].push(k);
        }
    })
})

const uniqueMap = new Map();

let shibaType;
let headwear;
let bodyware;
let tail;
let handyProps;
let bgProps;
let costume;
let accessories;
let background;
let trait_types;
let numOfNA;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function setTraitTypes() {
    shibaType = trait_types_list.shibaTypeList[getRandomInt(trait_types_list.shibaTypeList.length)];
    headwear = trait_types_list.headwearList[getRandomInt(trait_types_list.headwearList.length)];
    bodyware = trait_types_list.bodywareList[getRandomInt(trait_types_list.bodywareList.length)];
    tail = trait_types_list.tailList[getRandomInt(trait_types_list.tailList.length)];
    handyProps = trait_types_list.handyPropsList[getRandomInt(trait_types_list.handyPropsList.length)];
    bgProps = trait_types_list.bgPropsList[getRandomInt(trait_types_list.bgPropsList.length)];
    accessories = trait_types_list.accessoriesList[getRandomInt(trait_types_list.accessoriesList.length)];
    background = trait_types_list.backgroundList[getRandomInt(trait_types_list.backgroundList.length)];

    trait_types = shibaType + ',' + headwear + ',' + bodyware + ',' + tail + ',' + handyProps + ',' + bgProps + ',' + accessories + ',' + background;
}

function calNumOfNA() {
    numOfNA = (trait_types.match(/N\/A/g) || []).length;
}

for (let index = 0; index <= parseInt(numOfToken); index++) {
    const filePath = __dirname + `/tmp/${networkName}/${index}`;
    // console.log('index', index, filePath);

    setTraitTypes();

    calNumOfNA();

    while (numOfNA > 3) {
        // console.log('#index', index, 'num Of NA old', numOfNA, 'trait_types', trait_types)
        setTraitTypes();
        calNumOfNA();
        // console.log('#index', index, 'num Of NA new', numOfNA, 'trait_types', trait_types)
    }
    
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
                "trait_type": "Handy Props",
                "value": ${handyProps}
            },
            {
                "trait_type": "Background Props",
                "value": ${bgProps}
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
    }`, { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log(`Metadata of token #${index} is saved`);
    });
}

// console.log('uniqueMap', uniqueMap)

let chance = [
    {
        'brown_shiba': 0,
        'black_shiba': 0,
        'white_shiba': 0,
        'tongue_out_brown_shiba': 0,
        'tongue_out_black_shiba': 0,
        'tongue_out_white_shiba': 0,
    },
    {
        'magic_hat': 0,
        'cloak_hat': 0,
        'space_helmet': 0,
        'rabit_hat': 0,
        'rainsuit_hat': 0,
        'warrior_helmet': 0,
        'N/A': 0,
    }, 
    {
        'cloak_coat': 0,
        'rainsuit': 0,
        'space_suit': 0,
        'N/A': 0,
    }, 
    {
        'ribbon_tail': 0, 
        'stripe_tail': 0, 
        'chekered_tail': 0, 
        'N/A': 0,
    }, 
    {
        'lollipop': 0,
        'apple': 0,
        'sword': 0,
        'carrot': 0,
        'magician_stick': 0,
        'N/A': 0,
    },
    {
        'balloon': 0,
        'heart': 0,
        'rocket': 0,
        'N/A': 0,
    },
    {
        'sun_glasses': 0,
        'tie': 0,
        'neck_belt': 0,
        'ribbon': 0,
        'N/A': 0,
    }, 
    {
        'rainbow_rush': 0,
        'sweet_home': 0,
        'stary_light': 0,
        'blue': 0,
        'green': 0,
        'orange': 0,
        'wheat': 0,
        'purple': 0,
        'red': 0,
        'yellow': 0,
        'tiffany_blue': 0,
        'flying_to_the_moon': 0,
        'looking_to_mars': 0,
        'looking_to_earth': 0,
    }
];

uniqueMap.forEach((v, k, m) => {
    // console.log('v, k, m', v, k.split(','))
    k.split(',').forEach((a, i) => {
        chance[i][a] += 1;
    })
})

console.log('chance', chance)