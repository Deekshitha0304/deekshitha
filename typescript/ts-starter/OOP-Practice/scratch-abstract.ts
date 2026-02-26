abstract class Fridge<T>{
    abstract get(key:string):T | undefined;
    abstract set(key : string,value:T):void;
    abstract has(key:string):boolean;
}

class MyFridge<T> extends Fridge<T>{
    private inside = new Map<string,T>();

    get(key:string){
        return this.inside.get(key);
    }
    set(key:string,value:T){
        this.inside.set(key,value);
    }
    has(key:string){
        return this.inside.has(key)
    }

}


const NewFridge = new MyFridge();
NewFridge.set("Bottles",5);
NewFridge.set("Ice-Cream,",2);
NewFridge.set("Cake",1);

console.log(NewFridge.get("Bottles"));
console.log(NewFridge.has("Cake"));
