import express from "express"
import config from "config"
import Logger from "../utils/logger"

// import routes from "../routes/routes"

import cors from "cors"
const http = require("http")
const eWelink = require("ewelink-api")
import Firebase from "../firebase/firebase"
import { setCurrentSwitches } from "../firebase/setCurrentSwitches"
import { ISwitchObj, IWheaterObject } from "../models/model"
import { setCurrentWheater } from "../firebase/setCurrentWheater"

export default class App {
    private port: number
    private host: string

    constructor() {
        this.port = config.get<number>("port")
        this.host = config.get<string>("host")

        this.init()
    }

    private async init() {
        const app = express()
        app.use(express.json())
        //   app.use(express.urlencoded({ extended: false }))
        app.use(cors())
        // routes(app)
        app.get("/", (req, res) => res.send("hallo world"))

        const server = http.createServer(app)
        const firebase = new Firebase()

        firebase.writeCurrentDay()
        const c = (async () => {
            console.log("strt")
            const connection = new eWelink({
                email: process.env.EMAIL,
                password: process.env.PASSWORD,
            })

            const credentials = await connection.getCredentials()

            const socketEwelink = async () =>
                await connection.openWebSocket(async (data: any) => {
                    const date = new Date()
                    if (data?.deviceid === "10014f135b") {
                        try {
                            setCurrentSwitches(data as ISwitchObj, firebase)
                        } catch (error: any) {
                            console.log(error.message)
                        }
                    }
                    if (data?.deviceid === "a48005102b") {
                        try {
                            setCurrentWheater(data as IWheaterObject, firebase)
                        } catch (error: any) {
                            console.log(error.message)
                        }
                    }

                    console.log(data)
                })
            try {
                await socketEwelink()
            } catch (error: any) {
                console.log(error.message)
            }
        })()

        server.listen(this.port, async () => {
            console.log("Server")
            Logger.info(`App is runnig on ${this.host} port ${this.port}`)
            //routes(this.server as Express)
        })
    }
}
