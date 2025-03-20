<script>
  import { goto } from '$app/navigation';

  // URL da API (definida no ambiente ou padrão para localhost:8080)
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // Estado do formulário
  let email = '';
  let password = '';
  let error = ''; // Mensagem de erro, se houver

  // Função para lidar com o envio do formulário
  async function handleLogin(event) {
    event.preventDefault(); // Evita o recarregamento da página

    try {
      // Faz a requisição para a API de login
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        const data = await response.json();

        // Armazena o token no localStorage (ou em cookies, se preferir)
        localStorage.setItem('authToken', data.token);

        // Redireciona o usuário para a página inicial (ex: /dashboard)
        goto('/');
      } else {
        // Exibe mensagem de erro se a autenticação falhar
        const errorData = await response.json();
        error = errorData.message || 'Erro ao fazer login. Verifique suas credenciais.';
      }
    } catch (err) {
      // Exibe mensagem de erro em caso de falha na requisição
      error = 'Erro ao conectar ao servidor. Tente novamente mais tarde.';
    }
  }
</script>

<style>
  .login-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .login-form h2 {
    text-align: center;
  }
  .login-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .login-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .login-form button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
</style>

<div class="login-form">
  <h2>Login</h2>
  <form on:submit={handleLogin}>
    <input
      type="email"
      bind:value={email}
      placeholder="E-mail"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="Senha"
      required
    />
    <button type="submit">Entrar</button>
  </form>
  {#if error}
    <div class="error">{error}</div>
  {/if}
</div>
