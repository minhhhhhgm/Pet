export interface RootAccount {
    totalUsers: number
    totalPages: number
    currentPage: number
    users: User[]
  }
  
  export interface User {
    _id: string
    name: string
    password: string
    email: string
    devicesToken: any[]
    followers: string[]
    following: string[]
    createdAt: string
    updatedAt: string
    __v: number
  }