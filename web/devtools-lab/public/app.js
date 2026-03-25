const loadBtn = document.getElementById('loadBtn')
const clearBtn = document.getElementById('clearBtn')
const userCard = document.getElementById('user-card')
const loading = document.getElementById('loading')

// Load Profile
loadBtn.addEventListener('click', () => {
  loading.textContent = "Loading..."

  fetch('/api/user')
    .then(res => {
      const trace = res.headers.get('X-Debug-Trace')

      return res.json().then(data => ({
        data,
        trace,
        status: res.status
      }))
    })
    .then(({ data, trace, status }) => {
      if (status !== 200) {
        userCard.innerHTML = `<p>Error loading user </p>`
        return
      }

      userCard.innerHTML = `
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Trace:</b> ${trace}</p>
      `

      localStorage.setItem('last_user_fetch', new Date().toISOString())
    })
    .catch(() => {
      userCard.innerHTML = `<p>Something went wrong </p>`
    })
    .finally(() => {
      loading.textContent = ""
    })
})

// Clear State
clearBtn.addEventListener('click', () => {
  userCard.innerHTML = ""
  loading.textContent = ""
  localStorage.removeItem('last_user_fetch')
})