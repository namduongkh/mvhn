import Axios from "axios";

class Service {
    constructor(baseUrl) {
        this.apiBaseUrl = baseUrl || window.settings.services.apiUrl;
    }

    getAllNotPaginate = (params) => {
        params = params ? params : {};
        params["notPaginate"]  = true;
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

    newItem = () => {
        "use strict";
        return Axios
            .get(`${this.apiBaseUrl}/new`, {
                withCredentials: true
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
            .put(`${this.apiBaseUrl}/${id}`,data, {
                withCredentials: true
            })
    };

    addItem = (data) => {
        "use strict";
        return Axios
            .post(`${this.apiBaseUrl}` , data, {
                withCredentials: true
            })
    };


    publishItem = (id) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/publishItems`, { ids:  [id]}, {
                withCredentials: true
            })
    };

    publishItems = (ids) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/publishItems`, { ids }, {
                withCredentials: true
            })
    };

    unPublishItems = (ids) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/unPublishItems`, { ids }, {
                withCredentials: true
            })
    };



    deleteItem = (id) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/deleteItems`, {
                ids: [id]
            }, {
                withCredentials: true
            })
    };

    deleteItems = (itemSelected) => {
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/deleteItems`, { ids: itemSelected }, {
                withCredentials: true
            })
    };

    moveToTrashItems = ids =>{
        "use strict";
        return Axios
            .put(`${this.apiBaseUrl}/moveToTrashItems`, { ids }, {
                withCredentials: true
            })
    }

};

export default Service;