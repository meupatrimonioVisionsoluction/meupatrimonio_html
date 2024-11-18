// Banco de dados simulado
let patrimonioDB = JSON.parse(localStorage.getItem("patrimonios")) || {};

// Função para salvar um novo patrimônio
function salvarPatrimonio(event) {
    event.preventDefault(); // Evita recarregar a página

    const nomePatrimonio = document.querySelector('[name="nome_patrimonio"]').value.trim();
    const codigoPatrimonio = document.querySelector('[name="codigo_patrimonio"]').value.trim();
    const funcionario = document.querySelector('[name="funcionario"]').value.trim();
    const dataInsercao = document.querySelector('[name="data_insercao"]').value;
    const setor = document.querySelector('[name="setor"]').value.trim();
    const local = document.querySelector('[name="local"]').value.trim();
    const status = document.querySelector('[name="status"]').value;

    if (patrimonioDB[codigoPatrimonio]) {
        alert("Erro: Já existe um patrimônio com este código!");
        return;
    }

    const patrimonio = {
        nome: nomePatrimonio,
        codigo: codigoPatrimonio,
        funcionario,
        data: dataInsercao,
        setor,
        local,
        status,
    };

    patrimonioDB[codigoPatrimonio] = patrimonio;
    localStorage.setItem("patrimonios", JSON.stringify(patrimonioDB));

    alert("Patrimônio salvo com sucesso!");
    document.getElementById("formCadastro").reset();
    setCurrentDateTime();
}

// Preenche a data e hora automaticamente
function setCurrentDateTime() {
    const dateInput = document.getElementById("dataInsercao");
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    dateInput.value = formattedDate;
}

// Eventos ao carregar a página
window.onload = () => {
    setCurrentDateTime();
    document.getElementById("formCadastro").addEventListener("submit", salvarPatrimonio);
};
