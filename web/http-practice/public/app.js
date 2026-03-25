const btn = document.getElementById('loadUser')
const output = document.getElementById('output')

btn.addEventListener('click', () => {
  output.textContent = "Loading..."

  fetch('/users/1')
    .then(res => {
      if (!res.ok) {
        throw new Error("User not found")
      }
      return res.json()
    })
    .then(data => {
      output.innerHTML = `
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
      `
    })
    .catch(err => {
      output.textContent = err.message
    })
})