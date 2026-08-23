const API = "https://cadastro-filmes-backend-o5nh.vercel.app"

async function buscarFilmes() {
    
    const sectionFilmes = document.querySelector(".filmes")

    try {
        const resposta = await fetch(`${API}/all-movies`) 
        const filmes = await resposta.json()    

        filmes.forEach((filme) => {
            sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.title}</h2>
                        <p><strong>Gênero:</strong> ${filme.genre}</p>
                        <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                        <p><strong>Classificação indicativa:</strong> ${filme.classificacao_etaria === "L" ? "Livre" : filme.classificacao_etaria + " anos"}</p>
                    </div>
                `
        })
    } catch (erro) {
        console.error(erro)
        sectionFilmes.innerHTML = "<p>Erro ao carregar os filmes.</p>"
    }
}

buscarFilmes()
