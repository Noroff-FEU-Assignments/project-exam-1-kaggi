let blogLink = document.querySelector("#blog_link");
blogLink.classList.add("current_page");

const modal_trigger = document.querySelector(".little_picture");
const modal_picture = document.querySelector(".picture_modal");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const mightandmagicworldsURL =
  "https://mightandmagicworlds.lolalohne.com/wp-json";
const postsURL = "/wp/v2/posts/";
const id = params.get("id");

const myPostURL = mightandmagicworldsURL + postsURL + id + "?_embed";

const title = document.querySelector("title");

const postTitle = document.querySelector("h1");
const postContent = document.querySelector(".post_content");
postContent.innerHTML = "";

async function getPost() {
  postContent.innerHTML = "<p>Info loading, please wait</p>";

  try {
    const response = await fetch(myPostURL);
    const results = await response.json();

    let titleText = results.title.rendered;
    title.innerHTML = titleText + " | Might and Magic Worlds";
    postTitle.innerHTML = titleText;
    postContent.innerHTML = results.content.rendered;
  } catch (error) {
    console.log("An error occured getting content");
  }
}

getPost();

function showModal() {
  
  document.querySelector(".picture_modal").style.visibility = "visible";
}

function closeModal() {
  
  document.querySelector(".picture_modal").style.visibility = "hidden";
}
