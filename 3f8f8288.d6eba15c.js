(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{78:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return o})),t.d(n,"default",(function(){return s}));var r=t(4),a=t(8),i=(t(0),t(94)),l={id:"slider",title:"Slider",subtitle:"\u6ed1\u52a8\u6761"},c={unversionedId:"slider",id:"slider",isDocsHomePage:!1,title:"Slider",description:"\u7528\u4e8e\u5728\u7ed9\u5b9a\u7684\u4e00\u4e2a\u6570\u503c\u533a\u95f4\u4e2d\u9009\u62e9\u67d0\u4e2a\u6570\u503c\u3002",source:"@site/docs/slider.md",slug:"/slider",permalink:"/docs/slider",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/slider.md",version:"current",sidebar:"docs",previous:{title:"CheckBox",permalink:"/docs/checkbox"},next:{title:"TextBox",permalink:"/docs/textbox"}},o=[{value:"\u7981\u7528",id:"\u7981\u7528",children:[]},{value:"\u65b9\u5411",id:"\u65b9\u5411",children:[]},{value:"\u533a\u95f4",id:"\u533a\u95f4",children:[]},{value:"\u591a\u6ed1\u5757",id:"\u591a\u6ed1\u5757",children:[]},{value:"\u4ea4\u4e92",id:"\u4ea4\u4e92",children:[]}],p={toc:o};function s(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u7528\u4e8e\u5728\u7ed9\u5b9a\u7684\u4e00\u4e2a\u6570\u503c\u533a\u95f4\u4e2d\u9009\u62e9\u67d0\u4e2a\u6570\u503c\u3002"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { Slider } from '@nami-ui/slider'\n\nexport default () => {\n  const [value, setValue] = useState(0)\n  return <Slider value={value} onChange={setValue} />\n}\n")),Object(i.b)("h2",{id:"\u7981\u7528"},"\u7981\u7528"),Object(i.b)("p",null,"\u901a\u8fc7\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"disabled")," \u5c5e\u6027\uff0c\u53ef\u4ee5\u8bbe\u7f6e\u6ed1\u52a8\u6761\u4e3a\u7981\u7528\u72b6\u6001\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { Slider } from '@nami-ui/slider'\n\nexport default () => <Slider disabled defaultValue={0} />\n")),Object(i.b)("h2",{id:"\u65b9\u5411"},"\u65b9\u5411"),Object(i.b)("p",null,"\u53ef\u80fd\u901a\u8fc7\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"vertical")," \u5c06\u6ed1\u52a8\u6761\u5207\u6362\u4e3a\u5782\u76f4\u65b9\u5411\uff0c\u6216\u8005\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"reverse")," \u6765\u5207\u6362\u4e3a\u53cd\u5411\u6ed1\u52a8\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { HStack, VStack } from '@nami-ui/stack'\nimport { Slider } from '@nami-ui/slider'\n\nexport default () => (\n  <HStack spacing>\n    <VStack spacing style={{ width: 100 }}>\n      <Slider />\n      <Slider reverse />\n    </VStack>\n\n    <Slider vertical />\n    <Slider vertical reverse />\n  </HStack>\n)\n")),Object(i.b)("h2",{id:"\u533a\u95f4"},"\u533a\u95f4"),Object(i.b)("p",null,"\u53ef\u4ee5\u901a\u8fc7\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"min"),"\u3001",Object(i.b)("inlineCode",{parentName:"p"},"max"),"\u3001",Object(i.b)("inlineCode",{parentName:"p"},"step")," \u53ca ",Object(i.b)("inlineCode",{parentName:"p"},"points")," \u6765\u5b9a\u5236\u6570\u503c\u533a\u95f4\uff0c\u9ed8\u8ba4\u4e3a ",Object(i.b)("inlineCode",{parentName:"p"},"{ min: 0, max: 1 }"),"\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { Slider } from '@nami-ui/slider'\n\nexport default () => (\n  <div>\n    <label>min: 0, max: 100</label>\n    <Slider min={0} max={100} />\n\n    <label>min: 0, max: 100, step: 10</label>\n    <Slider min={0} max={100} step={10} />\n\n    <label>\n      min: 0, max: 100, points: 0, 27, 38, 56, 72, 94\n    </label>\n    <Slider\n      min={0}\n      max={100}\n      points={[0, 27, 38, 56, 72, 94]}\n    />\n\n    <label>\n      min: 0, max: 100, step: 10, points: 0, 27, 38, 56, 72,\n      94\n    </label>\n    <Slider\n      min={0}\n      max={100}\n      step={10}\n      points={[0, 27, 38, 56, 72, 94]}\n    />\n  </div>\n)\n")),Object(i.b)("p",null,"\u53e6\u5916\uff0c\u53ef\u4ee5\u901a\u8fc7\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"marks")," \u6765\u663e\u793a step \u548c points \u5bf9\u5e94\u7684\u70b9\u4f4d\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { Slider } from '@nami-ui/slider'\n\nexport default () => (\n  <Slider\n    min={0}\n    max={100}\n    step={10}\n    points={[0, 27, 38, 56, 72, 94]}\n    marks\n  />\n)\n")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"marks")," \u53ef\u4ee5\u914d\u7f6e\u4ec5\u663e\u793a step \u5bf9\u5e94\u7684\u70b9\u4f4d\uff0c\u6216\u4ec5\u663e\u793a points \u7684\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},'import { Slider } from \'@nami-ui/slider\'\n\nexport default () => (\n  <div>\n    <label>marks: step</label>\n    <Slider\n      min={0}\n      max={100}\n      step={10}\n      points={[0, 27, 38, 56, 72, 94]}\n      marks="step"\n    />\n\n    <label>marks: points</label>\n    <Slider\n      min={0}\n      max={100}\n      step={10}\n      points={[0, 27, 38, 56, 72, 94]}\n      marks="points"\n    />\n  </div>\n)\n')),Object(i.b)("p",null,"\u4ee5\u53ca\u5982\u679c\u9700\u8981\u7684\u8bdd\uff0c\u8fd8\u53ef\u4ee5\u901a\u8fc7\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"pointMarkLabel")," \u6765\u5b9a\u5236 point \u70b9\u4f4d\u4e0b\u7684\u6807\u7b7e\u5185\u5bb9\u53ca\u6837\u5f0f\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import clsx from 'clsx'\nimport { Slider } from '@nami-ui/slider'\n\nexport default () => (\n  <Slider\n    min={0}\n    max={100}\n    points={[0, 27, 38, 56, 72, 94]}\n    pointMarkLabel={PointLabel}\n  />\n)\n\nfunction PointLabel({\n  value,\n  active,\n  className,\n  ...otherProps\n}) {\n  const props = {\n    ...otherProps,\n    className: clsx('point-label', { active }, className),\n  }\n\n  return <span {...props}>{value}\xb0C</span>\n}\n")),Object(i.b)("h2",{id:"\u591a\u6ed1\u5757"},"\u591a\u6ed1\u5757"),Object(i.b)("p",null,"\u6839\u636e\u6ed1\u5757\u6570\u91cf\u7684\u4e0d\u540c\uff0c\u901a\u5e38\u6ed1\u52a8\u6761\u53ef\u4ee5\u5206\u4e3a\u4e09\u79cd\u7c7b\u578b\uff1a"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"\u5355\u6ed1\u5757\u6ed1\u52a8\u6761\uff0c\u4ec5\u6709\u4e00\u4e2a\u6ed1\u5757\uff1b"),Object(i.b)("li",{parentName:"ul"},"\u53cc\u6ed1\u5757\u6ed1\u52a8\u6761\uff0c\u4ec5\u6709\u4e24\u4e2a\u6ed1\u5757\uff1b"),Object(i.b)("li",{parentName:"ul"},"\u591a\u6ed1\u5757\u6ed1\u52a8\u6761\uff0c\u6709\u4e09\u4e2a\u6216\u4e09\u4e2a\u4ee5\u4e0a\u6ed1\u5757\u3002")),Object(i.b)("p",null,"\u8fd9\u6839\u636e\u6240\u4f20\u5165\u503c\u7684\u6570\u91cf\u6765\u51b3\u5b9a\uff0c\u6bd4\u5982\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { Slider } from '@nami-ui/slider'\n\nexport default () => (\n  <div>\n    <Slider defaultValue={[0]} /> // or: single 0\n    <Slider defaultValue={[0, 1]} />\n    <Slider defaultValue={[0, 0.5, 1]} />\n  </div>\n)\n")),Object(i.b)("p",null,"\u901a\u5e38\u60c5\u51b5\u4e0b\uff0c\u5728\u5355\u6ed1\u5757\u6ed1\u52a8\u6761\u53ca\u53cc\u6ed1\u5757\u6ed1\u52a8\u6761\u4e2d\uff0c\u7528\u6237\u6240\u9009\u7684\u90fd\u662f\u4e00\u4e2a\u533a\u95f4\u503c\uff0c\u6bd4\u5982\u5728\u5355\u6ed1\u5757\u6ed1\u52a8\u6761\u4e2d\uff0c\u6240\u9009\u533a\u95f4\u4e3a ",Object(i.b)("inlineCode",{parentName:"p"},"[\u8d77\u59cb\u503c\uff0c\u9009\u4e2d\u503c]"),"\uff0c\u800c\u5728\u53cc\u6ed1\u5757\u6ed1\u52a8\u6761\u4e2d\uff0c\u5219\u4e3a ",Object(i.b)("inlineCode",{parentName:"p"},"[\u5de6\u4fa7\u9009\u4e2d\u503c\uff0c\u53f3\u4fa7\u9009\u4e2d\u503c]"),"\uff0c\u800c\u4e14\u6709\u65f6\u6211\u4eec\u4f1a\u5e0c\u671b\u5728 UI \u4e0a\u9ad8\u4eae\u6240\u9009\u533a\u95f4\uff0c\u800c\u8fd9\u53ef\u4ee5\u901a\u8fc7\u8bbe\u7f6e ",Object(i.b)("inlineCode",{parentName:"p"},"range")," \u5c5e\u6027\u6765\u5b9e\u73b0\uff1a"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-jsx",metastring:"reactView",reactView:!0},"import { Slider } from '@nami-ui/slider'\n\nexport default () => (\n  <div>\n    <Slider defaultValue={0} range />\n    <Slider defaultValue={[0, 1]} range />\n  </div>\n)\n")),Object(i.b)("p",null,"range \u5c5e\u6027\u4ec5\u5728\u5355\u6ed1\u5757\u6216\u53cc\u6ed1\u5757\u65f6\u6709\u6548\uff0c\u800c\u5728\u591a\u6ed1\u5757\u6ed1\u52a8\u6761\u4e2d\uff0c\u8be5\u5c5e\u6027\u56fa\u5b9a\u4e3a false\u3002"),Object(i.b)("p",null,"\u53e6\u5916\u8fd8\u8bf7\u6ce8\u610f\uff0c\u5728\u53cc\u6ed1\u5757\u4e2d\u5f00\u542f ",Object(i.b)("inlineCode",{parentName:"p"},"range")," \u5c5e\u6027\u540e\uff0c\u6240\u4f20\u5165\u7684\u503c\u5e94\u5f53\u662f\u6709\u5e8f\u7684\uff0c\u5f53\u7136 ",Object(i.b)("inlineCode",{parentName:"p"},"onChange")," \u4e8b\u4ef6\u4e2d\u8fd4\u56de\u7684\u503c\u4e5f\u4f1a\u662f\u6709\u5e8f\u7684\u3002"),Object(i.b)("h2",{id:"\u4ea4\u4e92"},"\u4ea4\u4e92"),Object(i.b)("p",null,"\u8be5\u6ed1\u52a8\u6761\u7ec4\u4ef6\u9664\u652f\u6301\u6307\u9488\uff08\u9f20\u6807\u3001\u624b\u6307\uff09\u62d6\u62fd\u4e4b\u5916\uff0c\u8fd8\u652f\u6301\u6eda\u8f6e\u53ca\u5feb\u6377\u952e\uff08\u4ec5\u5f53\u7ec4\u4ef6\u83b7\u53d6\u5230\u7126\u70b9\u65f6\u652f\u6301\uff09\u3002"))}s.isMDXComponent=!0},94:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return u}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=a.a.createContext({}),s=function(e){var n=a.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},b=function(e){var n=s(e.components);return a.a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},m=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),b=s(t),m=r,u=b["".concat(l,".").concat(m)]||b[m]||d[m]||i;return t?a.a.createElement(u,c(c({ref:n},p),{},{components:t})):a.a.createElement(u,c({ref:n},p))}));function u(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=m;var c={};for(var o in n)hasOwnProperty.call(n,o)&&(c[o]=n[o]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var p=2;p<i;p++)l[p]=t[p];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);