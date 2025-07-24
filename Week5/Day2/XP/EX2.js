async function retrieveData(endpoint, offset, limit) {
    try{
        const response = await fetch(endpoint, {
            method: "GET"

        })
        if (!response.ok) throw new Error(`Failed to fetch: ${respond.status}`)

        const result = await response.json()
        const dataSliced = result.data.slice(offset, limit) 
        console.log(dataSliced.length)
        
        
        
        
        
    } catch (err) {
        console.error(err)
    }
    
}


retrieveData("https://api.giphy.com/v1/gifs/search?q=sun&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My", 2, 12)