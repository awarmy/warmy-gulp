import { foo, bar } from './module1'
import { DATA_ARR } from './module1'
import { fun1, fun2 } from './module2'
import person from './module3'

import $ from 'jquery'

$('body').css('background-color', 'red');
//写两句注释看看
Promise.resolve(1)
    .then(function () {
        foo();
        bar();
        console.log(DATA_ARR);
        fun1();
        fun2();
    })


person.setName('Jack');
console.log(person.name);
