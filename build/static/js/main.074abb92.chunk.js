(this.webpackJsonpadminpanel=this.webpackJsonpadminpanel||[]).push([[0],{16:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a(2),i=a.n(n),l=a(5),d=a.n(l),h=(a(16),a(4)),r=a.n(h),c=a(6),o=a(7),u=a(8),b=a(1),m=a(10),g=a(9),p=function(e){Object(m.a)(a,e);var t=Object(g.a)(a);function a(e){var s;return Object(o.a)(this,a),(s=t.call(this,e)).state={url:"",name:"",type:"",videodisabled:!0,imagedisabled:!0,fileselected:!1,imageselected:!1,showmessage:!1,displayusermessage:!1,usermessage:""},s.handleNameChange=s.handleNameChange.bind(Object(b.a)(s)),s.handleTypeChange=s.handleTypeChange.bind(Object(b.a)(s)),s.handleUrlChange=s.handleUrlChange.bind(Object(b.a)(s)),s.validate=s.validate.bind(Object(b.a)(s)),s.handleFileUpload=s.handleFileUpload.bind(Object(b.a)(s)),s}return Object(u.a)(a,[{key:"handleNameChange",value:function(e){this.setState({name:e.target.value})}},{key:"handleTypeChange",value:function(e){"Video"==e.target.value&&(this.setState({videodisabled:!1}),this.setState({imagedisabled:!0})),"Image"==e.target.value&&(this.setState({imagedisabled:!1}),this.setState({videodisabled:!0})),"Text"==e.target.value&&(this.setState({imagedisabled:!0}),this.setState({videodisabled:!0})),this.setState({type:e.target.value})}},{key:"handleUrlChange",value:function(e){this.setState({url:e.target.value})}},{key:"validate",value:function(){return!(!this.state.fileselected||""==this.state.name)&&(!(!this.state.videodisabled&&""==this.state.url)&&!(!this.state.imagedisabled&&!this.state.imageselected))}},{key:"handleFileUpload",value:function(){var e=Object(c.a)(r.a.mark((function e(t){var a,s,n,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),this.validate()){e.next=5;break}this.setState({showmessage:!0}),e.next=21;break;case 5:return this.setState({showmessage:!1}),console.log(t),a=new FormData,this.state.imagedisabled||a.append("image",this.uploadInput1.files[0]),a.append("file",this.uploadInput.files[0]),a.append("json",JSON.stringify({name:this.state.name,type:this.state.type,url:this.state.url})),t.preventDefault(),e.next=14,fetch("/submit",{method:"POST",body:a});case 14:return s=e.sent,e.next=17,s.json();case 17:n=e.sent,i=n.message,this.setState({usermessage:i}),this.setState({displayusermessage:!0});case 21:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(s.jsxs)("div",{children:[Object(s.jsxs)("form",{onSubmit:this.handleFileUpload,children:[Object(s.jsx)("input",{type:"file",id:"myfile",name:"myfile",ref:function(t){e.uploadInput=t},onChange:function(t){t.target.value.length&&e.setState({fileselected:!0})}}),Object(s.jsx)("label",{htmlFor:"name",children:"Enter lesson name: "}),Object(s.jsx)("input",{id:"name",type:"text",onChange:this.handleNameChange}),Object(s.jsx)("label",{htmlFor:"name",children:"Choose lesson type: "}),Object(s.jsxs)("select",{onChange:this.handleTypeChange,children:[Object(s.jsx)("option",{value:"Text",children:"Text"}),Object(s.jsx)("option",{value:"Image",children:"Image"}),Object(s.jsx)("option",{value:"Video",children:"Video"})]}),Object(s.jsx)("label",{htmlFor:"name",children:"Enter lesson url: "}),Object(s.jsx)("input",{id:"url",type:"text",disabled:this.state.videodisabled?"disabled":"",onChange:this.handleUrlChange}),Object(s.jsx)("label",{htmlFor:"name",children:"Upload Image"}),Object(s.jsx)("input",{type:"file",id:"myfile1",name:"myfile1",ref:function(t){e.uploadInput1=t},disabled:this.state.imagedisabled?"disabled":"",onChange:function(t){t.target.value.length&&e.setState({imageselected:!0})}}),Object(s.jsx)("button",{type:"submit",children:"Submit"})]}),this.state.showmessage?Object(s.jsx)("h2",{children:"Some of the required fields are missing"}):null,this.state.displayusermessage?Object(s.jsx)("h2",{children:this.state.usermessage}):null]})}}]),a}(n.Component),j=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,19)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,i=t.getLCP,l=t.getTTFB;a(e),s(e),n(e),i(e),l(e)}))};d.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(p,{})}),document.getElementById("root")),j()}},[[18,1,2]]]);
//# sourceMappingURL=main.074abb92.chunk.js.map