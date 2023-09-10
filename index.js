const searchBar = document.getElementById("searchbar");
const searchButton = document.getElementById("searchButton");
const getAllUsers = document.getElementById("getAllUsers");
const cardContainer= document.getElementById("cardContainer");

function getUser(searchValue){
let apiUrl;
    if(searchValue === undefined){
         apiUrl = `https://api.github.com/users`
    }
    else{
         apiUrl = `https://api.github.com/users/${searchValue}`
    }

    const user = fetch(apiUrl)
    // console.log(promise)
    user.then((response) => {
        return response.json()
    }).then((data) =>{
        let result = data;
        
        // console.log(result);

        if(searchValue === undefined){
            result.map((ele)=>{
                const card = document.createElement("div");
                const heading = document.createElement("h2");
                const link = document.createElement("a");
                const img = document.createElement("img");
        
                heading.innerText = ele.login;
                img.src = ele.avatar_url
                link.href = ele.html_url;
                link.innerText = "Git hub Link"
                card.appendChild(img);
                card.appendChild(heading);
                card.appendChild(link);
                cardContainer.appendChild(card)
                })
        }
        else{
            cardContainer.innerHTML="";
            // console.log(result);
            if(result.message === "Not Found"){
                const heading = document.createElement("h1");
                heading.innerText = "Not Found!!!";
                cardContainer.appendChild(heading);
            }
            else{
                const card = document.createElement("div");
                const heading = document.createElement("h2");
                const link = document.createElement("a");
                const img = document.createElement("img");
        
                heading.innerText = result.login;
                img.src = result.avatar_url
                link.href = result.html_url;
                link.innerText = "Git hub Link"
                card.appendChild(img);
                card.appendChild(heading);
                card.appendChild(link);
                cardContainer.appendChild(card)
            }  
        }  
    })
}

searchButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const searchValue = searchBar.value
    getUser(searchValue);

    searchValue.innerText="";
})

getAllUsers.addEventListener("click", (e) =>{
    e.preventDefault();
    cardContainer.innerHTML ="";
    getUser();
})

getUser();