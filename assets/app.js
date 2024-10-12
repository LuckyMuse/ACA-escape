const apiKey = '5ae2e3f221c38a28845f05b66216899ac4f130b1c11a84fe9822199a';
let placesFound = [];
let lat;
let lon;
const culturalBtn = document.getElementById('cultural-btn');
const casualBtn = document.getElementById('casual-btn');
const randomBtn = document.getElementById('random-btn');

culturalBtn.addEventListener('click', function () {
    document.getElementById('search-container').innerHTML = `<input class="form-control" id="city" type="text" placeholder="City">
    <select class="form-select" name="activity" id="activity">
        <option value="educational">Educational</option>
        <option value="museum">Museum</option>
        <option value="historical">Historical</option>
        <option value="landmark">Landmarks</option>
        
    </select>
    <div class="input-group">
    <input class="form-control" type="number" name="" id="price" placeholder="Max Price"><span class="input-group-text">£</span>
    </div>
    <button id="search"  class="btn btn-secondary" onclick="printList()">Search</button>`;
    culturalBtn.classList.replace('btn-secondary', 'btn-primary');
    casualBtn.classList.replace('btn-primary', 'btn-secondary');
    randomBtn.classList.replace('btn-primary', 'btn-secondary');
    document.getElementById('list-contatiner').innerHTML = '';
});

casualBtn.addEventListener('click', function () {
    document.getElementById('search-container').innerHTML = `<input class="form-control" id="city" type="text" placeholder="City" required>
    <select class="form-select" name="activity" id="activity">
        <option value="adrenaline">Adrenaline</option>
        <option value="cinema">Cinema</option>
        <option value="escaperoom">Escape Room</option>
        <option value="wildlife">Wildlife</option>
        <option value="chill">Chill</option>
        <option value ="restuarant">Restuarant</option>
    </select>
    <div class="input-group">
    <input class="form-control" type="number" name="" id="price" placeholder="Max Price" required><span class="input-group-text">£</span>
    </div>
    <button id="search" class="btn btn-secondary" onclick="printList()">Search</button>`;
    casualBtn.classList.replace('btn-secondary', 'btn-primary');
    culturalBtn.classList.replace('btn-primary', 'btn-secondary');
    randomBtn.classList.replace('btn-primary', 'btn-secondary');
    document.getElementById('list-contatiner').innerHTML = '';
});

