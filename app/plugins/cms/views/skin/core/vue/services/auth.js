import Vue from 'vue';
import Axios from 'axios';

const verifySysadmin = async () => {
    return await Axios.get(`${window.settings.services.webUrl}/api/user/verify-login`, {
        withCredentials: true
    });
};

const isLoggedIn = async () => {
    if (Vue.cookie.get(window.cookieKey)) {
        let res = await verifySysadmin();
        return res;
    } else {
        return false;
    }
};

const login = (data) => {
    "use strict";

    return Axios
        .post(window.settings.services.webUrl + '/api/user/login', data, {
            withCredentials: true
        })
};

const logout = () => {
    "use strict";

    return Axios
        .get(window.settings.services.webUrl + '/api/user/logout', {
            withCredentials: true
        })
        .then((res) => {
            Vue.cookie.delete(window.cookieKey);
            if (200 === res.status) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            return false;
        })
};

export default {
    isLoggedIn,
    login,
    logout
}