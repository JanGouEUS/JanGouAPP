import {observable} from 'mobx';
import {Mtaberna} from './Mtaberna';
import {Mmap} from './Mmap';
import {MtabsIcons} from './MtabsIcons';
import {McustomHeader} from './McustomHeader';
import {Mconfig} from './Mconfig';

export class app {
  @observable taberna: any = new Mtaberna();
  @observable map: any = new Mmap();
  @observable tabsIcons: any = new MtabsIcons();
  @observable customHeader: any = new McustomHeader();
  @observable config: any = new Mconfig();
}
