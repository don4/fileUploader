var selectDiv = "";
var dropDiv = "";
var Item ="";
var counter = 0;
var uploader= '<div id="loading"><span>Uploading </span><i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i></div>';
function $(el){
	return document.querySelector(el);
	}
document.addEventListener("DOMContentLoaded", startSelect, false);

function startSelect() {
		$('#file1').addEventListener('change', handleFileSelect, false);
		selectDiv = $('#list');
		dropDiv = $('#drop');
		dropDiv.addEventListener('dragover', dragFile, true);
        dropDiv.addEventListener('drop', dropFile, false);		
	}

function handleFileSelect(e) {		        
        if(!e.target.files || !window.FileReader) return;        
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
		
        filesArr.forEach(function(f) {
           
            if(!f.type.match("image.*")) {
                alert("File extention is invalid. Please upload a valid file with jpg/png/gif extensions");
                return false;
            }
		
            var reader = new FileReader();
            reader.onload = function (e) {
				counter++;
                   var html = '<div class="col-xs-6 col-sm-3 col-md-2 imgContainer" id="divimg'+counter+'"> <img class="image" src=\"' + e.target.result + '\"><div class="progressBar"><p class="status"></p></div><p class="name">' + f.name + '</p><span class="remove" id="img'+counter+'" onclick="deleteItem('+counter+')"><i class="fa fa-times-circle" aria-hidden="true"></i></span></div>';
                selectDiv.innerHTML += html;               
            }
			reader.readAsDataURL(f); 
			
        });
        uploadFile();
    }
/*==== Drag/Drop file start====*/	
function dragFile(e){
  $("#drop").style.backgroundColor="green";
  e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
  e.preventDefault();  
}
function dropFile(e){
  e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
  e.preventDefault();     
	 var files = e.dataTransfer.files;
	 var counter = 0;
    if (files) {        
            var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function(f) {           
            if(!f.type.match("image.*")) {
			alert("File extention is invalid. Please upload a valid file with jpg/png/gif extensions");
                return false;
            }
	
    var reader = new FileReader();
     reader.onload = function (e) {
		       counter++;
               var html = '<div class="col-xs-6 col-sm-3 col-md-2 imgContainer" id="divimg'+counter+'"> <img class="image" src=\"' + e.target.result + '\"><div class="progressBar"><p class="status"></p></div><p class="name">' + f.name + '</p><span class="remove" id="img'+counter+'" onclick="deleteItem('+counter+')"><i class="fa fa-times-circle" aria-hidden="true"></i></span></div>';
				selectDiv.innerHTML += html;				               
            }						
            reader.readAsDataURL(f);
			$("#drop").style.backgroundColor="#ffffff";
			
	});
    uploadFile();  
	 } 
}
/*==== Drag/Drop file end ====*/
function uploadFile(){
	var filedata = $('#file1');
	var formData = new FormData();
	var i = 0, len = filedata.files.length, file;
      for (i; i < len; i++) {
    file = filedata.files[i];
	formData.append("file[]", file);
	}	
	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.upload.addEventListener("progress" , progressHandler, false);
	ajaxRequest.addEventListener("load", completeHandler, false);
	ajaxRequest.addEventListener("error", errorHandler, false);
	ajaxRequest.addEventListener("abort", abortHandler, false);
	ajaxRequest.open("POST", "/");
	ajaxRequest.send(formData);
	this.on("complete", $('.remove').addEventListener('click', deleteItem, true));
	
	
}

function progressHandler(event){	
	$("#loadingText").innerHTML = uploader;
	var parcent = (event.loaded/event.total)*100;
	$(".progressBar").style.width= Math.round(parcent) + "%";
	$(".progressBar").style.backgroundColor= "#797979";
	$(".status").innerHTML = Math.round(parcent)+ "%";
	}
function completeHandler(event){
	var element = $("#loading");
	alert("uploading");
	element.parentNode.removeChild(element);	
	$(".progressBar").style.width= 100+ "%";
	$(".progressBar").style.backgroundColor= "#60C6BB";
	$(".status").innerHTML = 100 + "%";
	}
function errorHandler(event){
	$(".progressBar").style.width= Math.round(parcent) + "%";
	$(".progressBar").style.backgroundColor= "#797979";
	$(".status").innerHTML = Math.round(parcent)+ "%";
	}
function abortHandler(event){
	$(".progressBar").style.width= Math.round(parcent) + "%";
	$(".progressBar").style.backgroundColor= "#797979";
	$(".status").innerHTML = Math.round(parcent)+ "%";
	}

function deleteItem(e){
	var element = document.getElementById("divimg"+e);
	element.parentNode.removeChild(element);
	}