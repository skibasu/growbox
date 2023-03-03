import { ISwitchObj } from "../models/model"
import Firebase from "./firebase"

export const setCurrentSwitches = (data: ISwitchObj, firebase: Firebase) => {
    if (data?.deviceid === "10014f135b" && data.params?.switches) {
        firebase.writeData("currenSwitches/", data.params.switches)
    }
}
