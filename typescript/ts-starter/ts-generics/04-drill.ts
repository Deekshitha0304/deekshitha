type ApiResponse<T = unknown> = {
    status : number;
    data : T
};


const testcase:ApiResponse ={
    status : 100 ,
    data : 23.38937
};

const testcase1:ApiResponse<string>={
    status : 404 ,
    data : "Error"
};

const testcase2:ApiResponse<number>={
    status : 200 ,
    data : 200
};

console.log(testcase1.data.toUpperCase());

