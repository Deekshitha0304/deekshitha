const productPrices: Record<string, number> = {
  apple: 20,
  grapes: 50,
};

console.log(productPrices);
console.log(productPrices.apple); 

productPrices.grapes = 55;
console.log(productPrices.grapes);

type details = {
  name: string;
  id: number;
};

const detailMap: Map<string, details> = new Map();

detailMap.set("deekshi", { name: "deekshi", id: 23 });
detailMap.set("swati", { name: "swati", id: 28 });

console.log(detailMap.get("deekshi"));    //get => gets the value
console.log(detailMap.has("swati"));      // has => checks if its there returns true 
console.log(detailMap.has("apple"))