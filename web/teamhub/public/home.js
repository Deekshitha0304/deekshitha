const projectCountElement = document.getElementById("projectCount");

if (projectCountElement) {
  fetch("/api/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((projectList) => {
      projectCountElement.textContent = String(projectList.length);
    })
    .catch(() => {
      projectCountElement.textContent = "Projects unavailable";
    });
}
