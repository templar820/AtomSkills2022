/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface IClaimsType {
  id: string;
  name_claim: string;
  caption_claim: string;
}

export interface ASControllerIClaimsType {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IClaimsType[];
}

export interface ASControllerIClaimsTypeArray {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IClaimsType[][];
}

export interface IUser {
  email: string;

  /** @format double */
  role: number;
  name: string;
  surname: string;
  patronymic?: string | null;
  password: string;
}

export interface AuthCred {
  email: string;
  password: string;
}

export interface IUserExport {
  email: string;

  /** @format double */
  role: number;
  name: string;
  surname: string;
  patronymic?: string | null;
}

export interface IState {
  id: string;
  name_state: string;
  caption_state: string;
}

export interface ASControllerIState {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IState[];
}

export interface ASControllerIStateArray {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IState[][];
}

export interface IPriority {
  id: string;
  name_priority: string;
  caption_priority: string;
}

export interface ASControllerIPriority {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IPriority[];
}

export interface ASControllerIPriorityArray {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IPriority[][];
}

export interface IClaims {
  id: string;
  create_date: string;
  type: string;
  text: string;

  /** @format double */
  time_according_sla: number;
  place_of_service: string;
  date_time_edit_state: string;
  date_time_close_claim: string;
  comment: string;
  state_of_claims: IState;
  claim_type: IClaimsType;
  executor_of_claims: IUserExport;
  author_of_claims: IUserExport;
  priority_of_claims: IPriority;
}

export interface ASControllerIClaims {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IClaims[];
}

export interface ASControllerIClaimsArray {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IClaims[][];
}

export interface IRole {
  id: string;
  name_role: string;
  caption_role: string;
}

export interface ISla {
  id: string;

  /** @format double */
  time_sla: number;
  name_sla: string;
  caption_sla: string;
}

export interface ASControllerISla {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: ISla[];
}

export interface ASControllerISlaArray {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: ISla[][];
}

export interface IHistory {
  id: string;
  claim: IClaims;
  state: IState;
  date_start: string;
  date_end: string;
  comment: string;
}

export interface ASControllerIHistory {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IHistory[];
}

export interface ASControllerIUserExport {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: IUserExport[];
}

export interface ASControllervoid {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: any[];
}

export interface ISendMail {
  email: string;
  text: string;
  subject: string;
}

export interface UserClaimType {
  /** @format double */
  id?: number | null;

  /** @format double */
  userId: number;
  name: string;
  surname: string;
  email: string;
}

export interface ASControllerUserClaimType {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: UserClaimType[];
}

export interface UserClaimRelation {
  /** @format double */
  userId: number;
  claimTypeIds: number[];
}

