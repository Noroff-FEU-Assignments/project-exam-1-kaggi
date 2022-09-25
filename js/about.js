let aboutLink = document.querySelector( "#about_link" );
aboutLink.classList.add( "current_page" );

const aboutURL = "https://mightandmagicworlds.lolalohne.com/wp-json/wp/v2/pages/45";

const aboutPageContent = document.querySelector(".main_content_container");
aboutPageContent.innerHTML = "";

async function getAboutPage() {

    try {
        const response = await fetch( aboutURL );
        const results = await response.json();        
        aboutPageContent.innerHTML += results.content.rendered; 
        let book1Link = document.querySelector("#link_to_book1");
        console.log(book1Link);   
        book1Link.innerHTML = `<a href="post.html?id=74">I cheated</a>`;
    }

    catch( error ) {
        console.log( "An error occured getting content" );
    }

}

getAboutPage();

