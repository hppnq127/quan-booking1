export interface POST {
  Id: number
  Tags: string[]
  Description: string
  Image: string[]
  Video: string[]
  TotalLikes: number
  TotalComments: number
  CreationTime: string
  Username: string
  Avatar: string
}

export interface CREATE_POST {
  Image: any[]
  Tags: string[]
  Description: string
  Video: any[]
}

export interface COMMENT {
  id: number
  Content: string
  PostId: number
  BookingUserId: number
  createdAt: string
  updatedAt: string
}
