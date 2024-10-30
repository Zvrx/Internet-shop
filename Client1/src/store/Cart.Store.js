import { makeAutoObservable } from "mobx"

export default class CartStore{
    constructor(){
        this._Goods= []
        makeAutoObservable(this)
    }
    setDyes(goods){
        this._Goods = goods
    }
    GetTypes(){
        return this._Goods
    }
}