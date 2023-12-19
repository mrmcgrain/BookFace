let wtf = {
    gallery1: {
        name: 'pexels-adam-lukac-1059979.jpg',

    },
    gallery2: {
        name: 'pexels-adrien-olichon-2387532.jpg',

    },
    gallery3: {
        name: 'pexels-bob-olichon-2387818.jpg',

    }
}

for (name in wtf) {
    console.log("name", name.name)

}

console.log("errrk", wtf.gallery1.name)
console.log("length", Object.keys(wtf).length)

let len = Object.keys(wtf).length

for (let i = 1; i <= len; i++) {
    console.log("i", wtf.gallery1.name)
    console.log("gallery test", "gallery" + i)
    console.log("AHHHH", wtf["gallery" + i].name)
}