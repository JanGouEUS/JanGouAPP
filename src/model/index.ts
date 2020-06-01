import {app} from './app';

let _app:app;

export function instance()
{
    if (!_app){
        _app=new app();
    }
    return _app;
}
