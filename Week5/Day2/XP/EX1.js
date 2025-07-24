async function retrieveData(endpoint) {
    try{
        const respond = await fetch(endpoint, {
            method: "Get"

        })
        if (!respond.ok) throw new Error(`Failed to fetch: ${respond.status}`)

        const result = await respond.json()
        console.log(result)
        
    } catch (err) {
        console.error(err)
    }
    
}


retrieveData("https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My")