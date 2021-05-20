fetch('https://api.artic.edu/api/v1/artworks')
.then((response) => {
    return response.json();
})
.then((data) => {
    images = data.data;
    images.forEach(image => {
        test = image.image_id;
        fetch('https://www.artic.edu/iiif/2/' + test + '/full/843,/0/default.jpg')
        .then((response) => {
            var div = document.createElement('figure');
            var p = document.createElement('figcaption');
            p.setAttribute('class', 'none');
            p.innerHTML = 'test';
            var img = document.createElement('img');
            img.setAttribute('src', response.url);
            div.append(img);
            div.append(p)
            document.querySelector('.pictures').append(div);
        })
    })
})
