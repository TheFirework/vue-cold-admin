import http from "../http";


export function login(data){
    return http.request({
        url:'/login',
        method:'post',
        data
    });
}

export function logout () {
    return http.request({
        url:'/logout',
        method:'post'
    })
}