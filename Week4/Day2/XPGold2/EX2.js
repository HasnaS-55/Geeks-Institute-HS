function antiDup(array) {
    let newArr = []
    array.map((item) => {
        if (!newArr.includes(item)) {
            newArr.push(item)
        }
    })
}