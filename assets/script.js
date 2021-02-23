const API_URL = "https://rickandmortyapi.com/api/";
const homeMember = document.querySelectorAll(".slide-items"); 
const sliderDiv = document.getElementById("slider-container");
const miniCardsDiv = document.getElementById("mini-cards");
const mainContainer = document.getElementById('main-container');
const wrapper = document.getElementById('wrapp');
//const CHAR_API = "https://rickandmortyapi.com/api/character";
//const LOCATION_API = "https://rickandmortyapi.com/api/location";
//const EPISODE_API = "https://rickandmortyapi.com/api/episode"

window.addEventListener("stalled", ()=> {
   const loader = document.querySelector('loader') 
   const loaderGif = document.querySelector('loader-gif') 

   loader.classList.add("hidden")
   loaderGif.classList.add("hidden")
});



let x = 1;

getApi();

async function getApi() {
    
    for (let i = 0; i < homeMember.length; i++) {
        const include = await fetch(API_URL + "character/" + (i+1) );
        const info = await include.json();
        
        getFamily(info, i);
    }
    
}

async function getFamily(member, card) {
    const roof = homeMember[card];
    const firstEpisode = await fetch(member.episode[0]);
    const firsSeen = await firstEpisode.json();

    if (member.status == "Alive") {
        var a = "life-status-green"
    } else {
        var a = "life-status-red"
    }

    roof.innerHTML += `

    <div class="family__container">    
    <div class="member_img">
        <img src="${member.image}" alt="${member.name}">
    </div>
    <div class="member_info">
        <div class="member_div1">
            <div class="member_name"><span>${member.name}</span></div>
            <div class="member_status"><div class="${a}"></div> <span class="status-color">${member.status} - ${member.species}</span></div>
        </div>
        <div class="member_div2">
            <div class="member_last-known-span"><span>Last known location:</span></div>
            <div class="member_last-known-location"><span>${member.location.name}</span></div>
        </div>
        <div class="member_div3">
            <div class="member_first-seen-span"><span>First seen in:</span></div>
            <div class="member_first-seen-in"><span>${firsSeen.name}</span></div>
        </div>
    </div>
    </div>    
    `
}

let xs = Number(0);

//getMiniCardsPage()
async function getMiniCardsPage() {
    const include = await fetch(API_URL + "character?page=" + xs);
    const info = await include.json();
    const cardLength = Number(info.info.pages)

    if (!isNaN(cardLength)) {
        const results = info.results;
        
        results.forEach(elem => {
            createMiniCards(elem);
            getStatus(elem);
        });   
    }
    xs++
}

function getStatus(elem) {

}

function createMiniCards(elem) {

    if (elem.status == "Alive") {
        var status = "mini-status-alive";
    } else if (elem.status == "Dead") {
        var status = "mini-status-dead";
    } else if (elem.status == "unknown") {
        var status = "mini-status-unknown";
    } else {
        var status = "mini-status-null";
    }

    miniCardsDiv.innerHTML += `
<div class="mini_card">
    <div class="mini_card-translate">
        <div class="mini_card-show">
            <div class="mini_card-show-image">
                <img class="mini_card-animate-images" src="${elem.image}" alt="${elem.name}" width="100%">
            </div>
            <div class="mini_card-show-info">
                <div class="mini-name-div">
                    <div class="mini-name">${elem.name}</div>
                    <div class="${status} mini-stat-positon"></div>
                </div>
                <div class="mini-type">${elem.type}</div>
            </div>
        </div>
        <div class="mini_card-hover">
            <div class="mini_card-hover-info">
                <div class="mini-hover-stat">Species:</div>
                <div class="mini-hover-stat-info">${elem.species}</div>
                <div class="mini-hover-stat">Gender:</div>
                <div class="mini-hover-stat-info">${elem.gender}</div>
                <div class="mini-hover-stat">Origin:</div>
                <div class="mini-hover-stat-info">${elem.origin.name}</div>
            </div>
        </div>
    </div>
</div>

    `
}
// Inıt "Other Things" Cards
getMiniCardsPage();

const moreCardsBtn = document.getElementById("more-cards-button");
moreCardsBtn.onclick = ()=> {
    getMiniCardsPage();
}

//const bodyELEM = document.getElementsByTagName("BODY")[0];
//let xm = Number(1);
//let xl = Number(1);
//bodyELEM.addEventListener('scroll', ()=> {
//
//    const elmnt = bodyELEM;
//    let y = elmnt.scrollTop;
//    console.log(y, screen.availHeight )
//    if(y >  screen.height*xl && xm <= 34){    
//        getMiniCardsPage();
//        xm++
//        xl += 2
//    }
//})
