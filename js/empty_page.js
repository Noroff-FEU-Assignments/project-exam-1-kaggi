let blogLink = document.querySelector( "#blog_link" );
blogLink.classList.add( "current_page" );

/*Skrive kode for å lage postCard - en kort som skal representere blogpost i en grid. Med lenke til selve post, 
post dato og post featured image. 
*/


const mightandmagicworldsURL = "https://mightandmagicworlds.lolalohne.com/wp-json";
const postsURL = "/wp/v2/posts/";


const myPostURL = mightandmagicworldsURL + postsURL + id + "?_embed";

console.log(myPostURL);

let toPostURL = "";

let postTitle = "";
let postDate = "";
let postImageUrl = "";
const cardContent = document.querySelector(".postCard");
cardContent.innerHTML = "";

async function getPostIfo() {
    cardContent.innerHTML = "<p>Info loading, please wait</p>"
    
    try {
        
        const response = await fetch(myPostURL); 
        const results = await response.json();         
        
        postTitle = results.title.rendered;
        console.log(postTitle);
        postDate = results.date;
        let textDate = new Date(postDate).toLocaleDateString("en-GB");
        console.log(textDate);
        postImageUrl =results._embedded["wp:featuredmedia"][0].source_url;
        console.log(postImageUrl);
        toPostURL = "post.html?id=" + posts[i].id;
        /*cardContent.innerHTML = `<a href="${toPostURL}" target=blank>
                                <img src="${postImageUrl}" alt="Featured image" class="postCardImage" />
                                 <p>${postTitle}</p>
                                 <p>${textDate}</p>                                 
                                 </a>`;*/
        
        
    }
    catch(error) {     
        console.log( "An error occured getting content" );
    } 
}

getPostIfo();