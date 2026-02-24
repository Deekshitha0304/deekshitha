type intro = {
    name : string,
    middlename?: string;

};

const Student1:intro={
    name:"Deekshi",
    middlename:"CH"
}
console.log(Student1);
console.log(Student1.middlename?.toLowerCase());

