import { Cancel } from "./cancel";
import { cloneDeep } from "lodash-es";

import { isFunction } from "@/utils/is";
import axios, { AxiosResponse } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  RequestConfig,
  RequestInterceptors,
  RequestOptions,
  UploadFileParams,
} from "./types";
import { ContentTypeEnum } from "../enums/httpEnum";


export class Http {
  instance: AxiosInstance;
  options: AxiosRequestConfig;
  requestOptions: RequestOptions;
  interceptors: RequestInterceptors;

  constructor(options: RequestConfig) {
    const {requestOptions,interceptors,...config} = options
    this.instance = axios.create(config);
    this.options = config;
    this.requestOptions = requestOptions
    this.interceptors = interceptors
    this.setupInterceptors();
  }

  getAxios(): AxiosInstance {
    return this.instance;
  }

  /**
   * 重新配置axios
   * @param config 
   */
  private createAxios(config: RequestConfig): void {
    const {requestOptions,interceptors,...options} = config
    this.instance = axios.create(options);
    this.options = options;
    this.requestOptions = requestOptions
    this.interceptors = interceptors
    this.instance = axios.create(options);
  }

  setHeader(headers: any): void {
    if (!this.instance) return;
    Object.assign(this.instance.defaults.headers, headers);
  }

  /**
   * 请求
   */
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const opt: RequestOptions = Object.assign({}, this.requestOptions, options);
    const { beforeRequestHook, requestCatch, transformRequestData } =
      this.interceptors;
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(conf)
        .then((response: AxiosResponse) => {
          if (transformRequestData && isFunction(transformRequestData)) {
            try {
              const result = transformRequestData(response, opt);
              resolve(result);
            } catch (error) {
              reject(error || new Error("request error!"));
            }
            return;
          }
          resolve(response as unknown as Promise<T>);
        })
        .catch((error: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(error));
            return;
          }
          reject(error);
        });
    });
  }

  /**
   * 文件上传
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || "file";
    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.instance.request<T>({
      method: "POST",
      data: formData,
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
      ...config,
    });
  }

  /**
   * 拦截器
   */
  setupInterceptors() {
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = this.interceptors;

    const cancel = new Cancel();

    // 请求拦截器处理
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const ignoreCancelToken = (config as Recordable).headers
        .ignoreCancelToken;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.requestOptions?.ignoreCancelToken;

      !ignoreCancel && cancel.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.requestOptions);
      }
      return config;
    });
    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.instance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );

    // 响应结果拦截器处理
    this.instance.interceptors.response.use((response: AxiosResponse<any>) => {
      response && cancel.removePending(response.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        response = responseInterceptors(response);
      }
      return response;
    });
    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.instance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }
}
