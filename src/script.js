async function load() {
    const fetchData = await fetch('movies.json')
    const data = await fetchData.json()

    const eventsContainer = document.getElementById('events-container-ui')
    eventsContainer.innerHTML = ''

    let imgload = new Image()
    for (let movie of data) {
        const img = `${movie.imgsrc}`
        if(img.slice(0,4) === 'data'){
            imgload = 'no-image-found.png'
        } else {
            imgload = img
        }

        eventsContainer.innerHTML += `
        <div class="card w-72 bg-base-100 shadow-xl">
            <figure><img src="${imgload}" alt="${movie.title}" /></figure>
            <div class="card-body"
                <h2 class="card-title">${movie.title}</h2>
                <div class="card-actions justify-end">
                    <a class="btn btn-primary" href="${movie.linkref}" target="_blank">GoTo Movie</a>
                </div>
            </div>
        </div>
        `
    }
}

load()