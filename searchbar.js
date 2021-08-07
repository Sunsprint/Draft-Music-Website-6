const pages = [
    { display: 'About', name: 'about', href: 'About.html' },
    { display: 'Academics', name: 'academics', href:'Academics.html' },
    { display: 'AHS Music Capstone', name: 'ahs music capstone', href: 'AHS-Music-Capstone.html' },
    { display: 'Ann Schaffner Concert Series', name: 'ann schaffner concert series', href: 'Ann-Schaffner-Concert-Series.html' },
    { display: 'BBW Cross-Registration', name: 'bbw cross-registration', href: 'BBW-Cross-Registration.html'},
    { display: 'Contact', name: 'contact', href:'Contact.html' },
    { display: 'Events', name: 'events', href: 'Events.html' },
    { display: 'Facilities', name: 'facilities', href: 'Facilities.html' },
    { display: 'Gallery', name: 'gallery', href:'Gallery.html' },
    { display: 'Groups', name: 'groups', href:'Groups.html' },
    { display: 'Home', name: 'home', href:'Home.html' },
    { display: 'Independent Studies in Music', name: 'independent studies in music', href: 'Independent-Studies-in-Music.html'},
    { display: 'Olin Jazz Orchestra', name: 'ojo', href: 'OJO.html' },
    { display: 'Olin Conductorless Orchestra', name: 'olin conductorless orchestra', href: 'Olin-Conductorless-Orchestra.html' },
    { display: 'Origins', name: 'origins', href: 'Origins.html' },
    { display: 'Olin Rock Orchestra', name: 'oro', href: 'ORO.html' },
    { display: 'People', name: 'people', href:'People.html' },
    { display: 'PowerChords', name: 'powerchords', href: 'PowerChords.html' },
    { display: 'Singular Voices, Dual Lives', name: 'singular voices, dual lives', href: 'Singular-Voices-Dual-Lives.html'},
    { display: 'Resources', name: 'resources' },
    { display: 'Wired Ensemble', name: 'wired ensemble', href: 'Wired-Ensemble.html' },
]

const list = document.getElementById('list');

function setList(group) {
    clearList();
    if (group.length === 0) {
        setNoResults();
    } else {
        const htmlString = group.map((element) => {
            return `<li><a href="${element.href}" class="u-search-result"><h4 class="title">${element.display}</h4></a></li>`
        }).join('\n');
        list.innerHTML = htmlString
    }
}

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}

function setNoResults() {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else if (value.includes(searchTerm)) {
        return 0;
    }
}
const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(pages.filter(page => {
            return page.name.includes(value) //|| page.subtitles.includes(value) || page.people.includes(value)
        }).sort((pageA, pageB) => {
            return getRelevancy(pageB.name, value) - getRelevancy(pageA.name, value);
        }));
    } else {
        clearList();
    }
});