import logic from '..'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
export default function (dogId, image) {
    // validate fields
    let formData = new FormData()
    formData.append('image', image)
    //headers: { 'content-type': 'multipart/form-data', authorization: `bearer ${token}` },
    return (async () => {
        // if(image !== undefined)
        const response = await fetch(`${REACT_APP_API_URL}/user/image/${dogId}`, {
            method: 'post',
            headers: { authorization: `bearer ${logic.__token__}` },
            body: formData
        })
        if (response.status === 200) {
            await response.json()
        } else {
            const { error } = await response.json()
            throw new Error(error)
        }
    })()
}