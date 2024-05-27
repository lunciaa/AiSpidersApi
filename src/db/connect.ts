import { connect } from 'mongoose'

const uri = process.env.MONGO_URI as string

export default async () => {
  const { connection } = await connect(uri)

  connection.on("connected", () => { console.log("Database connected") })
  connection.on("error", (err) => { console.error(err) })

  return connection

}