interface StrictDictionary {
    en: string;
    french: string;
    phone: number;
}


type OnlyLanguageNames = Pick<StrictDictionary, "en" | "french">;

const namesOnly: OnlyLanguageNames = {
    en: "HI",
    french: "Bonjour"
};


type WithoutPhone = Omit<StrictDictionary, "phone">;

const noPhone: WithoutPhone = {
    en: "HI",
    french: "Bonjour"
};
console.log(noPhone)




const updateLang: Partial<StrictDictionary> = {
    french: "Salut"
};
console.log(updateLang)

type customDict = Omit<StrictDictionary,"phone">&Partial<Pick<StrictDictionary,"phone">>;

const detail:customDict={
    en : "Hindi",
    french:"Hi",
};
console.log(detail)
