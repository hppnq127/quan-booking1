import {SelectSearchOption} from 'react-select-search'
import { DISTRICT, PROVINCE } from '../INTERFACE/INTERFACE'


export const optionsDisUpPush = (districtsUpdate: DISTRICT[]) => {
  let optionsDistrictsUpdate: SelectSearchOption[] = []
  const sortDistricts = districtsUpdate.sort((a, b) => a.Prefix.localeCompare(b.Prefix))
  for (let index = 0; index < sortDistricts.length; index++) {
    optionsDistrictsUpdate.push({
      name: sortDistricts[index].Prefix.concat(' ', sortDistricts[index].Name),
      value: sortDistricts[index].id,
    })
  }
  return optionsDistrictsUpdate
}
export const optionsProPush = (provinces: PROVINCE[]) => {
  let optionsProvinces: SelectSearchOption[] = []
  for (let index = 0; index < provinces.length; index++) {
    optionsProvinces.push({
      name: provinces[index].Name,
      value: provinces[index].id,
    })
  }
  return optionsProvinces

  
}
export const optionsWardPrefix = [
  {
    name: 'Xã',
    value: 'Xã',
  },
  {
    name: 'Thị trấn',
    value: 'Thị trấn',
  },
  {
    name: 'Phường',
    value: 'Phường',
  },
]

export const optionsPrefixDistrict = [
  {
    name: 'Quận',
    value: 'Quận',
  },
  {
    name: 'Huyện',
    value: 'Huyện',
  },
  {
    name: 'Thị xã',
    value: 'Thị xã',
  },
  {
    name: 'Thành phố trực thuộc',
    value: 'Thành phố trực thuộc',
  },
]

