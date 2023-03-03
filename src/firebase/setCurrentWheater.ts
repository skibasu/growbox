import { IWheaterObject } from "../models/model"
import Firebase from "./firebase"

export const setCurrentWheater = (data: IWheaterObject, firebase: Firebase) => {
    if (data?.deviceid === "a48005102b" && data?.params?.temperature) {
        firebase.writeData("currentTemp/", +data.params.temperature)
    }
    if (data?.deviceid === "a48005102b" && data?.params?.humidity) {
        firebase.writeData("currentHum/", +data.params.humidity)
    }
}
