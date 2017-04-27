var _ = require('lodash')
var obj = {
  1:{
    value: 'A1'
  },
  2: {
    value: 'A2'
  }
}

var obj2 = {
  1: {
    value: 'B1'
  },
  3: {
    value: 'B2'
  }
}
// 没有 configurable
// 没有 writable
// 作为默认值
// console.log(obj)
var res = Object.assign({}, obj, obj2)
// console.log(res)

function customizer(objValue, srcValue) {
  console.log(arguments)
  return  _.isUndefined(objValue) ? srcValue: objValue;
}

var defaults = _.partialRight(_.assignInWith, customizer);

res = _.assignWith(obj,obj2, customizer)
// console.log(res)

var a = [1,2,3]
var b = [2,3,5]
res = _.chain(a)
  .concat(b)
  .uniq()
  .value()
console.log(res)