export interface ASControllerUserClaimRelation {
  /** @format double */
  statusCode: number;
  isError: boolean;
  message: string;
  data: UserClaimRelation[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {"Content-Type": ContentType.Json}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title backend
 * @version 1.0.2
 * @license ISC
 * @baseUrl /api
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  claimType = {
    /**
     * No description
     *
     * @tags claim-type
     * @name GetOne
     * @request GET:/claim-type/{id}
     * @secure
     * @response `200` `ASControllerIClaimsType` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaimsType, any>({
        path: `/claim-type/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claim-type
     * @name Delete
     * @request DELETE:/claim-type/{id}
     * @secure
     * @response `200` `ASControllerIClaimsType` Ok
     */
    delete: (id: string, body: IClaimsType, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaimsType, any>({
        path: `/claim-type/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claim-type
     * @name GetAll
     * @request GET:/claim-type
     * @secure
     * @response `200` `ASControllerIClaimsTypeArray` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<ASControllerIClaimsTypeArray, any>({
        path: `/claim-type`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claim-type
     * @name Create
     * @request POST:/claim-type
     * @secure
     * @response `200` `ASControllerIClaimsType` Ok
     */
    create: (body: IClaimsType, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaimsType, any>({
        path: `/claim-type`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claim-type
     * @name Update
     * @request PATCH:/claim-type
     * @secure
     * @response `200` `ASControllerIClaimsType` Ok
     */
    update: (body: IClaimsType, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaimsType, any>({
        path: `/claim-type`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name CreateUser
     * @request POST:/user/register
     * @response `200` `{ token: string }` Ok
     */
    createUser: (body: IUser, params: RequestParams = {}) =>
      this.http.request<{ token: string }, any>({
        path: `/user/register`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description login для пользователя
     *
     * @tags User
     * @name LoginUser
     * @request POST:/user/login
     * @response `200` `{ token: string }` Ok
     */
    loginUser: (body: AuthCred, params: RequestParams = {}) =>
      this.http.request<{ token: string }, any>({
        path: `/user/login`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name LogoutUser
     * @request GET:/user/logout
     * @response `200` `object` Ok
     */
    logoutUser: (params: RequestParams = {}) =>
      this.http.request<object, any>({
        path: `/user/logout`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetUserByToken
     * @request GET:/user/userInfo
     * @response `200` `IUserExport` Ok
     */
    getUserByToken: (params: RequestParams = {}) =>
      this.http.request<IUserExport, any>({
        path: `/user/userInfo`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name ReadCredentials
     * @request GET:/user/readCredentials
     * @response `200` `IUserExport` Ok
     */
    readCredentials: (params: RequestParams = {}) =>
      this.http.request<IUserExport, any>({
        path: `/user/readCredentials`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  state = {
    /**
     * No description
     *
     * @tags state
     * @name GetOne
     * @request GET:/state/{id}
     * @secure
     * @response `200` `ASControllerIState` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIState, any>({
        path: `/state/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags state
     * @name Delete
     * @request DELETE:/state/{id}
     * @secure
     * @response `200` `ASControllerIState` Ok
     */
    delete: (id: string, body: IState, params: RequestParams = {}) =>
      this.http.request<ASControllerIState, any>({
        path: `/state/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags state
     * @name GetAll
     * @request GET:/state
     * @secure
     * @response `200` `ASControllerIStateArray` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<ASControllerIStateArray, any>({
        path: `/state`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags state
     * @name Create
     * @request POST:/state
     * @secure
     * @response `200` `ASControllerIState` Ok
     */
    create: (body: IState, params: RequestParams = {}) =>
      this.http.request<ASControllerIState, any>({
        path: `/state`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags state
     * @name Update
     * @request PATCH:/state
     * @secure
     * @response `200` `ASControllerIState` Ok
     */
    update: (body: IState, params: RequestParams = {}) =>
      this.http.request<ASControllerIState, any>({
        path: `/state`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  priority = {
    /**
     * No description
     *
     * @tags priority
     * @name GetOne
     * @request GET:/priority/{id}
     * @secure
     * @response `200` `ASControllerIPriority` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIPriority, any>({
        path: `/priority/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags priority
     * @name Delete
     * @request DELETE:/priority/{id}
     * @secure
     * @response `200` `ASControllerIPriority` Ok
     */
    delete: (id: string, body: IPriority, params: RequestParams = {}) =>
      this.http.request<ASControllerIPriority, any>({
        path: `/priority/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags priority
     * @name GetAll
     * @request GET:/priority
     * @secure
     * @response `200` `ASControllerIPriorityArray` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<ASControllerIPriorityArray, any>({
        path: `/priority`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags priority
     * @name Create
     * @request POST:/priority
     * @secure
     * @response `200` `ASControllerIPriority` Ok
     */
    create: (body: IPriority, params: RequestParams = {}) =>
      this.http.request<ASControllerIPriority, any>({
        path: `/priority`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags priority
     * @name Update
     * @request PATCH:/priority
     * @secure
     * @response `200` `ASControllerIPriority` Ok
     */
    update: (body: IPriority, params: RequestParams = {}) =>
      this.http.request<ASControllerIPriority, any>({
        path: `/priority`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  claims = {
    /**
     * No description
     *
     * @tags claims
     * @name GetOne
     * @request GET:/claims/{id}
     * @secure
     * @response `200` `ASControllerIClaims` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaims, any>({
        path: `/claims/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claims
     * @name Delete
     * @request DELETE:/claims/{id}
     * @secure
     * @response `200` `ASControllerIClaims` Ok
     */
    delete: (id: string, body: IClaims, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaims, any>({
        path: `/claims/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claims
     * @name GetAll
     * @request GET:/claims
     * @secure
     * @response `200` `ASControllerIClaimsArray` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<ASControllerIClaimsArray, any>({
        path: `/claims`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claims
     * @name Create
     * @request POST:/claims
     * @secure
     * @response `200` `ASControllerIClaims` Ok
     */
    create: (body: IClaims, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaims, any>({
        path: `/claims`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags claims
     * @name Update
     * @request PATCH:/claims
     * @secure
     * @response `200` `ASControllerIClaims` Ok
     */
    update: (body: IClaims, params: RequestParams = {}) =>
      this.http.request<ASControllerIClaims, any>({
        path: `/claims`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  role = {
    /**
     * No description
     *
     * @tags Role
     * @name GetOne
     * @request GET:/role/{id}
     * @secure
     * @response `200` `IRole` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<IRole, any>({
        path: `/role/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name Delete
     * @request DELETE:/role/{id}
     * @secure
     * @response `200` `IRole` Ok
     */
    delete: (id: string, body: IRole, params: RequestParams = {}) =>
      this.http.request<IRole, any>({
        path: `/role/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name GetAll
     * @request GET:/role
     * @secure
     * @response `200` `(IRole)[]` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<IRole[], any>({
        path: `/role`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name Create
     * @request POST:/role
     * @secure
     * @response `200` `IRole` Ok
     */
    create: (body: IRole, params: RequestParams = {}) =>
      this.http.request<IRole, any>({
        path: `/role`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Role
     * @name Update
     * @request PATCH:/role
     * @secure
     * @response `200` `IRole` Ok
     */
    update: (body: IRole, params: RequestParams = {}) =>
      this.http.request<IRole, any>({
        path: `/role`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  sla = {
    /**
     * No description
     *
     * @tags sla
     * @name GetOne
     * @request GET:/sla/{id}
     * @secure
     * @response `200` `ASControllerISla` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerISla, any>({
        path: `/sla/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags sla
     * @name Delete
     * @request DELETE:/sla/{id}
     * @secure
     * @response `200` `ASControllerISla` Ok
     */
    delete: (id: string, body: ISla, params: RequestParams = {}) =>
      this.http.request<ASControllerISla, any>({
        path: `/sla/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags sla
     * @name GetAll
     * @request GET:/sla
     * @secure
     * @response `200` `ASControllerISlaArray` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<ASControllerISlaArray, any>({
        path: `/sla`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags sla
     * @name Create
     * @request POST:/sla
     * @secure
     * @response `200` `ASControllerISla` Ok
     */
    create: (body: ISla, params: RequestParams = {}) =>
      this.http.request<ASControllerISla, any>({
        path: `/sla`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags sla
     * @name Update
     * @request PATCH:/sla
     * @secure
     * @response `200` `ASControllerISla` Ok
     */
    update: (body: ISla, params: RequestParams = {}) =>
      this.http.request<ASControllerISla, any>({
        path: `/sla`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  history = {
    /**
     * No description
     *
     * @tags history
     * @name GetOne
     * @request GET:/history/{id}
     * @secure
     * @response `200` `ASControllerIHistory` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIHistory, any>({
        path: `/history/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags history
     * @name GetAll
     * @request GET:/history/claim/{id}
     * @secure
     * @response `200` `(IHistory)[]` Ok
     */
    getAll: (id: number, params: RequestParams = {}) =>
      this.http.request<IHistory[], any>({
        path: `/history/claim/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  people = {
    /**
     * No description
     *
     * @tags people
     * @name GetOne
     * @request GET:/people/{id}
     * @secure
     * @response `200` `ASControllerIUserExport` Ok
     */
    getOne: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIUserExport, any>({
        path: `/people/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name Delete
     * @request DELETE:/people/{id}
     * @secure
     * @response `200` `ASControllerIUserExport` Ok
     */
    delete: (id: string, body: IUserExport, params: RequestParams = {}) =>
      this.http.request<ASControllerIUserExport, any>({
        path: `/people/${id}`,
        method: "DELETE",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name SendMail
     * @request POST:/people/sendMail
     * @secure
     * @response `200` `ASControllervoid` Ok
     */
    sendMail: (body: ISendMail, params: RequestParams = {}) =>
      this.http.request<ASControllervoid, any>({
        path: `/people/sendMail`,
        method: "POST",
        body: body,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name GetAll
     * @request GET:/people
     * @secure
     * @response `200` `(IUserExport)[]` Ok
     */
    getAll: (params: RequestParams = {}) =>
      this.http.request<IUserExport[], any>({
        path: `/people`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name Create
     * @request POST:/people
     * @secure
     * @response `200` `ASControllerIUserExport` Ok
     */
    create: (body: IUserExport, params: RequestParams = {}) =>
      this.http.request<ASControllerIUserExport, any>({
        path: `/people`,
        method: "POST",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name Update
     * @request PATCH:/people
     * @secure
     * @response `200` `ASControllerIUserExport` Ok
     */
    update: (body: IUserExport, params: RequestParams = {}) =>
      this.http.request<ASControllerIUserExport, any>({
        path: `/people`,
        method: "PATCH",
        body: body,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name GetAllByRole
     * @request GET:/people/role/{id}
     * @secure
     * @response `200` `ASControllerIUserExport` Ok
     */
    getAllByRole: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerIUserExport, any>({
        path: `/people/role/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags people
     * @name GetAllByClaimType
     * @request GET:/people/claim-type/{id}
     * @secure
     * @response `200` `ASControllerUserClaimType` Ok
     */
    getAllByClaimType: (id: number, params: RequestParams = {}) =>
      this.http.request<ASControllerUserClaimType, any>({
        path: `/people/claim-type/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создание/обновление типов заявок поддерживаемых исполнителем
     *
     * @tags people
     * @name CreateClaimsRelations
     * @request POST:/people/claims-relation
     * @secure
     * @response `200` `ASControllerUserClaimRelation` Ok
     */
    createClaimsRelations: (body: UserClaimRelation, params: RequestParams = {}) =>
      this.http.request<ASControllerUserClaimRelation, any>({
        path: `/people/claims-relation`,
        method: "POST",
        body: body,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
