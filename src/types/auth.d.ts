import { ObjectId } from "mongoose"
import { IUserSchema } from "./schemas"

export type jwt_payload = {
  user: IUserSchema
}