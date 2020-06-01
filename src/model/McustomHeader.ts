import { observable, action, computed } from "mobx";


export class McustomHeader{
@observable _backButton:boolean = false ;


@action setBackButton(value:boolean){
    this._backButton = value;
}

@computed get backButton(){
    return this._backButton;
}

}
