import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const showStatus = (status: number) => {
  let message = "";
  switch (status) {
      case 400:
          message = "请求错误(400)";
          break;
      case 401:
          message = "未授权，请重新登录(401)";
          break;
      case 403:
          message = "拒绝访问(403)";
          break;
      case 404:
          message = "请求出错(404)";
          break;
      case 408:
          message = "请求超时(408)";
          break;
      case 500:
          message = "服务器错误(500)";
          break;
      case 501:
          message = "服务未实现(501)";
          break;
      case 502:
          message = "网络错误(502)";
          break;
      case 503:
          message = "服务不可用(503)";
          break;
      case 504:
          message = "网络超时(504)";
          break;
      case 505:
          message = "HTTP版本不受支持(505)";
          break;
      default:
          message = `连接出错(${status})!`;
  }
  return `{$message}，请检查网络或联系管理员！`;
};

function myAxios(axiosConfig: any) {
  const service: AxiosInstance = axios.create({
      // baseURL:"http://pve.lycoris.site:9780",
      timeout: 10000,
      headers: {
          get: {
              "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
          },
          post: {
              "Content-Type": "application/json;charset=utf-8",
          },
      },
      // 是否跨站点访问控制请求
      // withCredentials: true,
      // transformRequest: [
      //     (data, headers) => {
      //         if (headers["Content-Type"] === "multipart/form-data") {
      //             return data;
      //         } else {
      //             headers["Content-Type"] = "application/json";
      //         }
      //         return JSON.stringify(data);
      //     },
      // ],
      // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
      validateStatus() {
          return true;
      },
      transformResponse: [
          (data) => {
              if (typeof data === "string" && data.startsWith("{")) {
                  data = JSON.parse(data);
              }
              return data;
          },
      ],
  });

  // 设置请求拦截器
  service.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
          // 绑定token
          let token = sessionStorage.getItem('token');
          if (token) {
              config.headers.token = `${token}`;
          }
          return config;
      },
      (error) => {
          error.data = {};
          error.data.msg = "服务器异常！";
          return Promise.reject(error);
      }
  );

  // 设置响应拦截器
  service.interceptors.response.use(
      (response: AxiosResponse) => {
          // Do something before response is sent
          const status = response.status;
          let msg = "";
          if (status < 200 || status >= 300) {
              msg = showStatus(status);
              if (typeof response.data === "string") {
                  response.data = { msg };
              } else {
                  response.data.msg = msg;
              }
          }
          return response;
      },
      (error) => {
          // // Do something with response error
          // if (axios.isCancel(error)) {
          //     console.log('repeated request:'+error.message);
          // }
          // else {
          //     // 错误抛到业务代码
          //     error.data = {};
          //     error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！';
          //     ElMessage.error(error.data.msg);
          // }
          return Promise.reject(error);
      }
  );

  return service(axiosConfig);
}

export default myAxios;
