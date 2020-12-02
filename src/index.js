
function goOpenJobs() {
    document.getElementById('open-jobs').scrollIntoView({
        behavior: 'smooth'
    })
}

function mountHtml(data) {
    const element = document.getElementById('jobs-list')

    data.forEach(job => {
        element.innerHTML += `
        <li>
            <div class="description">
                <a href=${job.link} target="_blank">${job.cargo}</a>
            </div>
            <div class="location">
                ${job.localizacao === 'Remoto' ? job.localizacao : `${job.localizacao.bairro} - ${job.localizacao.cidade}, ${job.localizacao.pais}`}
            </div>
        </li>
        `
    });       
}

async function getData() {
    try {
        const request = await fetch('http://www.mocky.io/v2/5d6fb6b1310000f89166087b')
        const result = await request.json()
        
        const { vagas } = result

        const handleData = 
            vagas.map(vaga => {
                if (!vaga.localizacao) {
                    return { ...vaga, localizacao: 'Remoto' }
                }

                return vaga
                }).filter(vaga => vaga.ativa)
        
        mountHtml(handleData)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

getData()