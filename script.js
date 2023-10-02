const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');

const searchForm = document.querySelector('.app-header-search');
const searchList = document.getElementById('search-list');

let activeTab = 1;
let allData;

const init = async () => {
    showActiveTabBody();
    showActiveTabHead();
};

const showActiveTabHead = () => {
    allTabsHead[activeTab - 1].classList.add('active-tab');
};

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
};

const hideAllTabBody = () => {
    allTabsBody.forEach((singleTabBody) =>
        singleTabBody.classList.remove('show-tab')
    );
};

const hideAllTabHead = () => {
    allTabsHead.forEach((singleTabHead) =>
        singleTabHead.classList.remove('active-tab')
    );
};

// Event listener
window.addEventListener('DOMContentLoaded', async () => {
    await init();
});

allTabsHead.forEach((singleTabHead) => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabBody();
        showActiveTabHead();
    });
});

const getInputValue = async (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    await fetchAllSuperHero(searchText);
};

searchForm.addEventListener('submit', getInputValue);

const fetchAllSuperHero = async (searchText) => {
    let url = `https://superheroapi.com/api.php/1857381674659543/search/${searchText}`;
    try {
        const response = await fetch(url);
        allData = await response.json();
        if (allData.response === 'success') {
            showSearchList(allData.results);
        }
    } catch (error) {
        console.error(error);
        // Handle errors gracefully, e.g., show an error message to the user
    }
};

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach((dataItem) => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src="${dataItem.image.url ? dataItem.image.url : ""}" alt="">
            <p data-id="${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
};

searchForm.search.addEventListener('keyup', () =>{
    if(searchForm.search.value.length > 1){
        fetchAllSuperHero(searchForm.search.value);
    }else{
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    console.log(searchId)
    let singleData = allData.results.filter(singleData => {
        return (searchId === singleData.id);
    })
    showSuperheroDetails(singleData); // Pass the first item of the filtered array
    searchList.innerHTML = "";
});




const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src="${data[0].image.url}">
        <!-- Add more details here as needed -->
    `;
    document.querySelector('.name').textContent = data[0].name;
    document.querySelector(".powerstats").innerHTML =  `
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>Intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>

        <li>
            <div>
                <i class="fa-solid fa-shield-halved"></i>
                <span>Strength</span>
            </div>
            <span>${data[0].powerstats.strength}</span>
        </li>

        <li>
            <div>
                <i class="fa-solid fa-shield-halved"></i>
                <span>Speed</span>
            </div>
            <span>${data[0].powerstats.speed}</span>
        </li>

        <li>
            <div>
                <i class="fa-solid fa-shield-halved"></i>
                <span>Durability</span>
            </div>
            <span>${data[0].powerstats.durability}</span>
        </li>

        <li>
            <div>
                <i class="fa-solid fa-shield-halved"></i>
                <span>Power</span>
            </div>
            <span>${data[0].powerstats.power}</span>
        </li>

        <li>
            <div>
                <i class="fa-solid fa-shield-halved"></i>
                <span>Combat</span>
            </div>
            <span>${data[0].powerstats.combat}</span>
    </li>
    `
    document.querySelector(".biography").innerHTML = `
    <li>
    <span>full name</span>
    <span>${data[0].biography['full-name']}</span>
    </li>

    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>

    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>

    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>

    <li>
        <span>first-appearance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>

    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;

    document.querySelector(".appearence").innerHTML = `
    <li>
        <span>
            <i class="fas fa-star"></i>
            gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>

    <li>
        <span>
            <i class="fas fa-star"></i>
            race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>

    <li>
        <span>
            <i class="fas fa-star"></i>
            height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>

    <li>
        <span>
            <i class="fas fa-star"></i>
            weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>

    <li>
        <span>
            <i class="fas fa-star"></i>
            eye-color
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>

    <li>
        <span>
            <i class="fas fa-star"></i>
            hair-color
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>
    `;

    document.querySelector('.connection').innerHTML = `
    <li>
        <span>group--affiliation</span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>

    <li>
        <span>relatives</span>
        <span>${data[0].connections['relatives']}</span>
    </li>
    `;
};
