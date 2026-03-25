const projectListElement = document.getElementById("projectList");

if (projectListElement) {
  fetch("/api/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((projectList) => {
      const html = projectList
        .map((project) => "<li>" + project.name + " - " + project.status + "</li>")
        .join("");

      projectListElement.innerHTML = "<ul>" + html + "</ul>";
    })
    .catch(() => {
      projectListElement.textContent = "Projects unavailable";
    });
}
