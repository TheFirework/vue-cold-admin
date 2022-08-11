import http from "../http";


export function login(username:string,password:string){
    return http.request({
        url:'/login',
        method:'post',
        data:{
            username,
            password
        }
    });
}

export function logout () {
    return http.request({
        url:'/logout',
        method:'post'
    })
}