type hasId ={
    id : string;
};

type HasTimeStamps = {
    createdAt: Date; 
    updatedAt: Date;
};

type Entity = hasId & HasTimeStamps;

const entity:Entity={
    id : "Deekshi",
    createdAt:new Date(),
    updatedAt:new Date()
}
//when createdAt is omitted then missing in type error occurs

