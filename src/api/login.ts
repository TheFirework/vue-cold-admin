import request from '@/utils/request'

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