console.log("I'm in here ");











let paginationRequest = {
    "pageNumber": 1,
    "pageSize": 5
  }



document.addEventListener('DOMContentLoaded', function(){

 fetchAllActivePostFromBackend(paginationRequest);
 } )






const fetchAllActivePostFromBackend = (paginationRequest)=>{

    
    console.log("I'm the paginated request :", paginationRequest);
    
        fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/blog/allActiveBlogPosts?pageSize=${encodeURIComponent(paginationRequest.pageSize)}&pageNumber=${encodeURIComponent(paginationRequest.pageNumber)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then(response => {
            if (!response.ok) {
                console.log(response);
              throw new Error("Network Failed");
            }
            console.log("I'm the response from backend", response.data);
            return response.json();
          })
          .then(listOfBlogPost => {
            displayPaginatedListOfBlogs(listOfBlogPost);
            console.log("I'm the userList", listOfBlogPost);
          })
          .catch(error => {
            if(error.message){
                {toast(error.message, 4000)}
            }

            else{
                {toast('Network Failed ', 4000)}
            }
          });
    
      }

      
const displayPaginatedListOfBlogs = (listOfBlogs)=>{

    const listContainer = document.getElementById('listContainerId');


    listOfBlogs.forEach((blog, index )=> {


        const listItem =  document.createElement('div');
        listItem.className = 'post';
        listItem.innerHTML = `
                
                <div class="post__thumb">
                <a href="#"><img src="${blog.postImageUrl}" alt="" title=""/></a>
            </div>
            <div class="post__details">
            <h4 class="post__title"><a "#">${blog.postTitle}</a></h4>
            <a href="#" class="post__more button button--blue button--ex-small">READ IT</a>
            </div>
        `
        listContainer.appendChild(listItem);

        listItem.addEventListener('click', ()=>{
            console.log("I've been clicked ", index);
            const selectedBlogPost = listOfBlogs[index];
            const encodedBlogPost = encodeURIComponent(JSON.stringify(selectedBlogPost));
            const url = `news-detail.html?blogPost=${encodedBlogPost}`;
            window.location.href = url; 
            
        })
    });

}









