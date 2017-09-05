/**
 * Created by Administrator on 2017/8/16 0016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {LikeButton} from './components/LikeButton'
let appElement = document.querySelector('.app')

ReactDOM.render(
  <LikeButton/>,
  appElement
)


/*let appElement = document.querySelector('.app')
setInterval(() => {
  ReactDOM.render(
    <HelloReact date={new Date}/>,
    appElement
  )
}, 1000)*/


/*let PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  appElement
);*/
