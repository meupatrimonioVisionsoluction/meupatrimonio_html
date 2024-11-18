// Banco de dados simulado
let patrimonioDB = JSON.parse(localStorage.getItem("patrimonios")) || {};

// Função para salvar um novo patrimônio
function salvarPatrimonio(event) {
    event.preventDefault(); // Evita recarregar a página

    // Captura os valores do formulário
    const nomePatrimonio = document.querySelector('[name="nome_patrimonio"]').value.trim();
    const codigoPatrimonio = document.querySelector('[name="codigo_patrimonio"]').value.trim();
    const funcionario = document.querySelector('[name="funcionario"]').value.trim();
    const dataInsercao = document.querySelector('[name="data_insercao"]').value;
    const setor = document.querySelector('[name="setor"]').value;
    const local = document.querySelector('[name="local"]').value.trim();
    const status = document.querySelector('[name="status"]').value;

    // Verifica se o código do patrimônio já existe
    if (patrimonioDB[codigoPatrimonio]) {
        alert("Erro: Já existe um patrimônio com este código!");
        return;
    }

    // Cria um novo registro
    const patrimonio = {
        nome: nomePatrimonio,
        codigo: codigoPatrimonio,
        funcionario: funcionario,
        data: dataInsercao,
        setor: setor,
        local: local,
        status: status,
    };

    // Salva no "banco de dados"
    patrimonioDB[codigoPatrimonio] = patrimonio;
    localStorage.setItem("patrimonios", JSON.stringify(patrimonioDB));

    alert("Patrimônio salvo com sucesso!");
    document.querySelector("form").reset(); // Limpa o formulário
    setCurrentDateTime(); // Atualiza a data para o novo registro
}

// Função para buscar patrimônio pelo código ou nome
function buscarPatrimonio() {
    const termoBusca = prompt("Digite o código ou nome do patrimônio:").trim();

    // Busca pelo código
    const patrimonioPorCodigo = patrimonioDB[termoBusca];

    if (patrimonioPorCodigo) {
        exibirPatrimonio(patrimonioPorCodigo);
        return;
    }

    // Busca pelo nome
    const patrimonioPorNome = Object.values(patrimonioDB).find(
        (patrimonio) => patrimonio.nome.toLowerCase() === termoBusca.toLowerCase()
    );

    if (patrimonioPorNome) {
        exibirPatrimonio(patrimonioPorNome);
    } else {
        alert("Nenhum patrimônio encontrado com este termo de busca.");
    }
}

// Função para exibir os detalhes de um patrimônio
function exibirPatrimonio(patrimonio) {
    alert(`
        Nome: ${patrimonio.nome}
        Código: ${patrimonio.codigo}
        Funcionário: ${patrimonio.funcionario}
        Data de Inserção: ${patrimonio.data}
        Setor: ${patrimonio.setor}
        Local: ${patrimonio.local}
        Status: ${patrimonio.status}
    `);
}

// Preenche a data e hora automaticamente no campo correspondente
function setCurrentDateTime() {
    const dateInput = document.getElementById("dataInsercao");
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    dateInput.value = formattedDate;
}

// Adiciona eventos ao carregar a página
window.onload = () => {
    setCurrentDateTime();

    const form = document.querySelector("form");
    form.addEventListener("submit", salvarPatrimonio);

    const btnBuscar = document.createElement("button");
    btnBuscar.textContent = "Buscar Patrimônio";
    btnBuscar.type = "button"; // Para evitar submit do formulário
    btnBuscar.style.marginTop = "10px";
    btnBuscar.addEventListener("click", buscarPatrimonio);

    form.appendChild(btnBuscar);
};