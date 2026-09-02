async function cadastrarFilme() {
    const title = document.getElementById("title")
    const genre = document.getElementById("genre")
    const classificacao_etaria = document.getElementById("classificacao_etaria")
    const duration = document.getElementById("duration")

    if (title.value === "" || genre.value === "" || classificacao_etaria.value === "" || duration.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        title: title.value,
        genre: genre.value,
        classificacao_etaria: classificacao_etaria.valueAsNumber,
        duration: duration.valueAsNumber
    }

    const resposta = await fetch("https://cadastro-filmes-backend.vercel.app/", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const mensagem = await resposta.json()

    alert(mensagem.message)

    window.location.href = "../index.html"
}

cadastrarFilme()