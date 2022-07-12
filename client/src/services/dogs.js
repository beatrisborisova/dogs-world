function getDogImage() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(img => img.message)
        .catch(err => console.log(err.message))
}

export {
    getDogImage
}