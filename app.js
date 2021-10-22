const wrapper = document.querySelector(".wrapper"),
searhInput = wrapper.querySelector("input"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
speaker = wrapper.querySelector(".word i");
let audio;

function data(result, word)
{
    if(result.title)
    {
        infoText.innerHTML = `Can not find the meaning of <span>${word}</span>, Please. make sure you typed correct word`;
    }
    else{
        console.log(result)
        wrapper.classList.add("active")
        let definations = result[0].meanings[0].definitions[0];
        let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text} /`;

        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = phonetics;
        document.querySelector(".meaning span").innerHTML = definations.definition;
        document.querySelector(".example span").innerHTML = definations.example;
        audio = new Audio("https:" + result[0].phonetics[0].audio)
        if (definations.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        }
        else
        {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span>${definations.synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

function fetchApi(word)
{
    infoText.innerHTML = `Searching the meaning of "<p>${word}</p>"`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url).then(res => res.json()).then(result => data(result, word));
}

searhInput.addEventListener("keyup", e => {
    if(e.key === "Enter" && e.target.value)
    {
        fetchApi(e.target.value);
    }
})

speaker.addEventListener("click", ()=>{
    audio.play();
})