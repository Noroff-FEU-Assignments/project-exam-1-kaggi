let blogLink = document.querySelector( "#blog_link" );
blogLink.classList.add( "current_page" );

const postsURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/posts?_embed";

let offsetURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/posts?_embed&offset=";

const blogPosts = document.querySelector(".blog_posts");

let postTitle = "";
let postDate = "";
let postImageUrl = "";
let toPostUrl = "";
let postId = "";
let offset = 0;

const cards = document.querySelectorAll(".postCard");

let totalNumberOfPosts = 0;


let posts = new Array();

const showMore = document.querySelector(".show_more_link");


async function getPosts() {
    blogPosts.innerHTML = "Posts loading, please wait";

    try {

        const response = await fetch( postsURL );
        totalNumberOfPosts = response.headers.get("x-wp-total");
        posts = await response.json(); 
             
        console.log(totalNumberOfPosts);
       
        blogPosts.innerHTML = "";

        for( let i = 0; i < posts.length; i++) {
            postTitle = postTitle = posts[i].title.rendered;
            
            postDate = posts[i].date;
            
            let textDate = new Date(postDate).toLocaleDateString("en-GB");
            
            postImageUrl = posts[i]._embedded["wp:featuredmedia"][0].source_url;
            
            postId = posts[i].id;
            
            toPostUrl = `post.html?id=${postId}`;
            
            blogPosts.innerHTML += `<div class="postCard" id="${i}">
                                        <a href="${toPostUrl}">
                                        <h3>${postTitle}<h3>
                                        <img src="${postImageUrl}" alt="Featured image" class="postCardImage" />
                                        <p>${textDate}</p> </a>
                                      </div>   
                                     `;
                     
        }

        totalNumberOfPosts = totalNumberOfPosts - 10;
        offset = offset + 10;

        console.log(totalNumberOfPosts);
        console.log(offset);
        if ( totalNumberOfPosts > 0) {
            showMore.style.display = "block";
            offsetURL = offsetURL + offset;
            console.log(offsetURL);
        }
        else {
            showMore.style.display = "none";
        }
       
    }

    catch ( error ) {
        
        blogPosts.innerHTML = "An error occured loading posts";
    }
}

getPosts();


const showMoreLink = document.querySelector("#show_more_link");


showMoreLink.addEventListener("click", () => {
    getMorePosts();


})


async function getMorePosts () {

    try {
        const response = await fetch( offsetURL );
        posts = await response.json();

        for( let i = 0; i < posts.length; i++) {
            postTitle = postTitle = posts[i].title.rendered;
            
            postDate = posts[i].date;
            
            let textDate = new Date(postDate).toLocaleDateString("en-GB");
            
            postImageUrl = posts[i]._embedded["wp:featuredmedia"][0].source_url;
            
            postId = posts[i].id;
            
            toPostUrl = `post.html?id=${postId}`;
            
            blogPosts.innerHTML += `<div class="postCard" id="${i}">
                                        <a href="${toPostUrl}">
                                        <h3>${postTitle}<h3>
                                        <img src="${postImageUrl}" alt="Featured image" class="postCardImage" />
                                        <p>${textDate}</p> </a>
                                      </div>   
                                     `;
                     
        }

        totalNumberOfPosts = totalNumberOfPosts - 10;
        offset = offset + 10;

        console.log(totalNumberOfPosts);
        console.log(offset);
        if ( totalNumberOfPosts > 0) {
            showMore.style.display = "block";
            offsetURL = offsetURL + offset;
            console.log(offsetURL);
        }
        else {
            showMore.style.display = "none";
        }
       
    }

    catch ( error ) {
        blogPosts.innerHTML = "An error occured loading posts";
    }

}
