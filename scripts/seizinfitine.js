/*
	--------------------------------
	Infinite Scroll
	--------------------------------
	+ https://github.com/paulirish/infinitescroll
	+ version 2.0b2.120311
	+ Copyright 2011 Paul Irish & Luke Shumard
	+ Licensed under the MIT license
	
	+ Documentation: http://infinite-scroll.com/
	
*/

(function(a,b,c){b.infinitescroll=function f(a,c,d){this.element=b(d);if(!this._create(a,c)){this.failed=true}};b.infinitescroll.defaults={loading:{finished:c,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"http://www.infinite-scroll.com/loading.gif",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:"fast",start:c},state:{isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,currPage:1},callback:c,debug:false,behavior:c,binder:b(a),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:c,dataType:"html",appendCallback:true,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:c,path:c};b.infinitescroll.prototype={_binding:function g(a){var b=this,d=b.options;d.v="2.0b2.111027";if(!!d.behavior&&this["_binding_"+d.behavior]!==c){this["_binding_"+d.behavior].call(this);return}if(a!=="bind"&&a!=="unbind"){this._debug("Binding value  "+a+" not valid");return false}if(a=="unbind"){this.options.binder.unbind("smartscroll.infscr."+b.options.infid)}else{this.options.binder[a]("smartscroll.infscr."+b.options.infid,function(){b.scroll()})}this._debug("Binding",a)},_create:function h(a,d){var e=b.extend(true,{},b.infinitescroll.defaults,a);if(!this._validate(a)){return false}this.options=e;var f=b(e.nextSelector).attr("href");if(!f){this._debug("Navigation selector not found");return false}e.path=this._determinepath(f);e.contentSelector=e.contentSelector||this.element;e.loading.selector=e.loading.selector||e.contentSelector;e.loading.msg=b('<div id="infscr-loading"><img alt="Loading..." src="'+e.loading.img+'" /><div>'+e.loading.msgText+"</div></div>");(new Image).src=e.loading.img;e.pixelsFromNavToBottom=b(document).height()-b(e.navSelector).offset().top;e.loading.start=e.loading.start||function(){b(e.navSelector).hide();e.loading.msg.appendTo(e.loading.selector).show(e.loading.speed,function(){beginAjax(e)})};e.loading.finished=e.loading.finished||function(){e.loading.msg.fadeOut("normal")};e.callback=function(a,f){if(!!e.behavior&&a["_callback_"+e.behavior]!==c){a["_callback_"+e.behavior].call(b(e.contentSelector)[0],f)}if(d){d.call(b(e.contentSelector)[0],f,e)}};this._setup();return true},_debug:function i(){if(this.options&&this.options.debug){return a.console&&console.log.call(console,arguments)}},_determinepath:function j(a){var b=this.options;if(!!b.behavior&&this["_determinepath_"+b.behavior]!==c){this["_determinepath_"+b.behavior].call(this,a);return}if(!!b.pathParse){this._debug("pathParse manual");return b.pathParse(a,this.options.state.currPage+1)}else if(a.match(/^(.*?)\b2\b(.*?$)/)){a=a.match(/^(.*?)\b2\b(.*?$)/).slice(1)}else if(a.match(/^(.*?)2(.*?$)/)){if(a.match(/^(.*?page=)2(\/.*|$)/)){a=a.match(/^(.*?page=)2(\/.*|$)/).slice(1);return a}a=a.match(/^(.*?)2(.*?$)/).slice(1)}else{if(a.match(/^(.*?page=)1(\/.*|$)/)){a=a.match(/^(.*?page=)1(\/.*|$)/).slice(1);return a}else{this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");b.state.isInvalidPage=true}}this._debug("determinePath",a);return a},_error:function k(a){var b=this.options;if(!!b.behavior&&this["_error_"+b.behavior]!==c){this["_error_"+b.behavior].call(this,a);return}if(a!=="destroy"&&a!=="end"){a="unknown"}this._debug("Error",a);if(a=="end"){this._showdonemsg()}b.state.isDone=true;b.state.currPage=1;b.state.isPaused=false;this._binding("unbind")},_loadcallback:function l(d,e){var f=this.options,g=this.options.callback,h=f.state.isDone?"done":!f.appendCallback?"no-append":"append",i;if(!!f.behavior&&this["_loadcallback_"+f.behavior]!==c){this["_loadcallback_"+f.behavior].call(this,d,e);return}switch(h){case"done":this._showdonemsg();return false;break;case"no-append":if(f.dataType=="html"){e="<div>"+e+"</div>";e=b(e).find(f.itemSelector)}break;case"append":var j=d.children();if(j.length==0){return this._error("end")}i=document.createDocumentFragment();while(d[0].firstChild){i.appendChild(d[0].firstChild)}this._debug("contentSelector",b(f.contentSelector)[0]);b(f.contentSelector)[0].appendChild(i);e=j.get();break}f.loading.finished.call(b(f.contentSelector)[0],f);if(f.animate){var k=b(a).scrollTop()+b("#infscr-loading").height()+f.extraScrollPx+"px";b("html,body").animate({scrollTop:k},800,function(){f.state.isDuringAjax=false})}if(!f.animate)f.state.isDuringAjax=false;g(this,e)},_nearbottom:function m(){var d=this.options,e=0+b(document).height()-d.binder.scrollTop()-b(a).height();if(!!d.behavior&&this["_nearbottom_"+d.behavior]!==c){return this["_nearbottom_"+d.behavior].call(this)}this._debug("math:",e,d.pixelsFromNavToBottom);return e-d.bufferPx<d.pixelsFromNavToBottom},_pausing:function n(a){var b=this.options;if(!!b.behavior&&this["_pausing_"+b.behavior]!==c){this["_pausing_"+b.behavior].call(this,a);return}if(a!=="pause"&&a!=="resume"&&a!==null){this._debug("Invalid argument. Toggling pause value instead")}a=a&&(a=="pause"||a=="resume")?a:"toggle";switch(a){case"pause":b.state.isPaused=true;break;case"resume":b.state.isPaused=false;break;case"toggle":b.state.isPaused=!b.state.isPaused;break}this._debug("Paused",b.state.isPaused);return false},_setup:function o(){var a=this.options;if(!!a.behavior&&this["_setup_"+a.behavior]!==c){this["_setup_"+a.behavior].call(this);return}this._binding("bind");return false},_showdonemsg:function p(){var a=this.options;if(!!a.behavior&&this["_showdonemsg_"+a.behavior]!==c){this["_showdonemsg_"+a.behavior].call(this);return}a.loading.msg.find("img").hide().parent().find("div").html(a.loading.finishedMsg).animate({opacity:1},2e3,function(){b(this).parent().fadeOut("normal")});a.errorCallback.call(b(a.contentSelector)[0],"done")},_validate:function q(a){for(var c in a){if(c.indexOf&&c.indexOf("Selector")>-1&&b(a[c]).length===0){this._debug("Your "+c+" found no elements.");return false}}return true},bind:function r(){this._binding("bind")},destroy:function s(){this.options.state.isDestroyed=true;return this._error("destroy")},pause:function t(){this._pausing("pause")},resume:function u(){this._pausing("resume")},retrieve:function v(a){var d=this,e=d.options,f=e.path,g,h,i,j,k,a=a||null,l=!!a?a:e.state.currPage;beginAjax=function m(a){a.state.currPage++;d._debug("heading into ajax",f);g=b(a.contentSelector).is("table")?b("<tbody/>"):b("<div/>");i=f.join(a.state.currPage);j=a.dataType=="html"||a.dataType=="json"?a.dataType:"html+callback";if(a.appendCallback&&a.dataType=="html")j+="+callback";switch(j){case"html+callback":d._debug("Using HTML via .load() method");g.load(i+" "+a.itemSelector,null,function c(a){d._loadcallback(g,a)});break;case"html":case"json":d._debug("Using "+j.toUpperCase()+" via $.ajax() method");b.ajax({url:i,dataType:a.dataType,complete:function e(a,b){k=typeof a.isResolved!=="undefined"?a.isResolved():b==="success"||b==="notmodified";k?d._loadcallback(g,a.responseText):d._error("end")}});break}};if(!!e.behavior&&this["retrieve_"+e.behavior]!==c){this["retrieve_"+e.behavior].call(this,a);return}if(e.state.isDestroyed){this._debug("Instance is destroyed");return false}e.state.isDuringAjax=true;e.loading.start.call(b(e.contentSelector)[0],e)},scroll:function w(){var a=this.options,b=a.state;if(!!a.behavior&&this["scroll_"+a.behavior]!==c){this["scroll_"+a.behavior].call(this);return}if(b.isDuringAjax||b.isInvalidPage||b.isDone||b.isDestroyed||b.isPaused)return;if(!this._nearbottom())return;this.retrieve()},toggle:function x(){this._pausing()},unbind:function y(){this._binding("unbind")},update:function z(a){if(b.isPlainObject(a)){this.options=b.extend(true,this.options,a)}}};b.fn.infinitescroll=function A(a,c){var d=typeof a;switch(d){case"string":var e=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"infinitescroll");if(!c){return false}if(!b.isFunction(c[a])||a.charAt(0)==="_"){return false}c[a].apply(c,e)});break;case"object":this.each(function(){var d=b.data(this,"infinitescroll");if(d){d.update(a)}else{d=new b.infinitescroll(a,c,this);if(!d.failed){b.data(this,"infinitescroll",d)}}});break}return this};var d=b.event,e;d.special.smartscroll={setup:function(){b(this).bind("scroll",d.special.smartscroll.handler)},teardown:function(){b(this).unbind("scroll",d.special.smartscroll.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartscroll";if(e){clearTimeout(e)}e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}};b.fn.smartscroll=function(a){return a?this.bind("smartscroll",a):this.trigger("smartscroll",["execAsap"])}})(window,jQuery);



/**
 * jQuery Masonry v2.1.04
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/(this.columnWidth+this.options.gutterWidth)),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);


(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);
