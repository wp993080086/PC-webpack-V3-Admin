/* eslint-disable camelcase */
export type TAreaList = {
  areaId?: string
  areaName?: string
  pageNo?: string | number
  recordsPerPage?: string | number
}

type TDeviceList = {
  typeId: string
  typeName: string
}

export interface ITeamAdd {
  address: string
  areaInfos: Array<TAreaList>
  deviceTypeInfos: Array<TDeviceList>
  mobile: string
  principal: string
  scopeService: string
  teamName: string
}
