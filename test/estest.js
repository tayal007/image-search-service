const desc = ["beds",
    "frogs",
    "zinc",
    "boot",
    "experience",
    "angle",
    "use",
    "watch",
    "flower",
    "zebra",
    "hole",
    "purpose",
    "circle",
    "haircut",
    "fact",
    "van",
    "cellar",
    "transport",
    "actor",
    "fog",
    "leather",
    "bucket",
    "beginner",
    "lake",
    "son",
    "dolls",
    "debt",
    "paper",
    "step",
    "noise",
    "visitor",
    "carpenter",
    "nose",
    "match",
    "coat",
    "force",
    "roof",
    "baby",
    "change",
    "company",
    "key",
    "curtain",
    "mother",
    "jellyfish",
    'self',
    "look",
    "mind",
    "icicle",
    "salt",
    "books"];
let string = "";
for (let idx=0;idx<30;idx++){
    string += JSON.stringify({"index": {"_index": "image-metadata-dev", "_id": (idx+1).toString()}}) + '\n';
    string += JSON.stringify({"imageDesc": desc[idx], "imageType": "jpeg", "imageSizeInKB": (Math.random()*500).toFixed(2)}) + '\n';
}

for (let idx=30;idx<desc.length;idx++){
    string += JSON.stringify({"index": {"_index": "image-metadata-dev", "_id": (idx+1).toString()}}) + '\n';
    string += JSON.stringify({"imageDesc": desc[idx], "imageType": "png", "imageSizeInKB": (Math.random()*500).toFixed(2)}) + '\n';
}
console.log(string);