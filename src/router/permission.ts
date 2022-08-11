import { Cancel } from './../http/cancel';
import {router} from '.'

const whiteList = ['/login'];

router.beforeEach((to:any,_,next)=>{
    new Cancel().clearPending()
    next()
})