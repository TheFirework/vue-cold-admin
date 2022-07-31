import {router} from '.'

const whiteList = ['/login'];

router.beforeEach((to:any,_,next)=>{
    next()
})