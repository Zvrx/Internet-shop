import { makeAutoObservable } from "mobx"

export default class DyeStore{
    constructor(){
        this._Types = []
        this._Brands = []
        this._Dyes = []
        this._SelectedType = {}
        this._SelectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(Types){
        this._Types = Types
    }
    setBrands(Brands){
        this._Brands = Brands
    }
    setSelectedType(Type){
        this._SelectedType = Type
    }
    setSelectedBrand(Brand){
        this._SelectedBrand = Brand
    }
    setDyes(Dyes){
        this._Dyes = Dyes
    }
    GetTypes(){
        return this.Types
    }
    GetBrands(){
        return this.Brands
    }
    GetDyes(){
        return this.Dyes
    }
    GetSelectedType(){
        return this._SelectedType
    }
    GetSelectedBrand(){
        return this._SelectedBrand
    }
}