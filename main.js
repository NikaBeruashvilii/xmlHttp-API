class HtmlWorker {
    static getCardHtml(animeItem) {
        return `<div class="card" style="width: 18rem;">
                    <img src="${animeItem.images.jpg.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"> ${animeItem.title}</h5>
                    </div>
                </div>`
    }

    static generateAnimeCards(animeList) {
        cardsArea.innerHTML = "";
        animeList.forEach(animeElement => {
            cardsArea.innerHTML += HtmlWorker.getCardHtml(animeElement);
        })
    }
    
}



class HttpService {
    static getDataFromApi(animeName, func) {
        var apiUrl = `https://api.jikan.moe/v4/anime?q=${animeName}`;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', apiUrl);
        xmlHttp.onloadstart = function () {

        }
        xmlHttp.onloadend = function () {
            console.log(JSON.parse(xmlHttp.responseText));
            var data = JSON.parse(xmlHttp.responseText).data;
            func(data);
        }

        xmlHttp.send();
    }
}





const animeNameInp = document.querySelector("#animeName");
const searchAnimeBtn = document.querySelector("#searchAnime")
const cardsArea = document.querySelector(".anime-cards-area");




searchAnimeBtn.addEventListener("click", function() {
    if(animeNameInp.value != undefined || animeNameInp.value.length > 0) {
        HttpService.getDataFromApi(animeNameInp.value,function(data) {
            HtmlWorker.generateAnimeCards(data);
        });
    }
})




