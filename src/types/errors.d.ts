export interface IHTTPError extends Error {
  code: number
  msg: string
}