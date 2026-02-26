class Store<T>{
    private data = new Map<string,T>;
    private isOpen = false;                 // Initially store is closed


    open(){
        this.isOpen=true;
    }
    close(){
        this.isOpen=false;
    }
    private requireOPen():void{
        if(!this.isOpen){
            throw new Error("Store Closed!!")
        }
    }


    get(key:string):T|undefined{
        this.requireOPen();                         // Checks if open then get value or else throws error
        return this.data.get(key);

    }

    set(key:string,value:T):void{
        this.requireOPen();
        this.data.set(key,value);
    }

    has(key:string):boolean{
        this.requireOPen();
        return this.data.has(key);
    }

}


const user = new Store<number>();
user.open();


try {
    console.log(user.get("Id"));   // This will throw
} catch (error) {
    console.log("Error caught:", (error as Error).message);
}


user.set("Id",22);
console.log(user.get("Id"));

user.close();
console.log(user.get("Id"));




user.open();
console.log(user.get("Id"));