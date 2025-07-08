let header = document.querySelector("article h1");
console.log(header);

let paragraphs = document.querySelectorAll("article p");
let lastParagraph = paragraphs[paragraphs.length - 1];
lastParagraph.remove();

let subHeader = document.querySelector("article h2");
subHeader.addEventListener("click", () => {
  subHeader.style.backgroundColor = "red";
});
let thirdHeader = document.querySelector("article h3");
thirdHeader.addEventListener('click', () => {
    thirdHeader.style.display = 'none'
})
const allP = document.querySelectorAll("article p")

let btn = document.createElement('button')
btn.textContent = "Bold paragraphs"

document.body.appendChild(btn)
btn.addEventListener('click', () => {
    allP.forEach (p => {
        p.style.fontWeight = 'bold'
    })
})

header.addEventListener('mouseover', ()=>{
    let ran = Math.floor(Math.random()*101)
    header.style.fontSize = `${ran}px`
})

const secPa = document.querySelector("article p:nth-of-type(2)");
secPa.addEventListener('mouseover', () => {
    secPa.classList.add('fade')
})