import { observable, action, computed } from "mobx";
import { colorsDark,colorsLight } from '../ui/style/colors'
import { getViewMode, setViewMode } from '../dataInterface'
import { imagesDark,imagesLight } from '../ui/assets/images'

export class Mconfig {
    @observable _viewModeValue: number = 1;
    @observable _colors: any = {};
    @observable _images: any = {};

    constructor() {
     
    }

    @action setViewModeValue(value: number) {
        console.log(value)
        setViewMode(value.toString()).then(() => {
            this._viewModeValue = parseInt(value);
        }).catch((error: any) => console.log("setLanguage error"))
    }
    @computed get viewModeValue() {
        return this._viewModeValue;
    }

    @action setColors(value: any) {
        this._colors = value;
    }
    @computed get colors() {
        return this._colors;
    }
    @action setImages(value: any) {
        this._images = value;
    }
    @computed get images() {
        return this._images;
    }


    getMode(){
        return getViewMode().then((result: string) => {
            console.log("getViewMode",result)
            if (result == "0"){
                console.log("getViewMode",result)
                this._viewModeValue = 0;
                this._colors =colorsLight;
                this._images =imagesLight
            }else{
                console.log("getViewMode",result)
                this._viewModeValue = 1;
                this._colors =colorsDark;
                this._images =imagesDark
            }
        });
    }
   

}