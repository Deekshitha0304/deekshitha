type Shapes =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function isCircle(
  s: Shapes
): s is { kind: "circle"; radius: number } {                            //If this function returns true,
                                                                        //then s is definitely a circle.
  return s.kind === "circle";
}


// INSTEAD OF USING SWITCH WE CAN USE isCircle()



function Area(shape: Shapes): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius * shape.radius;
  }

  if (shape.kind === "square") {
    return shape.size * shape.size;
  }

  if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  }

  const allcases: never = shape;
  return allcases;
}

const testArea:Shapes = {kind:'circle',radius:90}
console.log(Area(testArea).toFixed(2))
