const searchInput = document.querySelector('#searchInput');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', function(k){

    setTimeout(function () {
     const input = searchInput.value;
     if(input!=''){
         document.getElementsByClassName("sug")[0].style.display = "block";
         var postS = false;
         var postV = "";
         if(input.trim().length == 11){
             postS = true;
             postV = input.trim();
         }

         else if(input.trim().split("/").length > 1){
             postS = true;
             postV = searchInput.value.trim().split("/").reverse()[1];
         }

         if(postS){
             console.log(postV);
             $.get('https://www.instagram.com/p/'+postV+'/?__a=1', function(data, status){
                if(status == 'success'){
                    var parent = document.getElementsByClassName("suggestions")[0];
                    parent.innerHTML = "";
                    const tn=data.graphql.shortcode_media.__typename;
                    switch(tn) {
                        case "GraphImage":
                            var el = document.createElement('img');
                            el.src = data.graphql.shortcode_media.display_url;
                            el.loading = "lazy";
                            parent.appendChild(el);
                            var btn = document.createElement('button');
                            btn.setAttribute("id", "downloader");
                            btn.innerHTML = "Download";
                            btn.dataset.url = data.graphql.shortcode_media.display_url;
                            parent.appendChild(btn);
                            break;
                        case "GraphVideo":
                            var el = document.createElement('video');
                            el.src = data.graphql.shortcode_media.video_url;
                            parent.appendChild(el);
                            var btn = document.createElement('button');
                            btn.setAttribute("id", "downloader");
                            btn.innerHTML = "Download";
                            btn.dataset.url = data.graphql.shortcode_media.video_url;
                            parent.appendChild(btn);
                            break;
                        break;
                        case "GraphSidecar":
                            const d= data.graphql.shortcode_media.edge_sidecar_to_children.edges;
                            for(var i=0; i<d.length; i++){
                               if(d[i].node.__typename == "GraphImage"){
                                   var el = document.createElement('img');
                                    el.src = d[i].node.display_url;
                                    el.loading = "lazy";
                                    parent.appendChild(el);
                                   var btn = document.createElement('button');
                                   btn.setAttribute("id", "downloader");
                                   btn.innerHTML = "Download";
                                    btn.dataset.url = d[i].node.display_url;
                                    parent.appendChild(btn);

                               }else{
                                   var el = document.createElement('video');
                                    el.src = d[i].node.video_url;
                                    parent.appendChild(el);
                                    var btn = document.createElement('button');
                                   btn.setAttribute("id", "downloader");
                                   btn.innerHTML = "Download";
                                    btn.dataset.url = d[i].node.video_url;
                                    parent.appendChild(btn);
                               }
                            } 
                        break;
                      }
                }
             });
         }


         $.get('https://www.instagram.com/web/search/topsearch/?context=blended&query='+input+'&count=10', function(data, status){
         if(status == 'success'){
            var parent = document.getElementsByClassName("suggestions")[0];
            parent.innerHTML = "";

            for(var i=0; i<data.users.length; i++){
                var t = document.querySelector('#mytemplate');
                t.content.querySelector('.suggestion-img').src = data.users[i].user.profile_pic_url;
                t.content.querySelector('.suggestion-uname').textContent= data.users[i].user.username;
                t.content.querySelector('.suggestion-uname').href = "/profile/" + data.users[i].user.username + "/";
                t.content.querySelector('.suggestion-fname').textContent= data.users[i].user.full_name;
                t.content.querySelector('.suggestion-fname').href = "/profile/" + data.users[i].user.username + "/";
                var clone = document.importNode(t.content, true);
                suggestions.appendChild(clone);
            }
         }
         });
          }else{
              document.getElementsByClassName("sug")[0].style.display = "none";
          }

    }, 500);

});
    
var menuBtn = document.getElementsByClassName("menu-btn")[0];
var menuBar = document.getElementsByClassName("menu-bar")[0];
var menuBox = document.getElementsByClassName("menu-box")[0];
var menuCls = document.getElementsByClassName("menu-close")[0];
var resClose = document.getElementById("res-close");

resClose.addEventListener("click", function(){
    searchInput.value = "";
    document.getElementsByClassName("sug")[0].style.display = "none";
});

menuBtn.addEventListener("click", ()=> {
    menuBar.classList.toggle("active");
    menuBox.classList.toggle("active");
});

menuCls.addEventListener("click", ()=> {
    menuBar.classList.toggle("active");
    menuBox.classList.toggle("active");
});

menuBox.addEventListener("click", ()=> {
    menuBar.classList.toggle("active");
    menuBox.classList.toggle("active");
});