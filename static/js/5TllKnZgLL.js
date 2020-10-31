
var slideIndex = 1;

$(document).ready(function(){
     const media_link = "CG2SE-HDUGf";
    //var url = document.URL;
    //var parts = url.split('/');
    //var media_link = parts.pop() || parts.pop(); 
    $.get('https://www.instagram.com/p/'+media_link+'/?__a=1', function(data, status){
        if(status == 'success'){
            const tn=data.graphql.shortcode_media.__typename;
            const moi=data.graphql.shortcode_media.owner.profile_pic_url;
            const mou=data.graphql.shortcode_media.owner.username;
            const mon=data.graphql.shortcode_media.owner.full_name;
            const md=data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text;//the 0 problem
            const ms=data.graphql.shortcode_media.edge_media_preview_like.count;
            const mc=data.graphql.shortcode_media.edge_media_preview_comment.count;
            
            
            document.getElementById("mo-img").src=moi;
            document.getElementById("mou").innerHTML=mou;
            document.getElementById("mon").innerHTML=mon;
            document.getElementById("md").innerHTML=md;
            document.getElementById("ms").innerHTML=ms;
            document.getElementById("mc").innerHTML=mc;
            
            
            var mf=document.getElementsByClassName("media-file")[0];
            mf.innerHTML = "";
            
            switch(tn) {
                case "GraphImage":
                    var el = document.createElement('img');
                    el.className="media";
                    el.src=data.graphql.shortcode_media.display_url;
                    el.loading = "lazy";
                    el.alt = data.graphql.shortcode_media.accessibility_caption;
                    mf.appendChild(el);
                    break;
                case "GraphVideo":
                    var v = document.createElement ("video");
                    v.className= "media";
                    v.poster = data.graphql.shortcode_media.thumbnail_src;
                    //v.type = "video/mp4";
                    v.src = data.graphql.shortcode_media.video_url;
                    v.controls = true;
                    mf.appendChild(v);
                break;
                case "GraphSidecar":
                    document.getElementById("rl").style.display = "block";
                    document.getElementById("rb").style.display = "block";
                    const d= data.graphql.shortcode_media.edge_sidecar_to_children.edges;
                    for(var i=0; i<d.length; i++){
                       if(d[i].node.__typename == "GraphImage"){
                            var el = document.createElement('img');
                            el.className="media";
                            el.src=d[i].node.display_url;
                            el.loading = "lazy";
                            el.alt = d[i].node.accessibility_caption;
                            mf.appendChild(el);
                       }else{
                            var v = document.createElement ("video");
                            v.className= "media";
                            v.poster = d[i].node.display_url;
                            //v.type = "video/mp4";
                            v.src = d[i].node.video_url;
                            v.controls = true;
                            v.preload = "auto";
                            mf.appendChild(v);
                       }
                    } 
                break;
              }
            
            showSlides(slideIndex);
        }
        
    });
        
});




function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("media");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  document.getElementById('downloader').dataset.url = slides[slideIndex-1].src;
}


$('#downloader').click(function() { 
    console.log('clicked');
    var url = $(this).attr('data-url');
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response);
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
    };
    xhr.open('GET', url);
    xhr.send();
 });
