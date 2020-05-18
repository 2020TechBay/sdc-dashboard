const SERVER_URL = "https://sdc-showroom-backend.herokuapp.com";
function login(email, password) {
    return fetch(SERVER_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, user_type: 'officer' })
    })
        .then(response => response.json())
        .catch(error => ({ error }));
}

module.exports = { login };