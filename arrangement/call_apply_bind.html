<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  

<script>

/** 
 * 
 * 自定义 bind
 */
/* Function.prototype.bind = function (obj) {
  // 当前作用域下的arguments 和 return 返回的新函数中的arguments 合并
  const args = []

  // arguments => 调用 bind 函数传递的实参伪数组，从第二个值开始，存放到args
  // arguments[0] => obj
  if(args.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i])      
    }
  }
  const self = this

  // 返回新函数,内部执行fn,指定fn里面的this = fn
  return function () {
    // arguments 调用新函数传递的实参伪数组,将arguments传入到args
    if(args.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i])      
      }
    }
    // 调用原来的函数，指定obj为this, 指定实参为args
    self.apply(obj, args)
  }
}
  */


/** 
 * Function.prototype
 * arguments
 * this
 * 
 */
Function.prototype.bind = function (obj) { 
  const args = []
  if(args.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i])      
    }
  }
  
  const self = this 

  return function () { 
    if(args.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i])
      }
    }
    self.apply(obj, arguments)
  }
}
 


/** 
 * 
 * 函数对象：将一个函数作为对象使用 function fn () { // 本身是函数 } fn().xxx // 函数对象
 * 实例对象：new 函数（），调用产生的对象，简称实列对象
 * 
 * 所有函数 都有 call/apply/bind
 * 所有函数都是 Function 的实列
*/
function fn (a, b) {
  console.log(a, b, this.m)
} 

const obj = { m: 1 }

/** 
 * call 传值为字符串
 * 调用 fn() 函数，
 * 将函数中的this被指定为 第一个参数 【 obj 】
 * 后面跟着的参数，都会作为实参被传过去 
 * 当前值：2 3 1 【4 没有被调用】
 */
// fn.call(obj, 2, 3, 4) // 2 3 1

/* function fn1 (a, b) {
  console.log(this, a, b)
}
fn1.call(obj, 2, 4, 5 ) // { m: 1 } 2 4 */


/** 
 * 
 * apply 传参为数组
 * 参数虽然为数组，但传递之后还是，分开对应
 * 
 * 概念和 call 一样
 * 
*/
// fn.apply(obj, [2, 3, 4]) // 2 3 1


/** 
 * bind 
 * 
 * 返回一个新的函数，函数中的this被强制指定为一个参数值
 * 
 * 
 */
const _fn = fn.bind(obj) // bind 返回一个新函数，this强制指向obj
// _fn() // undefind undefined 1
// _fn(1, 2) // 1 2 1


const fn_ = fn.bind(obj, 8)
fn_(34, 5) // 34 5 1







</script>


</body>
</html>