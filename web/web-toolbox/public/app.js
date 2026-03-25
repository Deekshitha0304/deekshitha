console.log("JS loaded")

window.addEventListener('DOMContentLoaded', () => {
  fetch('/api/ping')
    .then(res => res.json())
    .then(data => {
      console.log("API response:", data)
    })
})