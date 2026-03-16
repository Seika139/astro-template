import{r as p}from"./index.DiEladB3.js";var l={exports:{}},o={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function h(){if(x)return o;x=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function u(c,e,r){var i=null;if(r!==void 0&&(i=""+r),e.key!==void 0&&(i=""+e.key),"key"in e){r={};for(var a in e)a!=="key"&&(r[a]=e[a])}else r=e;return e=r.ref,{$$typeof:s,type:c,key:i,ref:e!==void 0?e:null,props:r}}return o.Fragment=n,o.jsx=u,o.jsxs=u,o}var d;function m(){return d||(d=1,l.exports=h()),l.exports}var t=m();function R(){const[s,n]=p.useState(0);return t.jsxs("div",{className:"p-4 bg-white rounded-lg shadow-md",children:[t.jsx("h2",{className:"text-xl font-bold mb-4 text-blue-600",children:"React カウンター"}),t.jsxs("p",{className:"mb-4",children:["カウント: ",t.jsx("span",{className:"font-bold text-lg",children:s})]}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("button",{onClick:()=>n(s+1),className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",children:"増加"}),t.jsx("button",{onClick:()=>n(s-1),className:"px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors",children:"減少"}),t.jsx("button",{onClick:()=>n(0),className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors",children:"リセット"})]})]})}export{R as default};
