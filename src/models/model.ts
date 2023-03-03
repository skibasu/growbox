export interface IDataObj {
    action?: string
    deviceid?: string
    apikey?: string
    userAgent?: string
}

export interface IParams {
    controlType?: number
    switches?: ISwitch[]
    triggerType?: number
    partnerApikey?: string
}

export type TTemperatureParams = {
    temperature: string
}
export type THumidityParams = {
    humidity: string
}

export interface ISwitch {
    outlet: number
    swith: "off" | "on"
}

export interface ISwitchObj extends IDataObj {
    proxyMsgTime?: number
    params?: IParams
}

export interface IWheaterObject extends IDataObj {
    d_seq: string
    params: Partial<TTemperatureParams & THumidityParams>
}
