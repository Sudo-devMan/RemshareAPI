
// This test is to test whether the function would generate duplicate keys per x requests
// The test is a little buggy

let requests = 10;
const ids = [];
const idLen = 5;

function generateUniqueId(len = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let uniqueId = '';

    for (let m = 0; m < len; m++) {
        uniqueId = uniqueId + chars[Math.floor(Math.random() * chars.length)]
    }

    // console.log(uniqueId);
    return uniqueId
}

while (requests > 0) {
    ids.push(generateUniqueId(idLen))
    requests--
}

console.log(ids)

console.log("\n\n           PERFORMING DUPLICATES SEARCH.....\n\n")

let duplicates = []


// Fix this loop to work well
for (let i = 0; i < ids.length; i++) {
    temp = ids[i]
    for (let j = 0; j < ids.length; j++) {
        console.log(`Temp: ${temp} (${i}) | Comp: ${ids[ids.length - j]}`)
        if (temp == ids[ids.length - j]) {
            console.log(`Temp: ${temp} (${i}) | Comp: ${ids[ids.length - j]}`)
            duplicates.push([temp, ids[ids.length - i]])
        }
    }
}

console.log("\n\n Duplicates: ", duplicates)



