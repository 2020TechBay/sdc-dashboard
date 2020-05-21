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
            method: 'GET',
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