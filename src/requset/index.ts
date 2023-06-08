import axios from 'axios';

const server = axios.create({
    baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

server.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers = config.headers || {};
    if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
    } else {    
        // location.href = '/login'
    }
    return config;
})


server.interceptors.response.use((res) => {
    const code = res.data.data.code;
    
    if (code !== 200) {
        
        return Promise.reject(res.data.data);
    }

    return res.data.data;
}, (err) => {
    
    console.log(err);
    
})

export default server;