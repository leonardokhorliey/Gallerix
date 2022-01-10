export interface PictureInfo {
    id?: number,
    name: string,
    url: string,
    createdAt: Date,
    updatedAt: Date,
    status: string,

}

export interface Login {
    id?: number,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    status: string
}

export interface UserPicture {
    id?: number,
    user_id: number,
    images: PictureInfo[]
}

export interface LoginEvent {
    isLoggedIn: boolean,
    currentUserID : number,
    currentUserName : string
}

export interface GroupedPictures {
    
}