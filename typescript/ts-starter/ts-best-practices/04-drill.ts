type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; size: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Polygon = { kind: "polygon"; sides: number; length: number };

type Shape = Circle | Square | Triangle | Polygon;
function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    case "square":
      return shape.size ** 2;

    case "triangle":
      return (shape.base * shape.height) / 2;

    case "polygon":
  return shape.sides * shape.length;

    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}



//Add New Variant -> then added case