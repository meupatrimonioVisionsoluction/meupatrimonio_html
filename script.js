document.getElementById("loginButton").addEventListener("click", function() {
    // Credenciais válidas
    const validEmail = "eric@gmail.com";
    const validSenha = "123456";

    // Obtendo os valores inseridos pelo usuário
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const errorMessage = document.getElementById("errorMessage");

    // Verifica se o email e a senha estão corretos
    if (email === validEmail && senha === validSenha) {
        // Redireciona para outra página se as credenciais estão corretas
        window.location.href = "screens/page1/index.html";
    } else {
        // Exibe uma mensagem de erro se as credenciais estão incorretas
        errorMessage.style.display = "block";
    }
});