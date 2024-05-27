import { Schema, Document } from 'mongoose'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    display_name: String,
    picture: String,
  }
)

export interface IUserSchema extends Document {
  email: string,
  password: string,
  display_name?: string | null,
  picture?: string | null
}

export default UserSchema