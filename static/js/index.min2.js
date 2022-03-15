require(["vue","layers"],function(Vue){var app=new Vue({el:"#app",data:{currentLinkId:0,isUnique:true,urlStr:"",threadNum:6,timeout:8,linkArr:[],finishStatus:false,dataCount:0,dataConfig:{valueList:{selector:"a",type:"text",attr:"",separator:"\n"}},dataResult:{urlArr:[],linkArr:[],valueListArr:[]}},methods:{getValueList:function(){if(""==this.dataConfig.valueList.selector){layer.msg("无效的选择器");return}if("attr"==this.dataConfig.valueList.type&&""==this.dataConfig.valueList.attr){layer.msg("无效的属性值");return}var self=this,dataArr=[];require(["jquery"],function($){var getValue=function(index){for(var i=index;i<self.linkArr.length;i++){console.log("i",i);var node=$(self.linkArr[i]["html"]).find(self.dataConfig.valueList.selector);for(var j=0;j<node.length;j++){if("attr"==self.dataConfig.valueList.type){var expression="$(node[j])."+self.dataConfig.valueList.type+'("'+self.dataConfig.valueList.attr+'")'}else{var expression="$(node[j])."+self.dataConfig.valueList.type+"()"}var value=$.trim(eval(expression));if("src"==self.dataConfig.valueList.attr||"href"==self.dataConfig.valueList.attr){value=self.handleRelativePath(value,self.linkArr[i]["url"])}if(0&&self.isUnique){if(-1==dataArr.indexOf(value)){dataArr.push(value)}}else{dataArr.push(value)}if(i<self.linkArr.length){setTimeout(function(){self.currentLinkId=i;getValue(1+i)},5)}}}};getValue(0);console.log("结束！");console.log(dataArr.length);self.dataResult.valueListArr=dataArr})},getAllUrl:function(){var self=this;if(0==this.linkArr.length){layer.msg("没有需要处理的数据");return}layer.msg("数据处理中，若数据过多可能可能需要点时间，请耐心等待！");var dataArr=[];for(var i=0;i<this.linkArr.length;i++){if(""!=this.linkArr[i]["html"]){var reg=/(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/gi;var urlArr=this.linkArr[i]["html"].match(reg);for(var j=0;j<urlArr.length;j++){if(self.isUnique){if(-1==dataArr.indexOf(urlArr[j])){dataArr.push(this.handleRelativePath(urlArr[j],this.linkArr[i]["url"]))}}else{dataArr.push(this.handleRelativePath(urlArr[j],this.linkArr[i]["url"]))}}}}this.dataResult.urlArr=dataArr},getAllLink:function(){var self=this;if(0==this.linkArr.length){layer.msg("没有需要处理的数据");return}layer.msg("数据处理中，若数据过多可能可能需要点时间，请耐心等待！");var dataArr=[];for(var i=0;i<this.linkArr.length;i++){if(""!=this.linkArr[i]["html"]){var reg=/<a[^>]*href[=\"\'\s]+([^\"\']*)[\"\']?[^>]*>/gi;var urlArr=this.linkArr[i]["html"].match(reg);for(var j=0;j<urlArr.length;j++){var tmp=urlArr[j].match(reg),newUrl=this.handleRelativePath(RegExp.$1,this.linkArr[i]["url"]);if(self.isUnique){if(-1==dataArr.indexOf(newUrl)){dataArr.push(newUrl)}}else{dataArr.push(newUrl)}}}}this.dataResult.linkArr=dataArr},handleRelativePath:function(url,host){if("http"==url.slice(0,4)){return url}var baseUrl=host.replace("//","##"),slashPos=baseUrl.indexOf("/"),newUrl="";baseUrl=-1==slashPos?baseUrl:baseUrl.slice(0,slashPos);if("/"==url.slice(0,1)){newUrl=baseUrl+url}else{newUrl=baseUrl+"/"+url}newUrl=newUrl.replace("//","/");newUrl=newUrl.replace("##","//");return newUrl},getTipWord:function(status){switch(status){case 0:return"队列中...";case 1:return"抓取中...";case 2:return"抓取完成";case 3:return"抓取失败";default:return"未知状态？"}},showDemo:function(){this.urlStr=decodeURIComponent("https%3A%2F%2Fuutool.cn%0Ahttps%3A%2F%2Fwww.hao123.com%2F");this.crawl()},importTxt:function(){document.querySelector("#filePicker").click()},exportTxt:function(){var self=this,dataArr=[];if(0==this.linkArr.length){layer.msg("没有需要下载的数据！");return}for(var i=0;i<this.linkArr.length;i++){dataArr.push(JSON.stringify(this.linkArr[i]))}require(["fileSaver"],function(){var blob=new Blob([dataArr.join("\n")],{type:"text/plain;charset=utf-8"});saveAs(blob,"网页数据.txt")})},exportFile:function(data,fileName){require(["fileSaver"],function(){var blob=new Blob([data.join("\n")],{type:"text/plain;charset=utf-8"});saveAs(blob,fileName+".txt")})},retry:function(index){this.linkArr[index]["status"]=0;this.linkArr[index]["html"]="";this.crawlUrl(index,false)},crawlUrl:function(i,isRetry){var self=this;if(undefined===isRetry){isRetry=true}(function(i,isRetry){if(self.linkArr.length<=i){var interval=setInterval(function(){var okNum=0,allCount=self.linkArr.length;for(var i=0;i<allCount;i++){if(0!=self.linkArr[i]["status"]&&1!=self.linkArr[i]["status"]){okNum+=1}}if(okNum==allCount){self.finishStatus=true;clearInterval(interval);if(0==self.dataCount){layer.alert("没有采集到数据，请确认是否已解除跨域限制！")}else{layer.msg("队列处理完成！",{icon:6})}}},200);return}var isFinish=true;for(var j=i;j<self.linkArr.length;j++){if(0==self.linkArr[j]["status"]){isFinish=false;self.linkArr[j]["status"]=1;var url=self.linkArr[j]["url"];if(isRetry){url+=("?v="+Math.random())}require(["text!"+url],function(html){self.linkArr[j]["status"]=2;self.linkArr[j]["html"]=html;self.dataCount+=html.length;if(isRetry){self.crawlUrl(j+1)}},function(){self.linkArr[j]["status"]=3;if(isRetry){self.crawlUrl(j+1)}});break}}})(i,isRetry)},crawl:function(){var self=this;if(""==this.urlStr){layer.msg("无效的链接列表！");return}this.linkArr=[];this.finishStatus=false;this.dataResult.urlArr=[];this.dataResult.linkArr=[];layer.msg("抓取已开始...");var arr=this.urlStr.split("\n"),linkArr=[];for(var i=0;i<arr.length;i++){var url=arr[i].replace(/(^s*)/g,"");if(""!=url){linkArr.push({url:url,html:"",status:0})}}this.linkArr=linkArr;for(var i=0;i<this.threadNum;i++){this.crawlUrl(i)}},init:function(){var self=this;var selectFile=function(e){var file=e.target.files[0];var reader=new FileReader();reader.onload=function(){var text=this.result,textArr=text.split("\n"),linkArr=[],dataCount=0;for(var i=0;i<textArr.length;i++){try{var arr=JSON.parse(textArr[i]);linkArr.push(arr);dataCount+=arr.html.length}catch(error){}}self.linkArr=linkArr;self.dataCount=dataCount;if(0==dataCount){layer.msg("没有找到任何数据，请选择正确的数据文件！")}else{self.finishStatus=true}};reader.readAsText(file)};var fileInput=document.getElementById("filePicker");fileInput.addEventListener("change",selectFile,false)}},mounted:function(){require.config({config:{text:{useXhr:function(){return true}}},waitSeconds:this.timeout});this.init()}})});