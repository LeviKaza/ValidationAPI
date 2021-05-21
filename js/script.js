fetch('https://api.artic.edu/api/v1/artworks')
.then((response) => {
    return response.json();
})
.then((data) => {
    artists = data.data;
    var i = 1;
    artists.forEach(artist => {
        var name = artist.artist_title;
        document.querySelector('.artistButton' + i).setAttribute("value", name);
        i++;
    })
})

function search (i, el, url) {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.data.length != 0) {
            console.log(url);
            url = data.pagination.next_url;
            search(i, el, url);
        }
    })
}

var i = 0;
document.querySelector('.pictures').addEventListener("click", (el) => {
    el = el.target;
    if (el.dataset.button) {
        if (el.value != 'null') {
            fetch('https://api.artic.edu/api/v1/artworks')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                var url = data.pagination.next_url
                images = data.data;
                images.forEach(image => {
                    if (image.artist_title === el.value) {
                        test = image.image_id;
                        fetch('https://www.artic.edu/iiif/2/' + test + '/full/843,/0/default.jpg')
                        .then((response) => {
                            var div = document.createElement('figure');
                            var p = document.createElement('figcaption');
                            var img = document.createElement('img');
                            p.setAttribute('class', 'info' + i);
                            img.setAttribute('src', response.url);
                            div.append(img);
                            div.append(p);
                            document.querySelector('.pictures').append(div);
                            if(image.artist_title != null) {
                                document.querySelector('.info' + i).append('Auteur : ');
                                document.querySelector('.info' + i).append(image.artist_title);
                            }else {
                                document.querySelector('.info' + i).append('Auteur : ');
                                document.querySelector('.info' + i).append('Inconnu');
                            }
                            document.querySelector('.info' + i).append("\nTitre : " + image.title);
                            document.querySelector('.info' + i).append("\nMatériaux : " + image.medium_display);
                            document.querySelector('.info' + i).append("\nDate : " + image.date_display);
                            document.querySelector('.info' + i).append("\nPeriode : " + image.category_titles);
                        })
                    search(i, el, url);
                    }
                })
            })
        }
    }
})