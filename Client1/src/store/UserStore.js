import { makeAutoObservable } from "mobx"

export default class UserStore{
    constructor(){
        this._IsAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._IsAuth = bool
    }
    setUser(user){
        this._user = user
    }
    GetIsAuth(){
        return this.IsAuth
    }
    GetUser(){
        return this.user
    }
}