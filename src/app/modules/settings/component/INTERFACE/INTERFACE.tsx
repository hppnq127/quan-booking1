export interface WARD {
    id: number
    TenantId: any
    Name: string
    Prefix: string
    DistrictId: number
    ProvinceId: number
  }
  export interface PROVINCE {
    id: number
    Name: string
    Code: string
    TenantId: any
  }
  export interface DISTRICT {
    id: number
    Name: string
    Prefix: string
    ProvinceId: number
    TenantId: any
  }
  export interface CHOOSINGDISTRICT {
    Name: string,
    Prefix: string,
    ProvinceId: number,
    ProvinceName:string,
  }
  export interface CHOOSINGWARD {
    Name: string
    Prefix: string
    DistrictId: number
    ProvinceId: number
    DistrictName:string
    ProvinceName:string
    DistrictPrefixName:string
  }