// Função para buscar patrimônio
function buscarPatrimonio() {
    const termoBusca = document.getElementById("termoBusca").value.trim();
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpa os resultados anteriores

    const patrimonioDB = JSON.parse(localStorage.getItem("patrimonios")) || {};

    const patrimonioPorCodigo = patrimonioDB[termoBusca];
    const patrimonioPorNome = Object.values(patrimonioDB).find(
        (patrimonio) => patrimonio.nome.toLowerCase() === termoBusca.toLowerCase()
    );

    const patrimonio = patrimonioPorCodigo || patrimonioPorNome;

    if (patrimonio) {
        const patrimonioDiv = document.createElement("div");
        patrimonioDiv.className = "patrimonio";
        patrimonioDiv.innerHTML = `
            <h3>${patrimonio.nome}</h3>
            <p><strong>Código:</strong> ${patrimonio.codigo}</p>
            <p><strong>Funcionário:</strong> ${patrimonio.funcionario}</p>
            <p><strong>Data:</strong> ${patrimonio.data}</p>
            <p><strong>Setor:</strong> ${patrimonio.setor}</p>
            <p><strong>Local:</strong> ${patrimonio.local}</p>
            <p><strong>Status:</strong> ${patrimonio.status}</p>
        `;
        //Botão para editar o patrimônio
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar Patrimônio";
        editarBtn.addEventListener("click", () => editarPatrimonio(patrimonio, patrimonioDB));
        patrimonioDiv.appendChild(editarBtn);

        resultadosDiv.appendChild(patrimonioDiv);

    } else {
        //alert("Nenhum patrimônio encontrado.");
        const nopatrimonioDiv = document.createElement("div");
        nopatrimonioDiv.className = "error";
        nopatrimonioDiv.innerHTML = `
        <p>Patrimônio não encontrado no registro.</p>
        `;
        resultadosDiv.appendChild(nopatrimonioDiv);
    }
}
function editarPatrimonio(patrimonio, patrimonioDB) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpa a exibição anterior

    const form = document.createElement("form");
    form.innerHTML = `
        <input type="text" id="editNome" value="${patrimonio.nome}" placeholder="Nome do Patrimônio" required />
        <input type="text" id="editCodigo" value="${patrimonio.codigo}" placeholder="Código do Patrimônio" required />
        <input type="text" id="editFuncionario" value="${patrimonio.funcionario}" placeholder="Nome do Funcionário" required />
        <input type="text" id="editData" value="${patrimonio.data}" required />
        <select id="editSetor" required>
            <option value="Saude" ${patrimonio.setor === "Saude" ? "selected" : ""}>Saúde</option>
            <option value="Educacao" ${patrimonio.setor === "Educacao" ? "selected" : ""}>Educação</option>
            <option value="Urbano" ${patrimonio.setor === "Urbano" ? "selected" : ""}>Urbano</option>
            <option value="Agropecuario" ${patrimonio.setor === "Agropecuario" ? "selected" : ""}>Agropecuário</option>
            <option value="Transporte" ${patrimonio.setor === "Transporte" ? "selected" : ""}>Transporte</option>
            <option value="Prefeitura" ${patrimonio.setor === "Prefeitura" ? "selected" : ""}>Prefeitura</option>
            <option value="Saneamento" ${patrimonio.setor === "Saneamento" ? "selected" : ""}>Saneamento</option>
            <option value="Esportes" ${patrimonio.setor === "Esportes" ? "selected" : ""}>Esportes</option>
            <option value="Cultura" ${patrimonio.setor === "Cultura" ? "selected" : ""}>Cultura</option>
        </select>
        <input type="text" id="editLocal" value="${patrimonio.local}" required />
        <select id="editStatus" required>
            <option value="Ativo" ${patrimonio.status === "Ativo" ? "selected" : ""}>Ativo</option>
            <option value="Inativo" ${patrimonio.status === "Inativo" ? "selected" : ""}>Inativo</option>
            <option value="Manutencao" ${patrimonio.status === "Manutencao" ? "selected" : ""}>Em manutenção</option>
        </select>
        <button type="button" id="salvarEdicao">Salvar</button>
    `;

    form.querySelector("#salvarEdicao").addEventListener("click", () => {
        const nome = document.getElementById("editNome").value;
        const codigo = document.getElementById("editCodigo").value;
        const funcionario = document.getElementById("editFuncionario").value;
        const data = document.getElementById("editData").value;
        const setor = document.getElementById("editSetor").value;
        const local = document.getElementById("editLocal").value;
        const status = document.getElementById("editStatus").value;

        // Remove mensagens de erro anteriores
        const existingError = resultadosDiv.querySelector(".error");
        if (existingError) resultadosDiv.removeChild(existingError);

        // Verifica campos obrigatórios
        if (!nome || !codigo || !funcionario || !data || !setor || !local || !status) {
            const errorAlerta = document.createElement("div");
            errorAlerta.className = "error";
            errorAlerta.innerHTML = `
                <p>Por favor, preencha todos os campos antes de salvar.</p>
            `;
            resultadosDiv.insertBefore(errorAlerta, form);
            return; // Interrompe o fluxo de salvamento
        }

        // Atualiza o banco de dados
        if (codigo !== patrimonio.codigo) {
            delete patrimonioDB[patrimonio.codigo];
        }

        patrimonioDB[codigo] = { nome, codigo, funcionario, data, setor, local, status };
        localStorage.setItem("patrimonios", JSON.stringify(patrimonioDB));

        alert("Patrimônio atualizado com sucesso!");
        buscarPatrimonio();
    });

    resultadosDiv.appendChild(form);
}

// Evento ao carregar a página
window.onload = () => {
    document.getElementById("btnBuscar").addEventListener("click", buscarPatrimonio);
};
