const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, callback) {

    let latitude, longitude, dogs
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return (async () => {
            const { results: dogs } = await search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude)
            callback(dogs)
        })()
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not using geolocation heavily limits wannadogs functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return (async () => {
                    return await search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude)
                })()
            }
        })


}

async function search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, longitude, latitude) {

    let response = await fetch(`${REACT_APP_API_URL}/dogs`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, location: { coordinates: [longitude, latitude] } }),
    })

    if (response.status !== 200) {
        const { error } = await response.json()
        throw Error(error)
    }
    return await response.json()
    // return _response
}