randomBtn.addEventListener('click', function () {
    document.getElementById('search-container').innerHTML = `<input class="form-control" id="city" type="text" placeholder="City" required>
    <button id="search" class="btn btn-secondary" onclick="chooseRandom()">Search</button>`;
    randomBtn.classList.replace('btn-secondary', 'btn-primary');
    casualBtn.classList.replace('btn-primary', 'btn-secondary');
    culturalBtn.classList.replace('btn-primary', 'btn-secondary');
    document.getElementById('list-contatiner').innerHTML = '';
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function printList() {
    let empty = isEmpty();
    if (!empty) {
        let container = document.getElementById('list-contatiner');
        container.innerHTML = '';
        let city = document.getElementById('city').value;
        let search = document.getElementById('activity').value;
        let price = document.getElementById('price').value;
        document.getElementById('city').value = '';
        document.getElementById('price').value = '';
        // getCoordinates(city);
        container.innerHTML = `<h2>Places to go in ${capitalize(city)}</h2>`;
        data.forEach(place => {
            if (place.city === city && place.average_price < price) {
                place.tags.forEach(tag => {
                    if (tag === search) {
                        container.innerHTML += `<div class="activity">
                    <img class="icon" src="${place.img}" alt="${place.img}">
                    <div class="descr">
                        <h4 class="place_name">${place.name}</h4>
                        <p class="address">${place.address}</p>
                        <p class="av_price">Average Price: £${place.average_price}</p>
                        <a href="${place.web}">Website</a>
                    </div>
                </div>`;
                    }
                })
            }
        });
        if (container.innerHTML === `<h2>Places to go in ${capitalize(city)}</h2>`) {
            container.innerHTML = `<h2>Unfortunately, there are no fitting places in ${capitalize(city)}</h2>`;
        }
    } else alert('Fill in the fields, please.')
}

function isEmpty() {
    let city = document.getElementById('city').value;
    let price = document.getElementById('price').value;
    if (city === '' | price === '') {
        return true;
    } else return false;
}

function chooseRandom() {
    let city = document.getElementById('city').value;
    let suitablePlaces = [];
    data.forEach(element => {
        if (element.city === capitalize(city)) {
            suitablePlaces.push(element);
        }
    });
    let i = Math.round(Math.random() * (suitablePlaces.length-1));
    let container = document.getElementById('list-contatiner');
    let place = suitablePlaces[i];
    container.innerHTML = '<h2>This is your random activity:</h2>';
    container.innerHTML += `<div class="activity">
                    <img class="icon" src="${place.img}" alt="${place.img}">
                    <div class="descr">
                        <h4 class="place_name">${place.name}</h4>
                        <p class="address">${place.address}</p>
                        <p class="av_price">Average Price: £${place.average_price}</p>
                        <a href="${place.web}">Website</a>
                    </div>
                </div>`;
}

// async function getCoordinates(place) {
//     let url = "https://api.opentripmap.com/0.1/en/places/geoname?name=" + place + "&apikey=" + apiKey;
//     if (url !== '') {
//         lat = await fetch(url)
//             .then(response => {
//                 return response.json();
//             })
//             .then(responseData => {
//                 lat = responseData.lat;
//                 lon = responseData.lon;
//                 return lat;
//             })
//             .catch(error => console.log(error));
//         getPlaces(lat, lon);
//     }
// }

// function getPlaces(latitude, longtitude) {
//     lon_min = Math.floor(longtitude);
//     lon_max = Math.ceil(longtitude);
//     lat_min = Math.floor(latitude);
//     lat_max = Math.ceil(latitude);;
//     let search = document.getElementById('activity').value;
//     console.log(search);
//     if (search !== '') {
//         let url = "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=" + lon_min + "&lon_max=" + lon_max + "&lat_min=" + lat_min + "&lat_max=" + lat_max + "&apikey=" + apiKey;
//         fetch(url)
//             .then(response => {
//                 return response.json();
//             })
//             .then(responseData => {
//                 responseData.features.forEach(element => {
//                     kinds = element.properties.kinds.split(',');
//                     kinds.forEach(kind => {
//                         if (kind === search) {
//                             console.log(element.properties.name);
//                             placesFound.push(element.properties.name);
//                         }
//                     })
//                 });
//             })
//             .catch(error => console.log(error));
//     }
// }

// async function printOptions() {
//     placesFound = [];
//     document.getElementById('list-contatiner').innerHTML = '';
//     let city = document.getElementById('city').value;
//     document.getElementById('city').value = '';
//     getCoordinates(city);
//     setTimeout(() => {
//         document.getElementById('list-contatiner').innerHTML = `<h2>10 places to go in ${capitalize(city)}</h2>`;
//         for (let i = 0; i < 10; i++) {
//             document.getElementById('list-contatiner').innerHTML +=
//                 `<div class="place">
//                 <h3>${capitalize(placesFound[i])}</h3>
//             </div>`;

//         }
//     }, 1000);
// }

const data = [{
        city: 'Birmingham',
        name: 'ODEON Luxe Birmingham Broadway Plaza',
        tags: ['cinema', 'chill'],
        address: '220 Ladywood Middleway, Birmingham B16 8LP',
        average_price: 10,
        web: 'https://www.odeon.co.uk/cinemas/birmingham-broadway-plaza/?',
        img: 'https://westsidebid.co.uk/wp-content/uploads/2021/10/BWP_ODEON-Luxe1-scaled.jpg'},

    {
        city: 'Birmingham',
        name: 'Escape Live Birmingham - Live Escape Game Rooms',
        tags: ['escaperoom', 'adrenaline'],
        address: '18 - 24 Constitution Hill, Birmingham B19 3LY',
        average_price: 25,
        web: 'https://www.escapelive.co.uk/locations/birmingham/?gclid=Cj0KCQiAi8KfBhCuARIsADp-A564F2i0P7_-0a8jmVCV-gkv_MB_vV8HWfhhH0Bf9jrdWhCMnJhn2z4aAoHBEALw_wcB',
        img: './assets/img/birmingham/escape_live.png'
    },

    {
        city: 'Birmingham',
        name: 'Birmingham Museum & Art Gallery',
        tags: ['museum', 'educational'],
        address: 'Chamberlain Sq, Birmingham B3 3DH',
        average_price: 0,
        web: 'https://www.birminghammuseums.org.uk/bmag/visit',
        img: './assets/img/birmingham/art_gallery.jpg'
    },

    {
        city: 'Birmingham',
        name: 'Thinktank Birmingham Science Museum',
        tags: ['museum', 'educational'],
        address: 'Millennium Point, Curzon St, Birmingham B4 7XG',
        average_price: 18,
        web: 'https://www.birminghammuseums.org.uk/thinktank',
        img: './assets/img/birmingham/thinktank.jpg'
    },

    {
        city: 'Birmingham',
        name: 'Museum of the Jewellery Quarter',
        tags: ['museum', 'educational'],
        address: '75-80 Vyse St, Birmingham B18 6HA',
        average_price: 6,
        web: 'https://www.birminghammuseums.org.uk/museum-of-the-jewellery-quarter',
        img: './assets/img/birmingham/jewellery_Quarter_Museum.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Soho House Museum',
        tags: ['museum', 'educational'],
        address: 'Soho Ave, Birmingham B18 5LB',
        average_price: 7,
        web: 'https://www.birminghammuseums.org.uk/soho-house',
        img: './assets/img/birmingham/sohohouse.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Aston Hall',
        tags: ['history', 'educational'],
        address: 'Trinity Rd, Birmingham B6 6JD',
        average_price: 11,
        web: 'https://www.birminghammuseums.org.uk/aston-hall/visit/tickets',
        img: './assets/img/birmingham/Aston_Hall.jpg'
    },
    {
        city: 'Birmingham',
        name: 'TORI ZERO Metaverse Cafe',
        tags: ['restuarant', 'chill'],
        address: '226 Monument Rd, Birmingham B16 8UZ',
        average_price: 15,
        web: 'https://www.torizerocafe.co.uk/',
        img: './assets/img/birmingham/tori_zero.jpg'
    },
    {
        city: 'Birmingham',
        name: 'National SEA LIFE Centre Birmingham',
        tags: ['wildlife', 'chill'],
        address: 'The Waters Edge, Eleven Brindley Place, Birmingham B1 2HL',
        average_price: 18,
        web: 'https://www.visitsealife.com/birmingham/tickets-prices/ways-to-visit/general-tickets/',
        img: './assets/img/birmingham/sea_life_center.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Birmingham Wildlife Conservation Park',
        tags: ['wildlife', 'educational'],
        address: 'Pershore Rd, Birmingham B5 7RL',
        average_price: 6,
        web: 'https://www.birmingham.gov.uk/info/50042/birmingham_wildlife_conservation_park/869/visiting_the_birmingham_wildlife_conservation_park/2',
        img: './assets/img/birmingham/conservation_park.jpg'
    },
    {
        city: 'Birmingham',
        name: 'West Midland Safari Park',
        tags: ['wildlife', 'educational'],
        address: 'Spring Grove, Bewdley DY12 1LF',
        average_price: 22,
        web: 'https://www.wmsp.co.uk/',
        img: './assets/img/birmingham/safari_park.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Drayton Manor Resort',
        tags: ['themepark', 'adrenaline'],
        address: 'Drayton Manor Dr, Fazeley, Mile Oak, Tamworth B78 3TW',
        average_price: 30,
        web: 'https://www.draytonmanor.co.uk/',
        img: './assets/img/birmingham/drayton.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Cadbury World',
        tags: ['educational', 'historical'],
        address: 'Cadbury World, 69 Linden Rd, Bournville, Birmingham B30 1JR',
        average_price: 21,
        web: 'https://www.cadburyworld.co.uk/',
        img: './assets/img/birmingham/cadbury_world.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Library of Birmingham',
        tags: ['educational', 'landmark'],
        address: 'Centenary Sq, Broad St, Birmingham B1 2EA',
        average_price: 0,
        web: 'https://birmingham.spydus.co.uk/cgi-bin/spydus.exe/MSGTRN/WPAC/HOME',
        img: './assets/img/birmingham/library_of_birmingham.jpg'
    },
    {
        city: 'Birmingham',
        name: 'LEGOLAND Discovery Centre & LEGO Store Birmingham',
        tags: ['fun', 'educational'],
        address: 'LEGOLAND Discovery Centre, Arena, King Edwards Rd, Birmingham B1 2AA',
        average_price: 20,
        web: 'https://www.legolanddiscoverycentre.com/birmingham/',
        img: './assets/img/birmingham/legoland.jpg'
    },
    {
        city: 'Birmingham',
        name: 'The Birmingham Botanical Gardens',
        tags: ['wildlife', 'educational'],
        address: 'Westbourne Rd, Birmingham B15 3TR',
        average_price: 8,
        web: 'https://www.birminghambotanicalgardens.org.uk/?utm_source=google&utm_medium=organic&utm_campaign=gmb',
        img: './assets/img/birmingham/botanicalgarden.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Winterbourne House & Garden',
        tags: ['wildlife', 'chill'],
        address: '58 Edgbaston Park Rd, Birmingham B15 2RT',
        average_price: 8,
        web: 'https://www.winterbourne.org.uk/admission-prices/',
        img: './assets/img/birmingham/Winterbourne House and Botanical Garden.jpg'
    },
    {
        city: 'Birmingham',
        name: 'St. Philips Cathedral',
        tags: ['landmark', 'eduactional'],
        address: 'Cathedral Square, Colmore Row, Birmingham B3 2QB',
        average_price: 0,
        web: 'https://birminghamcathedral.com/',
        img: './assets/img/birmingham/st_phillips_cathedral.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Cannon Hill Park',
        tags: ['wildlife', 'chill'],
        address: 'Russell Rd, Moseley, Birmingham B13 8RD',
        average_price: 0,
        web: 'https://www.birmingham.gov.uk/directory_record/9091/cannon_hill_park',
        img: './assets/img/birmingham/cannon_hill_park.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Hollywood Bowl Birmingham Broadway Plaza',
        tags: ['chill', 'fun'],
        address: 'Broadway Plaza Ladywood Middleway, Birmingham B16 8LP',
        average_price: 8,
        web: 'https://www.hollywoodbowl.co.uk/',
        img: './assets/img/birmingham/hollywood bowl.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Mailbox Birmingham',
        tags: ['chill', 'landmark'],
        address: 'Royal Mail St, Birmingham B1 1RS',
        average_price: 0,
        web: 'https://mailboxlife.com/',
        img: './assets/img/birmingham/mailbox.jpg'
    },
    {
        city: 'Birmingham',
        name: 'The Cube',
        tags: ['landmark', 'sight-seeing'],
        address: '196 Wharfside St, Birmingham B1 1RN',
        average_price: 0,
        web: 'https://www.thecube.co.uk/',
        img: './assets/img/birmingham/the_cube.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Bullring & Grand Central',
        tags: ['landmark', 'chill'],
        address: 'Moor St, Birmingham B5 4BU',
        average_price: 0,
        web: 'https://www.bullring.co.uk/',
        img: './assets/img/birmingham/bullring.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Cocoa by Ali',
        tags: ['chill', 'restuarant'],
        address: '26 Waterfront Walk, Birmingham B1 1SR',
        average_price: 10,
        web: 'https://www.instagram.com/cocoabyali/',
        img: './assets/img/birmingham/cocoa.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Woodgate valley country park',
        tags: ['wildlife', 'casual'],
        address: 'Woodgate Valley Country Park',
        average_price: 0,
        web: 'https://www.birmingham.gov.uk/wvcp',
        img: './assets/img/birmingham/woodgate_valley_park.jpg'
    },
    {
        city: 'Birmingham',
        name: 'Symphony Hall',
        tags: ['landmark', 'formal'],
        address: 'Broad St, Birmingham B1 2EA',
        average_price: 0,
        web: 'https://www.thsh.co.uk/symphony-hall',
        img: './assets/img/birmingham/symphony_hall.jpg'
    },
    {
        city: 'Birmingham',
        name: 'The Button Factory',
        tags: ['restuarant', 'chill'],
        address: '25 Frederick St, Birmingham B1 3HH',
        average_price: 20,
        web: 'http://thebuttonfactorybirmingham.co.uk/',
        img: './assets/img/birmingham/buttonfactory.jpg'
    },
    {
    city: 'Birmingham',
    name: 'Gaucho Restuarant',
    tags: ['restuarant', 'chill'],
    address: 'Lower Ground Retail, 55 Colmore Row, Birmingham B3 2AA',
    average_price: 15,
    web: 'https://gauchorestaurants.com/restaurants/birmingham/',
    img: './assets/img/birmingham/gaucho.jpg'

    },
    //add manchester and bristol here

    {
    name: 'manchester Art Gallery',
    city: 'Manchester',
    tags: ['art', 'educational'],
    address: 'Manchester Art Gallery, Mosley St, Manchester M2 3JL',
    average_price: 15,
    web: 'https://manchesterartgallery.org/',
    img: './assets/img/manchester/art_gallery.jpg'
    },

    {
    name: 'The Whitworth',
    city: 'Manchester',
    tags: ['museum', 'educational'],
    address: 'Oxford Rd, Manchester M15 6ER',
    average_price: 20,
    web: 'https://www.whitworth.manchester.ac.uk/',
    img: './assets/img/manchester/Whitworth.jpg'
},

 {
    name: 'IWM North',
    city: 'Manchester',
    tags: ['museum', 'war'],
    address: 'Trafford Wharf Rd, Trafford Park, Stretford, Manchester M17 1TZ',
    average_price: 20,
    web: 'https://www.iwm.org.uk/visits/iwm-north',
    img: './assets/img/manchester/IWM_North.jpg'
},

 {
    name: 'Chetham Library',
    city: 'Manchester',
    tags: ['historical', 'educational'],
    address: 'Long Millgate, Manchester M3 1SB',
    average_price: 30,
    web: 'https://library.chethams.com/',
    img: './assets/img/manchester/chetham_library.jpg'
},

{
    name: 'Heaton Park',
    city: 'Manchester',
    tags: ['chill', 'landmark'],
    address: 'Middleton Rd, Manchester M25 2SW',
    average_price: 20,
    web: 'https://www.manchester.gov.uk/heatonpark',
    img: './assets/img/manchester/heaton_park.jpg'
},

 {
    name: 'Palace Theatre Manchester',
    city: 'Manchester',
    tags: ['theatre', 'chill'],
    address: '97 Oxford St, Manchester M1 6FT',
    average_price: 30,
    web: 'https://www.atgtickets.com/venues/palace-theatre-manchester/?utm_source=google&utm_medium=organic&utm_campaign=gmb',
    img: './assets/img/manchester/palace_theatre.png'
},

{
    name: 'Pizza Express',
    city: 'Manchester',
    tags: ['restuarant', 'food'],
    address: 'Manchester King Street. 84-86 King Street, Manchester, M2 4WQ',
    average_price: 20,
    web: 'www.pizzaexpress.com',
    img: './assets/img/manchester/pizza-express.jpg'
},

{
    name: 'OSMA',
    city: 'Manchester',
    tags: ['restuarant', 'food'],
    address: '132 Bury New Road, Prestwich, M25 0AA',
    average_price: 20,
    web: 'www.osmakitchenbar.com',
    img: './assets/img/manchester/osma.jpg'
},
// BRISTOL

{
    name: 'Clifton Suspension Bridge',
    city: 'Bristol',
    tags: ['landmark', 'historic'],
    address: 'Bridge Rd, Leigh Woods, Bristol BS8 3PA',
    average_price: 0,
    web: 'https://cliftonbridge.org.uk/',
    img: './assets/img/bristol/suspension_bridge.jpg'
},

{
    name: 'Brunel SS Great Britain',
    city: 'Bristol',
    tags: ['landmark', 'touristy'],
    address: 'Great Western Dockyard, Gas Ferry Rd, Bristol BS1 6TY',
    average_price: 0,
    web: 'https://www.ssgreatbritain.org/',
    img: './assets/img/bristol/ss_great_britain.jpg'

},

{
    name: 'Bristol Museum & Art Gallery',
    city: 'Bristol',
    tags: ['museum', 'art'],
    address: 'Queens Rd, Bristol BS8 1RL',
    average_price: 0,
    web: 'https://www.bristolmuseums.org.uk/bristol-museum-and-art-gallery/',
    img: './assets/img/bristol/museum.jpg'

},

{
    name: 'Bristol Aquarium',
    city: 'Bristol',
    tags: ['wildlife', 'fun'],
    address: 'Anchor Rd, Bristol BS1 5TT',
    average_price: 19.25,
    web: 'https://www.bristolaquarium.co.uk/',
    img: './assets/img/bristol/Bristol_aqaurium.jpg'

},
{
    name: 'Clifton Observatory',
    city: 'Bristol',
    tags: ['historical', 'sight-seeing'],
    address: 'Litfield Rd, Clifton, Bristol BS8 3LT',
    average_price:5 ,
    web: 'https://cliftonobservatory.com/',
    img: './assets/img/bristol/clifton.jpg'

},
 {
    name: 'Floating Harbour',
    city: 'Bristol',
    tags: ['sight-seeing', 'chill'],
    address: 'Welsh Back, Bristol BS1 4SP',
    average_price: 0,
    web: 'https://floatingharbour.co.uk/',
    img: './assets/img/bristol/harbour.jpg'

},
{
    name: 'We The Curious',
    city: 'Bristol',
    tags: ['educational', 'fun'],
    address: '1 Millennium Square, One Millennium Square, Anchor Rd, Bristol BS1 5DB',
    average_price: 15,
    web: 'https://www.wethecurious.org/',
    img: './assets/img/bristol/we_are_the_curious.jpg'

},
{
    name: 'National Trust - Leigh Woods',
    city: 'Bristol',
    tags: ['nature', 'chill'],
    address: 'Abbots Leigh, Bristol BS8 3QB',
    average_price: 0,
    web: 'https://www.nationaltrust.org.uk/visit/bath-bristol/leigh-woods',
    img: './assets/img/bristol/leigh_woods.jpg'

},
 {
    name: 'Escape Hunt Bristol',
    city: 'Bristol',
    tags: ['chill', 'fun'],
    address: 'Broadmead, Bristol BS1 3BX',
    average_price: 25,
    web: 'https://escapehunt.com/uk/bristol/?utm_campaign&utm_source=GMB&utm_medium=search',
    img: './assets/img/bristol/escape_hunt.jpg'

},
 {
    name: 'Bristol cathedral',
    city: 'Bristol',
    tags: ['touristy', 'landmark'],
    address: 'College Green, Bristol BS1 5TJ',
    average_price: 0,
    web: 'https://bristol-cathedral.co.uk/',
    img: './assets/img/bristol/bristol_cathetrol.jpg'

},
 {
    name: 'Cabot Circus',
    city: 'Bristol',
    tags: ['shopping', 'fun'],
    address: 'Bond St S, Broadmead, Bristol BS1 3BD',
    average_price: 0,
    web: 'https://www.cabotcircus.com/',
    img: './assets/img/bristol/cabot_circus.jpg'

},
{
    name: 'Cabot tower',
    city: 'Bristol',
    tags: ['touristy', 'landmark'],
    address: 'Brandon Hill Park, Park St, Bristol BS1 5RR',
    average_price: 0,
    web: 'https://www.cabottower.com/',
    img: './assets/img/bristol/cabot_tower.jpg'

},
{
    name: 'The Ethicurean',
    city: 'Bristol',
    tags: ['restuarant', 'chill'],
    address: 'Barley Wood Walled Garden, Long Lane, Bristol BS40 5SA',
    average_price: 20,
    web: 'https://www.timeout.com/bristol/restaurants-and-cafes/the-ethicurean',
    img: './assets/img/bristol/ethicurean.jpg'

},

{
    name: 'Nadu',
    city: 'Bristol',
    tags: ['restuarant', 'chill'],
    address: '77-79 Stokes Croft, Bristol, BS1 3RD',
    average_price: 20,
    web: 'https://www.nadubristol.com/',
    img: './assets/img/bristol/nadu.jpg'

},

{
    name: 'littlefrench',
    city: 'Bristol',
    tags: ['restuarant', 'chill'],
    address: '77-79 Stokes Croft, Bristol, BS1 3RD',
    average_price: 20,
    web: 'https://www.littlefrench.co.uk/',
    img: './assets/img/bristol/ouioui.jpg'

}
];