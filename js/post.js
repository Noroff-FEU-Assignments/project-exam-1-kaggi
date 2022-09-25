let blogLink = document.querySelector( "#blog_link" );
blogLink.classList.add( "current_page" );

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const mightandmagicworldsURL = "https://mightandmagicworlds.lolalohne.com/wp-json";
const postsURL = "/wp/v2/posts/";
const id = params.get("id");

const myPostURL = mightandmagicworldsURL + postsURL + id + "?_embed";



const postTitle = document.querySelector("h1");
const postContent = document.querySelector(".post_content");
postContent.innerHTML = "";

async function getPost() {
    postContent.innerHTML = "<p>Info loading, please wait</p>"

    try {
        
        const response = await fetch(myPostURL); 
        const results = await response.json();         
        
        postTitle.innerHTML = results.title.rendered;
        postContent.innerHTML = results.content.rendered;  
        
        
    }
    catch(error) {     
        console.log( "An error occured getting content" );
    }
}

getPost();