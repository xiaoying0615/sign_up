<template>
<div class="t-image-upload"><slot></slot><input ref='input'type="file"class="t-upload-input":accept="accept":disabled="disabled"@click="inputClicked"@change="inputChanged"><ImageCrop ref="cropper"v-if="crop && showCrop"@on-crop="imageCroped"@on-cancel="imageCropCancel"></ImageCrop></div>
</template>

<script>
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('B t D\'./t\'B 6 D\'./6\'y a=\'\'16 8{1a:\'1c\',19:{t},18:{s:{4:k,17:v},1b:{4:k,8:\'d/11, d/1f, d/1g\'},H:{4:j,8:0.5,1e(i){f i<=1&&i>0}},O:{4:k,8:\'N\'},x:{4:I,8:g},E:{4:j},F:{4:j},m:{4:1d,8:()=>[]},15:{4:I,8:g}},Y(){f{l:g,7:\'\'}},Z:{C(){2.r.A.i=\'\'},13(e){y c=2.r.A.10[0]2.C()2.J()w(!6.1y(c,2.F)){2.U(c.1A)f}6.1x(c).u(9=>{a=9.a f 6.1v(9.h)}).u(d=>{2.G(6.1w(d,a,2.E,2.H))}).V(3=>{1C.M(3)2.R(1D 3===\'1t\'?3.1k(\'-\')[0]:\'1m\')})c=1i},G(h){w(2.x){2.l=v 2.n(()=>{2.r.1r.1s(h,a)})}1n 2.7=h},1o(7){2.7=7 2.z()},z(){2.l=g},1l(){2.e(\'o-X\')},U(T){2.e(\'o-1p\',T)},R(3){2.e(\'o-M\',3)},J(){2.e(\'b-1q\')},K(){2.e(\'b-1j\',2.7)},P(p){2.e(\'b-p\',p)},L(9){2.e(\'b-1h\',9)2.q()},S(3){2.e(\'b-1F\',3)2.q()},q(){2.e(\'b-1E\')}},1B:{7(){1u Q=6.1z(2.7,a)2.K()6.12({s:2.s,14:2.O,N:Q,m:2.m,W:e=>{2.P(e)}}).u(9=>{2.L(9)}).V(3=>{2.S(3)})}}}',62,104,'||this|err|type||ImageManager|imageDataUrl|default|res|mimeType|upload|imageFile|image||return|false|dataUrl|value|Number|String|showCrop|params||on|progress|uploadComplete||url|ImageCrop|then|true|if|crop|let|imageCropCancel|input|import|resetInput|from|maxWidth|maxSize|triggerCropper|quality|Boolean|uploadBefore|uploadStart|uploadSuccess|error|file|fileKeyName|uploadProgress|imageBlob|onError|uploadFail|fileSize|onOversize|catch|onProgress|click|data|methods|files|jpg|uploadImage|inputChanged|fileKey|disabled|export|required|props|components|name|accept|ImageUpload|Array|validator|jpeg|png|success|null|start|split|inputClicked|图片处理出错|else|imageCroped|oversize|before|cropper|setImageDataUrl|string|const|url2Image|compressImage|file2DataUrl|checkFileSize|base64Url2Blob|size|watch|console|typeof|complete|fail'.split('|'),0,{}))

</script>

<style scoped>
.t-image-upload {
  position: relative;
}

.t-upload-input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 999;
}
</style>