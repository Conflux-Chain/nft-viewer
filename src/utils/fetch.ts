import { publishRequestError } from "./index";
import { RequestInit, RequestInfo, Response } from "node-fetch";

// TODO update type defination

type FetchWithAbortType = Partial<Promise<any>> & {
  abort?: () => void;
};

type RequestInitWithTimeout = RequestInit & {
  timeout: number;
  body: BodyInit | null | undefined;
};

const windowFetch = window.fetch;

const TIMEOUT_TIMESTAMP = 60000;

// 检查 http status
const checkStatus = (response: Response): Response => {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 600
  ) {
    return response;
  } else {
    publishRequestError(
      { code: response.status, message: response.statusText },
      "http"
    );
    const error: Partial<ErrorEvent> & {
      response?: Response;
    } = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

// 格式化 response data
const parseJSON = async function (response: Response) {
  const contentType = response.headers.get("content-type");
  try {
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      return { data, response };
    } else if (contentType && contentType.includes("text/html")) {
      return { data: await response.text(), response };
    } else {
      // contentType 还有其他类型，目前项目中用不到
      // 不能简单的报错，比如 image/x-icon 是 favicon 请求
      // 此处直接返回 response，由业务代码处理其他类型的数据
      return { data: response, response };
    }
  } catch (error) {
    if ((error as any).name === "AbortError") {
      return { data: response, response };
    }
    publishRequestError({ code: 20001 }, "http");
    (error as any).response = response;
    throw error;
  }
};

// 检查返回值中是否包含错误
const checkResponse = function (
  {
    data,
    response,
  }: {
    data: any;
    response: Response;
  },
  opts: RequestInit
) {
  if (response.status === 200 && data.code === 0) {
    return data.data;
  } else if (typeof opts.method === "string" && /HEAD/i.test(opts.method)) {
    // handle of HEAD method
    return response;
  } else {
    const code = Number(data.code);
    publishRequestError({ code: code, message: data.message }, "http");
    const error: Partial<ErrorEvent> & {
      response?: ResponseType;
    } = new Error(data.message);
    error.response = data;
    throw error;
  }
};

// 添加请求超时功能
const fetchWithTimeout = (url: RequestInfo, opts: RequestInitWithTimeout) => {
  return new Promise((resolve, reject) => {
    var t = setTimeout(() => {
      publishRequestError({ code: 20002 }, "http");
      reject(new Error("fetch timeout"));
    }, opts.timeout || TIMEOUT_TIMESTAMP);

    windowFetch(url as string, opts as any)
      .then((response) => {
        clearTimeout(t);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(t);
        reject(error);
      });
  });
};

// 添加请求中断
const fetchWithAbort = (url: RequestInfo, opts: RequestInitWithTimeout) => {
  return new Promise((resolve, reject) => {
    const abortPromise = () => {
      publishRequestError({ code: 20003 }, "http");
      reject(new Error("fetch abort"));
    };
    const p: FetchWithAbortType = fetchWithTimeout(url, opts).then(
      resolve,
      reject
    );
    p.abort = abortPromise;
    return p;
  });
};

const fetch = (url: RequestInfo, opts: RequestInitWithTimeout) => {
  return (
    fetchWithAbort(url, opts)
      // @ts-ignore
      .then(checkStatus)
      .then(parseJSON)
      .then((...args) => checkResponse(...args, opts))
      .catch((error) => {
        if (typeof opts.method === "string" && /HEAD/i.test(opts.method)) {
          return {};
        }
        // 添加错误请求日志输出，或者收集统计信息

        // A fetch() promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side,
        // although this usually means permission issues or similar — a 404 does not constitute a network error, for example.
        // For detail: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        if (error.name === "TypeError") {
          publishRequestError({ code: 20004 }, "http");
        }
        throw error;
      })
  );
};

export default fetch;
