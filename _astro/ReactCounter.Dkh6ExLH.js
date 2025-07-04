import{r as c}from"./index.CVf8TyFT.js";var u={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x=c,p=Symbol.for("react.element"),m=Symbol.for("react.fragment"),f=Object.prototype.hasOwnProperty,b=x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function d(t,e,a){var r,s={},l=null,i=null;a!==void 0&&(l=""+a),e.key!==void 0&&(l=""+e.key),e.ref!==void 0&&(i=e.ref);for(r in e)f.call(e,r)&&!h.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:p,type:t,key:l,ref:i,props:s,_owner:b.current}}n.Fragment=m;n.jsx=d;n.jsxs=d;u.exports=n;var o=u.exports;function y(){const[t,e]=c.useState(0);return o.jsxs("div",{className:"p-4 bg-white rounded-lg shadow-md",children:[o.jsx("h2",{className:"text-xl font-bold mb-4 text-blue-600",children:"React カウンター"}),o.jsxs("p",{className:"mb-4",children:["カウント: ",o.jsx("span",{className:"font-bold text-lg",children:t})]}),o.jsxs("div",{className:"flex gap-2",children:[o.jsx("button",{onClick:()=>e(t+1),className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",children:"増加"}),o.jsx("button",{onClick:()=>e(t-1),className:"px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors",children:"減少"}),o.jsx("button",{onClick:()=>e(0),className:"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors",children:"リセット"})]})]})}export{y as default};
