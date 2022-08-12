import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  requestOptions: RequestOptions;
  interceptors: RequestInterceptors;
}

export abstract class RequestInterceptors {
  // 请求前处理
  beforeRequestHook?: (config: AxiosRequestConfig,options:RequestOptions) => AxiosRequestConfig;
  // 请求成功处理
  transformRequestData?:(response:AxiosResponse<Result>,options:RequestOptions)=>any;
  // 请求失败处理
  requestCatch?:(error:Error)=>Promise<any>;
  // 请求前拦截器
  requestInterceptors?: (config: AxiosRequestConfig,options:RequestOptions) => AxiosRequestConfig;
  // 请求前拦截器错误处理
  requestInterceptorsCatch?: (error: any) => any;
  // 请求后拦截器
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;
  // 请求后拦截器错误处理
  responseInterceptorsCatch?: (error: any) => any;
}

export interface RequestOptions {
  // 是否显示自定义提示信息
  isShowMessage?: boolean;
  // 是否显示自定义成功信息
  isShowSuccessMessage?: boolean;
  // 成功的文本信息
  successMessageText?: string;
  // 是否显示自定义失败信息
  isShowErrorMessage?: boolean;
  // 错误的文本信息
  errorMessageText?: string;
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal';
  // 不进行任何处理，直接返回
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean;
  // 绝对 URL 用于请求第三方地址
  url?:string,
  // 是否携带token
  withToken?:boolean,
  // 认证模板
  authenticationScheme?:string,
  // 忽略重复请求
  ignoreCancelToken?:boolean,
}

export interface Result<T = any> {
  code: number;
  message: string;
  data?: T;
}


export interface UploadFileParams {
  // 其他参数
  data?:Recordable;
  // 文件参数接口字段名
  name?:string;
  // 文件
  file:File | Blob
  // 文件名称
  filename?:string
  [key:string]:any
}


export interface Result<T = any>{
  code:number
  message:string
  result?:T
}