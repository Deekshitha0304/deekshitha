type Status = "loading" | "success" | "error";

function handle(status : Status){
    switch(status){
        case "loading":
            return "Loading..."
        case "success":
            return "Successfull!"
        case "error":
            return "Error 404"

        default:
            const AllCases:never=status;
            return AllCases
    }
}

console.log(handle("loading"));