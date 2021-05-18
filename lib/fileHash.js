const fs = require('fs');
const sha256 = require('js-sha256');
const sha256File = require('sha256-file');
 
const concatedHashList = [];
const filePath = __dirname + `/tmp/mainnet`;
const fileHash = __dirname + `/tmp/fileHash.txt`;

for (let index = 0; index < 1000; index++) {

    // sha256File(`${filePath}/${index}`, function (error, sum) {
    //     if (error) return console.log(error);
    //         console.log('index, sum', index, sum); // '345eec8796c03e90b9185e4ae3fc12c1e8ebafa540f7c7821fb5da7a54edc704'
    //         concatedHashList.splice(index, 0, sum);
    //     })
    const sum = sha256File(`${filePath}/${index}`);
    // console.log('index, sum', index, sum);
    fs.appendFileSync(fileHash, sum + ',');
    concatedHashList.push(sum);
}

const concatedHashString = concatedHashList.join();
console.log('concatedHashString', concatedHashString);
const hash = sha256(concatedHashString);

console.log('concatedHashList', concatedHashList)
console.log('hash', hash)

// 82c4519ea8ad9011c5c4cfa82c726717fa985fc8679e5bfec3ab8e8a9e2b8739
 
