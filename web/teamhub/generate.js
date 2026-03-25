const fs = require("fs");
const path = require("path");
const { projects } = require("./data");

const publicDir = path.join(__dirname, "public");
const outputPath = path.join(publicDir, "projects-static.html");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const listHtml = projects
  .map((project) => `<li>${project.name} - ${project.status}</li>`)
  .join("");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Projects Static</title>
  </head>
  <body>
    <h1>Projects (Static)</h1>
    <ul>${listHtml}</ul>
  </body>
</html>
`;

fs.writeFileSync(outputPath, html, "utf8");
console.log("Generated:", outputPath);
