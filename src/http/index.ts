import config from "@/config";
import { isString } from "@/utils/is";
import { ResultEnum } from "@/enums/httpEnum";
import { ContentTypeEnum } from "../enums/httpEnum";
import { Http } from "./http";
import {
  RequestConfig,
  RequestInterceptors,
  RequestOptions,
  Result,
} from "./types";
import { deepMerge } from "@/utils/index";
import { responseErrorHandle, httpErrorStatusHandle } from "./handle";
import { useUserStoreWidthOut } from "@/store";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const interceptors: RequestInterceptors = {
  beforeRequestHook(config: AxiosRequestConfig, options: RequestOptions) {
    const { url } = options;
    if (url && isString(url)) {
      config.url = url;
    }
    return config;
  },
  transformRequestData(
    response: AxiosResponse<Result>,
    options: RequestOptions
  ) {
    const {
      isShowMessage,
      isShowSuccessMessage,
      successMessageText,
      isShowErrorMessage,
      errorMessageText,
      errorMessageMode,
      isTransformResponse,
      isReturnNativeResponse,
    } = options;

    // 是否返回原生响应头，例如下载文件
    if (isReturnNativeResponse) {
      return response;
    }
    // 不进行任何处理，直接返回
    if (!isTransformResponse) {
      return response.data;
    }

    const { data: body } = response;
    const $dialog = window["$dialog"];
    const $message = window["$message"];

    if (!body) {
      throw new Error("请求错误，请稍后重试");
    }

    const { code, message, data } = body;
    const isSuccess =
      data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;

    if (isShowMessage) {
      if (isSuccess && isShowSuccessMessage) {
        $dialog.success({
          type: "success",
          content: successMessageText || message || "操作成功！",
        });
      } else if (!isSuccess && isShowErrorMessage) {
        $message.error(message || errorMessageText || "操作失败！");
      } else if (!isSuccess && errorMessageMode === "modal") {
        $dialog.info({
          title: "提示",
          content: message,
          positiveText: "确定",
          onPositiveClick: () => {},
        });
      }
    }

    if (code === ResultEnum.SUCCESS) {
      return data;
    }

    responseErrorHandle(code, message);
  },
  requestInterceptors(config: AxiosRequestConfig, options: RequestOptions) {
    const userStore = useUserStoreWidthOut();
    const token = userStore.getToken();

    if (token && options.withToken) {
      (config as Recordable).headers.Authorization =
        options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token;
    }

    return config;
  },
  responseInterceptorsCatch(error: any) {
    const $dialog = window["$dialog"];
    const $message = window["$message"];
    const { response, code, message } = error || {};
    const msg: string =
      response && response.data && response.data.message
        ? response.data.message
        : "";
    const err: string = error.toString();
    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        $message.error("接口请求超时，请刷新页面重试!");
        return;
      }
      if (err && err.includes("Network Error")) {
        $dialog.info({
          title: "网络异常",
          content: "请检查您的网络连接是否正常",
          positiveText: "确定",
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {},
          onNegativeClick: () => {},
        });
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as any);
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      httpErrorStatusHandle(error.response && error.response.status, msg);
    } else {
      console.warn(error, "请求被取消！");
    }
    return Promise.reject(response?.data);
  },
};

function createAxios(opt?: Partial<RequestConfig>) {
  return new Http(
    deepMerge(
      {
        baseURL: config.baseURL,
        timeout: config.timeout,
        headers: { "Content-Type": ContentTypeEnum.JSON },
        withCredentials: config.withCredentials,
        requestOptions: {
          authenticationScheme: "",
          errorMessageMode: "none",
          isTransformResponse: true,
          isReturnNativeResponse: false,
          withToken: true,
          ignoreCancelToken: true,
        },
        interceptors,
      },
      opt || {}
    )
  );
}

const http = createAxios();

export default http;
