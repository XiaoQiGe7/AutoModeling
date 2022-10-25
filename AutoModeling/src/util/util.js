


const RandomId = (n = 10) => new Date().getTime().toString(n)
const RandomCol = (col) => {
    let col = "#"
    for(let i = 0;i < 6;i ++) col += parseInt(Math.random() * 16).toString(16)
    return col
}