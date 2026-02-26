interface Dictionary {
    [key:string]:string | number;
};

const language : Dictionary = {
        en : "HI",
        french:"Bonjour",
        phone : 376372758
};
console.log(language)