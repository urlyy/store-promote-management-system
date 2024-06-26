//1、引入axios
import axios from "axios";
// import localStorage from './localStorage'
import env from '../env'
import userStore from "../stores/user";
import AsyncStorage from '@react-native-async-storage/async-storage';





//2、创建axios的实例
let instance = axios.create({
    baseURL: env.API_BACKEND_URL,
    withCredentials: false,
});



//3、axios的拦截--request
instance.interceptors.request.use(
    async (config) => {
        // 获取数据
        const token = await AsyncStorage.getItem('token');
        if (token != null) {
            config.headers.Authorization = token;
        }
        // const userStr = localStorage.getString("user");
        // if (userStr != null) {
        //     const user = JSON.parse(userStr);
        //     config.headers.Authorization = user.token;
        // }
        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);

//4、axios的拦截--response
instance.interceptors.response.use(
    (response) => {
        // console.log(response.data.data);
        // console.log("拦截器拦下来了");
        // if (response.data.code === SUCCESS) {
        //     // console.log("请求成功");
        // } else {
        //     console.log(response.data.message);
        // }
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const request = {
    get: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "get",
                params: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    delete: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "delete",
                params: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    putParam: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "put",
                params: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    putBody: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "put",
                data: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    postBody: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "post",
                data: params,
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    postParam: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "post",
                params: params,
                headers: { "Content-Type": "application/x-www-form-urlcoded" },
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    postForm: (url, formData) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "post",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};


export default request;
