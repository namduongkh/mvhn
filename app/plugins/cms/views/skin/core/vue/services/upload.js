import Axios from "axios";

const uploadImg = (data, params) => {
    return Axios.post(settings.services.webUrl + "/api/upload/image", data, {
        withCredentials: true,
        params
    });
};

const medias = () => {
    return Axios.get(settings.services.webUrl + "/cms/medias", {
        withCredentials: true,
        params: {
            notPaginate: true,
            ext: { $in: ['jpg', 'png', 'gif'] }
        }
    });
};


const uploadBase64 = (data, params) => {
    return Axios.post(settings.services.webUrl + "/api/upload/uploadBase64", data, {
        withCredentials: true,
        params
    });
};

const uploadFile = (data) => Axios.post(settings.services.webUrl + '/upload/file', data, { withCredentials: true });

export default {
    uploadImg,
    uploadBase64,
    medias,
    uploadFile
};
