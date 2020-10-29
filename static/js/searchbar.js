

const searchInput = document.querySelector('#search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', function(k){
    
    setTimeout(function () {
     const input = searchInput.value;
     if(input!=''){
         $.get('https://www.instagram.com/web/search/topsearch/?context=blended&query='+input+'&count=10', function(data, status){
         if(status == 'success'){
             
            var parent = document.getElementsByClassName("suggestions")[0];
            parent.innerHTML = "";
             
            for(var i=0; i<data.users.length; i++){
                
                var t = document.querySelector('#mytemplate');
                
                
                t.content.querySelector('.suggestion-img').src = data.users[i].user.profile_pic_url;
                
                t.content.querySelector('.suggestion-uname').textContent= data.users[i].user.username;
                t.content.querySelector('.suggestion-uname').href = "profile.html"
    
                t.content.querySelector('.suggestion-fname').textContent= data.users[i].user.full_name;
                t.content.querySelector('.suggestion-fname').href = "profile.html"
                
                var clone = document.importNode(t.content, true);
                suggestions.appendChild(clone);
            }
         }
         });
      }else{
          document.getElementsByClassName("search-suggestions")[0].style.display = "block";
      }
        
    }, 500);
    
});

