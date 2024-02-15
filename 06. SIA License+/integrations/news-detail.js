

console.log("I'm the news details page");













const displayBlogPost = (blogPost)=>{

    console.log("I got in the function ");

    const blogContainer = document.getElementById('blogContainerId');

    blogContainer.innerHTML = '';


    console.log(blogContainer);
    console.log(blogPost);
    

    const blogPostItem = document.createElement('div')
    blogPostItem.className ="post-details";
    blogPostItem.innerHTML = `
    
    
    <span class="post-details__share open-popup" data-popup="social"><img src="assets/images/icons/black/love.svg" alt="" title=""/></span>
    <div class="post-details__date">${blogPost.publishDate}</div>
    <h2 class="post-details__title">${blogPost.postTitle}</h2>
    <div class="post-details__user">
        <img src="assets/images/photos/avatar.jpg" alt="" title=""/>
        <span>${blogPost.postAuthor} </span>
    </div>
    <div class="post-details__feat-image">
    <img src="${blogPost.postImageUrl}" alt="" title=""/>
    </div>

    <div class="post-details__entry mb-20">
        <!-- <p>An invasion of armies can be resisted, but not an idea whose time has come. People who have a creative side and do not live it out are most disagreeable clients. They make a mountain out of a molehill, fuss about unnecessary things, are too passionately in love with somebody who is not worth so much attention, and so on. </p>
        <blockquote>Learn from yesterday, live for today, hope for tomorrow. The important thing is to not stop questioning</blockquote>
        <h2>To live a creative life</h2>
        <p>There is a kind of floating charge of energy in them which is not attached to its right object and therefore tends to apply exaggerated dynamism to the wrong situation.</p> -->
        <!-- <ul class="custom-listing custom-listing--checked p-20">
            <li>Energy in them which is not attached</li>
            <li>Right object and therefore tends</li>
            <li>Evolution is the secret for the next step</li>
            <li>They make a mountain out of a molehill</li>
        </ul> -->
        <!-- <p>Let us be about setting high standards for life, love, creativity, and wisdom. When we are angry or depressed in our creativity.</p> -->

        ${blogPost.blogContent
        }
    </div>
    <div class="tabs tabs--style1 mb-20">
        <input type="radio" name="tabs2" class="tabs__radio" id="tab1" checked="checked">
        <label class="tabs__label tabs__label--12" for="tab1">Comments</label>	
        <div class="tabs__content">
            <h4>3 comments</h4>
            <ul class="comments">
                <li>
                    <span class="user-line"><img src="assets/images/photos/avatar.jpg" alt="" title=""/><span>Alexa Doe</span></span>
                    <p>Energy in them which is not attached</p>
                </li>
                <li>
                    <span class="user-line"><img src="assets/images/photos/avatar.jpg" alt="" title=""/><span>Clara Finne</span></span>
                    <p>Improvise. Become more creative. Not because you have to, but because you want to. </p>
                </li>
                <li>
                    <span class="user-line"><img src="assets/images/photos/avatar.jpg" alt="" title=""/><span>David Rogue</span></span>
                    <p>They make a mountain out of a molehill, fuss about unnecessary things, are too passionately in love with somebody </p>
                </li>
            </ul>
        </div>

        <input type="radio" name="tabs2" class="tabs__radio" id="tab2">
        <label class="tabs__label tabs__label--12" for="tab2">Leave a comment</label>
        <div class="tabs__content">
            <h4>Your comment</h4>
            <div class="form">
                <form id="Form" method="post" action="">
                    <div class="form__row">
                        <input type="text" name="Name" value="" class="form__input required" placeholder="Name" />
                    </div>
                    <div class="form__row">
                        <textarea name="TextArea" class="form__textarea required" placeholder="Comment"></textarea>
                    </div>	
                    <div class="form__row">
                        <div class="checkbox-simple">
                            <input type="checkbox" name="agree" id="agree" value="agree" checked /><label for="agree">Make my comment private</span></label>
                        </div>
                    </div>
                    <div class="form__row mt-20">
                        <input type="submit" name="submit" class="form__submit button button--blue button--full" id="submit" value="COMMENT" />
                    </div>
                </form>
            </div>
        </div> 
    </div>	   
    `;

    blogContainer.appendChild(blogPostItem);

}


















