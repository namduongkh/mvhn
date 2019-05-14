import Axios from "axios";

const uploadImg = (data, params) => {
    return Axios.post(settings.services.webUrl + "/api/upload/image", data, {
        withCredentials: true,
        params
    });
};


const uploadBase64 = (data, params) => {
    return Axios.post(settings.services.webUrl + "/api/upload/uploadBase64", data, {
        withCredentials: true,
        params
    });
};



export default {
    uploadImg,
    uploadBase64
};
