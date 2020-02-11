import Axios from "axios";

class Service {
    constructor(baseUrl) {
        this.apiBaseUrl = baseUrl || window.settings.services.cmsUrl;
    }

    getAllNotPaginate = (params) => {
        params = params ? params : {};
        params["notPaginate"] = true;
        getItems = () => {
            "use strict";
            return Axios
                .get(`${this.apiBaseUrl}`, {
                    withCredentials: true
                })
        };
    };

    getItems = (params) => {
        "use strict";
        return Axios
            .get(`${this.apiBaseUrl}`, {
                withCredentials: true,
                params
            })
    };

    newItem = (originId = '') => {
        return Axios
            .get(`${this.apiBaseUrl}/new`, {
                withCredentials: true,
                params: {
                    originId
                }
            })
    };

    getItemById = (id) => {
        "use strict";
        return Axios
            .get(`${this.apiBaseUrl}/${id}`, {
                withCredentials: true
            })
    };

    updateItem = (id, data) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/${id}`, data, {
                withCredentials: true
            })
    };

    addItem = (data) => {
        "use strict";
        return Axios
            .post(`${this.apiBaseUrl}`, data, {
                withCredentials: true
            })
    };

    publishItem = (id) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/${id}`, { status: 1 }, {
                withCredentials: true
            })
    };

    publishItems = (ids) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/bulk_update_status`, { ids, status: 1 }, {
                withCredentials: true
            })
    };

    unPublishItems = (ids) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/bulk_update_status`, { ids, status: 0 }, {
                withCredentials: true
            })
    };

    deleteItem = (id) => {
        "use strict";
        return Axios
            .delete(`${this.apiBaseUrl}/${id}`, {
                withCredentials: true
            })
    };

    deleteItems = (ids) => {
        "use strict";
        return Axios
            .post(`${this.apiBaseUrl}/bulk_delete`, { ids }, {
                withCredentials: true
            })
    };

    moveToTrashItems = ids => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/bulk_update_status`, { ids, status: 2 }, {
                withCredentials: true
            })
    }

};

export default Service;
