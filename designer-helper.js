var Feeder={domain:"localhost:1337",seen:{},buffer:[],lastBufferLength:0,updateInterval:3e3,sinkInterval:1e3,init:function(e){this.domain=e;var t=this;setInterval(function(){t.update()},this.updateInterval),setInterval(function(){t.sink()},this.sinkInterval)},update:function(){var e=this,t=new XMLHttpRequest;t.open("GET","http://"+this.domain+"/feed/designer",!0);var n=function(){if(200==t.status){var n=JSON.parse(t.responseText);console.log("Got ",n.length,"tweets");for(var s=0;n.length>s;s++){var r=n[s];if(!e.seen.hasOwnProperty(r.id_str)){e.seen[r.id_str]=!0;var i=new CustomEvent("swagreceived");i.text=r.text,i.name=r.user.name,i.handle=r.user.screen_name,i.tweet=r,e.buffer.push(i)}}}else console.warn("Beiber feed request failure!",t)};t.addEventListener("load",n,!1),t.send(null)},sink:function(){for(var e,t=this.buffer.length/(this.updateInterval/this.sinkInterval),n=0;t>n;n++)e=this.buffer.pop(),setTimeout(function(e){return function(){document.dispatchEvent(e)}}(e),this.sinkInterval/t*n);this.lastBufferLength=this.buffer.length}};