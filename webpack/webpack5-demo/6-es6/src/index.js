
import { show } from './a';

import './style.css';

show();

console.log('index1qqq');

if(module.hot){
  module.hot.accept();
}