const querryParam = new URLSearchParams(window.location.search);
const encodedBlogPostObject = querryParam.get('blogPost');
if(encodedBlogPostObject){
    const decodedBlogPostObject = decodeURIComponent(encodedBlogPostObject);
    const blogPost = JSON.parse(decodedBlogPostObject);
    console.log("I'm the blog object : ", blogPost);
    displayBlogPost(blogPost);
}



// const displayBlogPost = (blogPost)=>{

//     console.log("I got in the function ");

//     const blogContainer = document.getElementById('blogContainerId');
    


//     const blogPostItem = document.createElement('div')
//     blogPostItem.className ='post-details';
//     blogPostItem.innerHTML = `
    
    
//     <span class="post-details__share open-popup" data-popup="social"><img src="assets/images/icons/black/love.svg" alt="" title=""/></span>
//     <div class="post-details__date">Sep. 26, 2020</div>
//     <h2 class="post-details__title">Creativity is breaking out of established patterns to look at things in a different way</h2>
//     <div class="post-details__user">
//         <img src="" alt="" title=""/>
//         <span>assets/images/photos/avatar.jpg</span>
//     </div>
//     <div class="post-details__feat-image">
//     <img src="${blogPost.postImageUrl}" alt="" title=""/>
//     </div>

//     <div class="post-details__entry mb-20">
//         <!-- <p>An invasion of armies can be resisted, but not an idea whose time has come. People who have a creative side and do not live it out are most disagreeable clients. They make a mountain out of a molehill, fuss about unnecessary things, are too passionately in love with somebody who is not worth so much attention, and so on. </p>
//         <blockquote>Learn from yesterday, live for today, hope for tomorrow. The important thing is to not stop questioning</blockquote>
//         <h2>To live a creative life</h2>
//         <p>There is a kind of floating charge of energy in them which is not attached to its right object and therefore tends to apply exaggerated dynamism to the wrong situation.</p> -->
//         <!-- <ul class="custom-listing custom-listing--checked p-20">
//             <li>Energy in them which is not attached</li>
//             <li>Right object and therefore tends</li>
//             <li>Evolution is the secret for the next step</li>
//             <li>They make a mountain out of a molehill</li>
//         </ul> -->
//         <!-- <p>Let us be about setting high standards for life, love, creativity, and wisdom. When we are angry or depressed in our creativity.</p> -->
//     </div>
//     <div class="tabs tabs--style1 mb-20">
//         <input type="radio" name="tabs2" class="tabs__radio" id="tab1" checked="checked">
//         <label class="tabs__label tabs__label--12" for="tab1">Comments</label>	
//         <div class="tabs__content">
//             <h4>3 comments</h4>
//             <ul class="comments">
//                 <li>
//                     <span class="user-line"><img src="assets/images/photos/avatar.jpg" alt="" title=""/><span>Alexa Doe</span></span>
//                     <p>Energy in them which is not attached</p>
//                 </li>
//                 <li>
//                     <span class="user-line"><img src="assets/images/photos/avatar.jpg" alt="" title=""/><span>Clara Finne</span></span>
//                     <p>Improvise. Become more creative. Not because you have to, but because you want to. </p>
//                 </li>
//                 <li>
//                     <span class="user-line"><img src="assets/images/photos/avatar.jpg" alt="" title=""/><span>David Rogue</span></span>
//                     <p>They make a mountain out of a molehill, fuss about unnecessary things, are too passionately in love with somebody </p>
//                 </li>
//             </ul>
//         </div>

//         <input type="radio" name="tabs2" class="tabs__radio" id="tab2">
//         <label class="tabs__label tabs__label--12" for="tab2">Leave a comment</label>
//         <div class="tabs__content">
//             <h4>Your comment</h4>
//             <div class="form">
//                 <form id="Form" method="post" action="">
//                     <div class="form__row">
//                         <input type="text" name="Name" value="" class="form__input required" placeholder="Name" />
//                     </div>
//                     <div class="form__row">
//                         <textarea name="TextArea" class="form__textarea required" placeholder="Comment"></textarea>
//                     </div>	
//                     <div class="form__row">
//                         <div class="checkbox-simple">
//                             <input type="checkbox" name="agree" id="agree" value="agree" checked /><label for="agree">Make my comment private</span></label>
//                         </div>
//                     </div>
//                     <div class="form__row mt-20">
//                         <input type="submit" name="submit" class="form__submit button button--blue button--full" id="submit" value="COMMENT" />
//                     </div>
//                 </form>
//             </div>
//         </div> 
//     </div>	   
//     `;

//     blogContainer.appendChild(blogPostItem);

// }