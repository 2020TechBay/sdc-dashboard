const SERVER_URL = "https://sdc-showroom-backend.herokuapp.com";

export async function login(email, password) {
    try {
        let { token, error } = await fetch(SERVER_URL + '/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, user_type: 'officer' })
        }).then(response => response.json());

        if (error)
            return { success: false, error };

        let userInfo = await fetch(SERVER_URL + '/officer', {
            headers: { 'Authorization': `Bearer ${token}` },
        }).then(response => response.json());

        localStorage.setItem('access_token', token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        return { success: true };
    }
    catch (error) {
        return { success: false, error };
    }
}

export function getCustomers() {
    return fetch(SERVER_URL + '/officer/customers', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    }).then(response => response.json());
}

let requests;
export async function getRequests(refresh = true) {
    if (!requests || refresh) {
        requests = await fetch(SERVER_URL + '/officer/requests', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
        })
            .then(response => response.json())
            .then(results => results.reverse());
    }

    return requests;
}

export function sendResponse(productRequestID, response) {
    return fetch(SERVER_URL + '/officer/respond', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productRequestID, response })
    })
}