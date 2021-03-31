(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{91:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(27),c=n(97),i=n(23),r=n(129),l=n(138),o=n(3);var d=function(e){var t=e.metadata;return Object(o.jsxs)("nav",{className:"pagination-nav","aria-label":"Blog list page navigation",children:[Object(o.jsx)("div",{className:"pagination-nav__item",children:t.previous&&Object(o.jsxs)(l.a,{className:"pagination-nav__link",to:t.previous.permalink,children:[Object(o.jsx)("div",{className:"pagination-nav__sublabel",children:"Previous"}),Object(o.jsxs)("div",{className:"pagination-nav__label",children:["\xab ",t.previous.title]})]})}),Object(o.jsx)("div",{className:"pagination-nav__item pagination-nav__item--next",children:t.next&&Object(o.jsxs)(l.a,{className:"pagination-nav__link",to:t.next.permalink,children:[Object(o.jsx)("div",{className:"pagination-nav__sublabel",children:"Next"}),Object(o.jsxs)("div",{className:"pagination-nav__label",children:[t.next.title," \xbb"]})]})})]})},j=n(113);var b=function(){var e=Object(i.default)().siteConfig.title,t=Object(j.useActivePlugin)({failfast:!0}).pluginId,n=Object(c.useDocsPreferredVersion)(t).savePreferredVersionName,a=Object(j.useActiveVersion)(t),s=Object(j.useDocVersionSuggestions)(t),r=s.latestDocSuggestion,d=s.latestVersionSuggestion;if(!d)return Object(o.jsx)(o.Fragment,{});var b,m=null!=r?r:(b=d).docs.find((function(e){return e.id===b.mainDocId}));return Object(o.jsxs)("div",{className:"alert alert--warning margin-bottom--md",role:"alert",children:["current"===a.name?Object(o.jsxs)("div",{children:["This is unreleased documentation for ",e," ",Object(o.jsx)("strong",{children:a.label})," version."]}):Object(o.jsxs)("div",{children:["This is documentation for ",e," ",Object(o.jsx)("strong",{children:a.label}),", which is no longer actively maintained."]}),Object(o.jsxs)("div",{className:"margin-top--md",children:["For up-to-date documentation, see the"," ",Object(o.jsx)("strong",{children:Object(o.jsx)(l.a,{to:m.path,onClick:function(){return n(d.name)},children:"latest version"})})," ","(",d.label,")."]})]})},m=n(94);var O=function(e,t,n){var s=Object(a.useState)(void 0),c=s[0],i=s[1];Object(a.useEffect)((function(){function a(){var a=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=n}));if(t){if(t.getBoundingClientRect().top>=n){var a=e[e.indexOf(t)-1];return null!=a?a:t}return t}return e[e.length-1]}();if(a)for(var s=0,r=!1,l=document.getElementsByClassName(e);s<l.length&&!r;){var o=l[s],d=o.href,j=decodeURIComponent(d.substring(d.indexOf("#")+1));a.id===j&&(c&&c.classList.remove(t),o.classList.add(t),i(o),r=!0),s+=1}}return document.addEventListener("scroll",a),document.addEventListener("resize",a),a(),function(){document.removeEventListener("scroll",a),document.removeEventListener("resize",a)}}))},u=n(68),h=n.n(u);function v(e){var t=e.toc,n=e.isChild;return t.length?Object(o.jsx)("ul",{className:n?"":"table-of-contents table-of-contents__left-border",children:t.map((function(e){return Object(o.jsxs)("li",{children:[Object(o.jsx)("a",{href:"#"+e.id,className:"table-of-contents__link",dangerouslySetInnerHTML:{__html:e.value}}),Object(o.jsx)(v,{isChild:!0,toc:e.children})]},e.id)}))}):null}var x=function(e){var t=e.toc;return O("table-of-contents__link","table-of-contents__link--active",100),Object(o.jsx)("div",{className:Object(m.a)(h.a.tableOfContents,"thin-scrollbar"),children:Object(o.jsx)(v,{toc:t})})},g=n(8),f=n(69),p=n.n(f),N=function(e){var t=e.className,n=Object(g.a)(e,["className"]);return Object(o.jsx)("svg",Object.assign({fill:"currentColor",height:"1.2em",width:"1.2em",preserveAspectRatio:"xMidYMid meet",role:"img",viewBox:"0 0 40 40",className:Object(m.a)(p.a.iconEdit,t)},n,{children:Object(o.jsx)("g",{children:Object(o.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})}))},_=n(70),w=n.n(_);t.default=function(e){var t,n=Object(i.default)().siteConfig.url,a=e.content,l=a.metadata,O=a.frontMatter,u=O.image,h=O.keywords,v=O.hide_title,g=O.hide_table_of_contents,f=l.description,p=l.title,_=l.permalink,k=l.editUrl,y=l.lastUpdatedAt,C=l.lastUpdatedBy,L=Object(j.useActivePlugin)({failfast:!0}).pluginId,E=Object(j.useVersions)(L),I=Object(j.useActiveVersion)(L),A=E.length>1,S=Object(c.useTitleFormatter)(p),V=Object(r.a)(u,{absolute:!0});return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)(s.a,{children:[Object(o.jsx)("title",{children:S}),Object(o.jsx)("meta",{property:"og:title",content:S}),f&&Object(o.jsx)("meta",{name:"description",content:f}),f&&Object(o.jsx)("meta",{property:"og:description",content:f}),h&&h.length&&Object(o.jsx)("meta",{name:"keywords",content:h.join(",")}),u&&Object(o.jsx)("meta",{property:"og:image",content:V}),u&&Object(o.jsx)("meta",{name:"twitter:image",content:V}),u&&Object(o.jsx)("meta",{name:"twitter:image:alt",content:"Image for "+p}),_&&Object(o.jsx)("meta",{property:"og:url",content:n+_}),_&&Object(o.jsx)("link",{rel:"canonical",href:n+_})]}),Object(o.jsxs)("div",{className:"row",children:[Object(o.jsxs)("div",{className:Object(m.a)("col",(t={},t[w.a.docItemCol]=!g,t)),children:[Object(o.jsx)(b,{}),Object(o.jsxs)("div",{className:w.a.docItemContainer,children:[Object(o.jsxs)("article",{children:[A&&Object(o.jsx)("div",{children:Object(o.jsxs)("span",{className:"badge badge--secondary",children:["Version: ",I.label]})}),!v&&Object(o.jsx)("header",{children:Object(o.jsx)("h1",{className:w.a.docTitle,children:p})}),Object(o.jsx)("div",{className:"markdown",children:Object(o.jsx)(a,{})})]}),(k||y||C)&&Object(o.jsx)("div",{className:"margin-vert--xl",children:Object(o.jsxs)("div",{className:"row",children:[Object(o.jsx)("div",{className:"col",children:k&&Object(o.jsxs)("a",{href:k,target:"_blank",rel:"noreferrer noopener",children:[Object(o.jsx)(N,{}),"Edit this page"]})}),(y||C)&&Object(o.jsx)("div",{className:"col text--right",children:Object(o.jsx)("em",{children:Object(o.jsxs)("small",{children:["Last updated"," ",y&&Object(o.jsxs)(o.Fragment,{children:["on"," ",Object(o.jsx)("time",{dateTime:new Date(1e3*y).toISOString(),className:w.a.docLastUpdatedAt,children:new Date(1e3*y).toLocaleDateString()}),C&&" "]}),C&&Object(o.jsxs)(o.Fragment,{children:["by ",Object(o.jsx)("strong",{children:C})]}),!1]})})})]})}),Object(o.jsx)("div",{className:"margin-vert--lg",children:Object(o.jsx)(d,{metadata:l})})]})]}),!g&&a.toc&&Object(o.jsx)("div",{className:"col col--3",children:Object(o.jsx)(x,{toc:a.toc})})]})]})}}}]);