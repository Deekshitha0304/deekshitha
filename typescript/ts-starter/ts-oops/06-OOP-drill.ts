abstract class store<T>{
    abstract get(key : string):T | undefined ;                //abstract method has no body ..only declaration
    abstract set (key : string , valuse : T): void;           // Just for storing so used void 
    abstract has(key : string):boolean;

}

class ChocolateStore<T> extends store<T>{
    private data = new Map<string,T>();

    get(key:string){
        return this.data.get(key);
    }
    set(key:string,value:T){
        this.data.set(key,value);
    }
    has(key:string){
        return this.data.has(key);
    }
}

const choco = new ChocolateStore<number>();
choco.set("Age", 46);
console.log(choco.get("Age"));






// INTERFACE CAN BE EXTENDED USING IMPLEMENTS

// DIFF 
            // 1. NO CODE INSIDE 
            // 2. ONLY STRUCTURE
            // 3. ABSTRACT PROVIDE MORE CONTROL



interface store1<T>{
    get(key : string):T | undefined ;                
    set (key : string , valuse : T): void;           // Just for storing so used void 
    has(key : string):boolean;

}

class ChocolateStor<T> implements store1<T>{
    private data = new Map<string,T>();

    get(key:string){
        return this.data.get(key);
    }
    set(key:string,value:T){
        this.data.set(key,value);
    }
    has(key:string){
        return this.data.has(key);
    }
}
