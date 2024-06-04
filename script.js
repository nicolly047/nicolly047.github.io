
let imagemAtual = 1
const imagemFinal = 80;


function proxImagem( img ){

    fetch(`img/${img}.jpg`)
        .then(resp => resp.blob())
        .then(blob => {
            const imageObjectURL = URL.createObjectURL(blob);
            console.log(imageObjectURL);
            const proxImg = document.createElement("img");
            proxImg.src = imageObjectURL;
            document.getElementById("placeholder").appendChild(proxImg)

        })
}

window.onload = function(){
    for( ;imagemAtual < 5; imagemAtual++ )
    proxImagem(imagemAtual);
}
window.onscroll = function(){
    let altura = document.body.scrollHeight;
    let scrollPoint = window.scrollY + window.innerHeight;
    if(scrollPoint >= altura){
        proxImagem( item++ %max );
    }
}