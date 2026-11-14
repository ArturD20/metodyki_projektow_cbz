import axios, { type AxiosRequestConfig } from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
  },
})

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export const apiRequest = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.request<T>({
    method,
    url,
    data,
    ...config,
  })

  return response.data
}
