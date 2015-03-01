angular.module("jig",["ngStorage"]),angular.module("jig").service("jig-util",function(){var e=this;this.modelKeyIndex=function(e){var t=e.prop("tagName").toLowerCase(),r="input"==t?"["+e.attr("type")+"]":"",n=e.attr("jig-text")||e.attr("jig-placeholder"),i=n.split(".").slice(1)[0];return[t+r,i].join(".")},this.modelKey=function(t,r){return e.modelKeyIndex(t)+"."+r}}),angular.module("jig").directive("jigRig",["$compile","jig-util",function(e,t){return{restrict:"E",templateUrl:"templates/jig-rig.html",transclude:!0,link:function(r,n){var i=n.prev().prev();i.prop("tagName")||n.parent().prev().prev();var l=t.modelKeyIndex(i);r.modelKeys[l].forEach(function(t){n.prepend(e("<jig-edit modelKey="+t+">")(r))})}}}]),angular.module("jig").directive("jigEdit",["jig-util",function(){return{restrict:"E",templateUrl:"templates/jig-edit.html",scope:!0,link:function(e,t,r){var n=r.modelkey.valueOf();e.modelKey=function(){return n}}}}]),angular.module("jig").directive("jiggerable",["$compile","jig-util","$sce",function(e,t,r){return{restrict:"A",transclude:!0,scope:!0,template:"",link:function(n,i,l){var a=t.modelKeyIndex(i,n.doc.body.valueOf());n.modelKeys[a]=[],n.htmlContent=function(){return r.trustAsHtml(n.doc.model[a+".text"])},n.textContent=function(){return n.doc.model[a+".text"]},angular.forEach(Object.keys(l).filter(function(e){return 0==e.indexOf("jig")&&"jiggerable"!=e}),function(e){e=l[e],n.modelKeys[a].push(e)}),i.addClass("jigger-rigged"),i.after(e("<jig-rig>")(n));var o=angular.element("<i></i>").addClass("fa fa-pencil jigger-edit");o.click(function(e){var t=angular.element(e.target);t.closest("jig-rig").addClass("anim").addClass("anim-open"),t.off("click"),t.addClass("hide")}),i.after(o)}}}]),angular.module("jig").factory("jigger-factory",["$http",function(){var e={};return e.appRootURI="http://jig.herokuapp.com/",e.generateDoc=function(t){return $.ajax({type:"POST",url:e.appRootURI+"jigger/",data:{url:t}})},e}]),angular.module("jig").controller("jigger-controller",["$scope","jigger-factory","$sce","$compile","$localStorage",function(e,t,r,n,i){e.beginEditing=function(e){var t=angular.element(e.target),r=t.next("jig-rig");r=r.length>0?r:t.parent().next("jig-rig"),r.addClass("anim anim-open"),t.addClass("hide"),t.off("click")},e.endEditing=function(t){var r=angular.element(t.target),n=r.parent().removeClass("anim-open").removeClass("anim").prev(".jigger-edit").removeClass("hide");n.click(e.beginEditing),console.warn("Update localstorage"),i[e.currentUrl]=e.doc.model},e.currentUrl="http://bettermotherfuckingwebsite.com",e._genDoc=function(l){t.generateDoc(l).done(function(t){e.doc=t,e.doc.body=r.trustAsHtml(e.doc.body),i[e.currentUrl]?e.doc.model=i[e.currentUrl]:i[e.currentUrl]=e.doc.model,e.$apply(),n(angular.element("#jigger-doc").contents())(e),$(".jigger-edit").click(e.beginEditing)})},i["jig-currentUrl"]&&(e.currentUrl=i["jig-currentUrl"]),e.switchSite=function(t){e.currentUrl=angular.element(t.target).prev().val(),i["jig-currentUrl"]=e.currentUrl,e._genDoc(e.currentUrl)},e.modelKeys={},e.compiled="loading...",e._genDoc(e.currentUrl)}]);