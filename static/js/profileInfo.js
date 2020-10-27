var next = "0";
var s = true;
var id;
$(document).ready(function(){
    const username = "_the_grapher__";
    $.get('https://www.instagram.com/'+username+'/?__a=1', function(data, status){
         if(status == 'success'){
                id = data.graphql.user.id;
                if(data.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page){
                    next = data.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor;
                }else{
                    next = "1";
                }
             var profileParent = document.getElementsByClassName("profile-info-container")[0];
             
             var pt = document.querySelector('#profile-info');
             
             pt.content.querySelector('.profile-img').src = data.graphql.user.profile_pic_url_hd;
             pt.content.querySelector('.profile-img').alt = data.graphql.user.username + " Profile Picture Instagram";
             pt.content.querySelector('.profile-uname').textContent = "@" + data.graphql.user.username;
             pt.content.querySelector('.profile-fname').textContent = data.graphql.user.full_name; 
             pt.content.querySelector('#downloader').dataset.url = data.graphql.user.profile_pic_url_hd; 

             pt.content.querySelector('.bio').textContent = data.graphql.user.biography.replace("↵", "test");
             
             var pclone = document.importNode(pt.content, true);
             profileParent.appendChild(pclone);

             
             const timeline_media = data.graphql.user.edge_owner_to_timeline_media;
             
             var parent = document.getElementById('posts-feed'); 
             parent.innerHTML = "";
             const dv = document.createElement('div');
             dv.className="posts";
             for(var i=0; i<timeline_media.edges.length; i++){
                 const a = document.createElement('a');
                 a.className="post";
                 a.href='/media/'+timeline_media.edges[i].node.shortcode+'/';
                 
                 const pdv = document.createElement('div');
                 pdv.className="postdv";
                 
                 const img = document.createElement('img');
                 img.src = timeline_media.edges[i].node.thumbnail_src;
                 img.loading = "lazy";
                 
                 pdv.appendChild(img);
                 a.appendChild(pdv)
                 dv.appendChild(a);
                 
             }
             parent.appendChild(dv);
             
             var sparent = document.getElementById('stories-feed'); 
             sparent.innerHTML = "";
             for(var i=0; i<timeline_media.edges.length; i++){
                 const img = document.createElement('img');
                 img.src = data.graphql.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_src;
                 img.loading = "lazy";
                 sparent.appendChild(img);
             }
         }
});
});

$('#right-button').click(function() {
  event.preventDefault();
  $('#stories-feed').animate({
    scrollLeft: "+=200px"
  }, "fast");    
});
 $('#left-button').click(function() {
  event.preventDefault();
  $('#stories-feed').animate({
    scrollLeft: "-=200px"
  }, "fast");
});
/*
window.onscroll = function(ev) {
    
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 700) && s) {
        s=false;
        const url = "https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables={\"id\":\""+id+"\",\"first\":12,\"after\":\""+next+"\"}";
        $.get(url, function(data, status){
         if(status == 'success' && next!="1"){
             
             const timeline_media = data.data.user.edge_owner_to_timeline_media;
             
             var parent = document.getElementById('posts-feed'); 
             const dv = document.createElement('div');
             dv.className="posts";
             for(var i=0; i<timeline_media.edges.length; i++){
                 const a = document.createElement('a');
                 a.className="post";
                 a.href='/media/'+timeline_media.edges[i].node.shortcode;
                 
                 const pdv = document.createElement('div');
                 pdv.className="postdv";
                 
                 const img = document.createElement('img');
                 img.src = timeline_media.edges[i].node.thumbnail_src;
                 img.loading = "lazy";
                 
                 pdv.appendChild(img);
                 a.appendChild(pdv)
                 dv.appendChild(a);
                 
             }
             parent.appendChild(dv);
             s=true;
            if(timeline_media.page_info.has_next_page){
                    next = timeline_media.page_info.end_cursor;
                }else{
                    next = "1";///todo
                }
    }
            
});
    }
};
*/