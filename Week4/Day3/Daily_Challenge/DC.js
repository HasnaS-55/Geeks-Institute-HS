class Video {
    static store = []
    static id = 1
    constructor(title, uploader, time) {
        this.id = Video.id++
        this.title = title
        this.uploader = uploader
        this.time = time
        
        Video.store.push(this)
    }

    watch() {
        console.log(`${this.uploader} watched all ${this.time} of ${this.title}`)
    }

    


}

let video1 = new Video("Burn", "Joe Doe", 102)
let video2 = new Video("Steet", "Layla", 70)
video1.watch()

console.log(Video.store)

Video.store.forEach( video => {video.watch()
    
});