import request from '~/src/http/request'

export const login = (username:string,password:string) => {
    return request({
        url:'/login',
        method:'post',
        data:{
            username,
            password
        }
    });
}