let homeLink = document.querySelector( "#home_link" );
homeLink.classList.add( "current_page" );

const homeURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/pages/175";
const acknowledgmentsURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/pages/194";

const homePageContentTop = document.querySelector(".home_page_content_top");
homePageContentTop.innerHTML = "";

const homePageContentBottom = document.querySelector(".home_page_content_bottom");
homePageContentBottom.innerHTML = "";




async function getHomePageTop() {

    try {
        const response = await fetch( homeURL );
        const results = await response.json();        
        homePageContentTop.innerHTML += results.content.rendered;    
    }

    catch( error ) {
        console.log( "An error occured getting content" );
    }


}



async function getHomePageBottom() {

    try {
        const response = await fetch( acknowledgmentsURL );
        const results = await response.json();                
        homePageContentBottom.innerHTML += results.content.rendered;
    }

    catch( error ) {
        console.log( "An error occured getting content" );
    }


}

const postsURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/posts?_embed&per_page=12";

const latestPosts = document.querySelector(".home_page_latest_posts");

let postTitle = "";
let postDate = "";
let postImageUrl = "";
let toPostUrl = "";
let postId = "";

const previousButton = document.querySelector(".button_prev");
const nextButton = document.querySelector(".button_next");
const cards = document.querySelectorAll(".postCard");

let numberOfPosts = 12;
let first = 0;

let posts = new Array();


async function getLatestPosts() {
    latestPosts.innerHTML = "Posts loading, please wait";

    try {

        const response = await fetch( postsURL );
        posts = await response.json(); 
                
        latestPosts.innerHTML = "";

        for( let i = 0; i < posts.length; i++) {
            postTitle = postTitle = posts[i].title.rendered;
            
            postDate = posts[i].date;
            
            let textDate = new Date(postDate).toLocaleDateString("en-GB");
            
            postImageUrl = posts[i]._embedded["wp:featuredmedia"][0].source_url;
            
            postId = posts[i].id;
            
            toPostUrl = `post.html?id=${postId}`;
            
            latestPosts.innerHTML += `<div class="postCard" id="${i}">
                                        <a href="${toPostUrl}">
                                        <h3>${postTitle}<h3>
                                        <img src="${postImageUrl}" alt="Featured image" class="postCardImage" />
                                        <p>${textDate}</p> </a>
                                      </div>   
                                     `;
            
            
        }
    }

    catch ( error ) {
        
        latestPosts.innerHTML = "An error occured loading posts";
    }
}



getHomePageTop();

getLatestPosts();

getHomePageBottom();

let windowWidth = screen.width;


nextButton.addEventListener("click", () => {
    
    first++;
    
    if (first > 11) {
        first = 0;
    }
    
    window.location.href = `#${first}`;
    
});


previousButton.addEventListener("click", () => {
    first--;

    if (first < 0){
        first = 11;
    }
    
    window.location.href = `#${first}`;
});
