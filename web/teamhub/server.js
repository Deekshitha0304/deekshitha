const express = require("express");
const { projects, articles, team, users } = require("./data");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  if (
    req.path === "/" ||
    req.path === "/projects/csr" ||
    req.path === "/projects/ssr"
  ) {
    res.setHeader("Cache-Control", "no-store");
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1d",
    etag: true,
    lastModified: true,
  })
);

app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
  next();
});

function parseCookies(cookieHeader = "") {
  const cookieMap = {};
  const cookiePairs = cookieHeader.split(";");

  cookiePairs.forEach((pair) => {
    const trimmed = pair.trim();
    if (!trimmed) return;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) return;

    const key = trimmed.slice(0, equalsIndex);
    const value = decodeURIComponent(trimmed.slice(equalsIndex + 1));
    cookieMap[key] = value;
  });

  return cookieMap;
}

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TeamHub</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 2rem;
            background: #f7f7f9;
          }
          h1 {
            margin-bottom: 1.5rem;
          }
          .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            max-width: 700px;
          }
          .card {
            background: #fff;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          }
          .label {
            color: #555;
            margin-bottom: 0.5rem;
          }
          .value {
            font-size: 1.5rem;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>TeamHub</h1>
        <div class="cards">
          <div class="card">
            <div class="label">Project Count</div>
            <div class="value" id="projectCount">3</div>
          </div>
          <div class="card">
            <div class="label">Article Count</div>
            <div class="value">3</div>
          </div>
          <div class="card">
            <div class="label">Team Size</div>
            <div class="value">3</div>
          </div>
        </div>

        <script src="/home.js" defer></script>
      </body>
    </html>
  `);
});

app.get("/projects/csr", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Projects CSR</title>
      </head>
      <body>
        <h1>Projects (CSR)</h1>
        <div id="projectList"></div>

        <script src="/projects-csr.js" defer></script>
      </body>
    </html>
  `);
});

app.get("/projects/ssr", (req, res) => {
  const listHtml = projects
    .map((project) => `<li>${project.name} - ${project.status}</li>`)
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Projects SSR</title>
      </head>
      <body>
        <h1>Projects (SSR)</h1>
        <ul>${listHtml}</ul>
      </body>
    </html>
  `);
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.json(article);
});

app.get("/api/team", (req, res) => {
  res.json(team);
});

app.get("/health", (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.get("/people", (req, res) => {
  res.redirect(301, "/team");
});

app.get("/team", (req, res) => {
  res.json(team);
});

app.get("/set-theme", (req, res) => {
  res.setHeader("Set-Cookie", "theme=light; Path=/; HttpOnly");
  res.json({ ok: true });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.setHeader(
    "Set-Cookie",
    `session=${user.id}; HttpOnly; Path=/; SameSite=Strict`
  );
  res.json({ ok: true });
});

app.get("/me", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const userId = Number(cookies.session);
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const userProjects = projects.filter((project) => project.userId === user.id);

  res.json({
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
    projects: userProjects,
  });
});

app.post("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    "session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0"
  );
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`TeamHub server is running on http://localhost:${PORT}`);
});
