import { initializeApp } from "firebase/app"
import { ref, getDatabase, set, onValue } from "firebase/database"
import { firebaseConfig } from "./config"
import moment from "moment"

class Firebase {
    // Your web app's Firebase configuration
    dbF: any
    firebaseConfig = firebaseConfig
    constructor() {
        this.init()
    }
    private init() {
        this.dbF = initializeApp(this.firebaseConfig)
        this.onChangeData()
    }

    public writeData(path: string, data: any) {
        const db = getDatabase()
        set(ref(db, path), data)
            .then(() => {
                console.log("saved")
                // Data saved successfully!
            })
            .catch((error) => {
                console.log(error.message)
                // The write failed...
            })
    }
    public writeCurrentDay() {
        //   var a = moment(
        //       "Tue Jan 03 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)"
        //   )
        //   var b = moment(
        //       "Tue Jan 01 2023 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)"
        //   )
        // console.log(a.diff(b, "days"))
    }
    public onChangeData() {
        const db = getDatabase()
        const tempRef = ref(db, "currentTemp/")
        const humRef = ref(db, "currentHum/")
        onValue(tempRef, (snapshot) => {
            const data = snapshot.val()
            console.log("temperature was changed for : ", data)
        })

        onValue(humRef, (snapshot) => {
            const data = snapshot.val()
            console.log("Humidity was changed for : ", data)
        })
    }
}

export default Firebase
