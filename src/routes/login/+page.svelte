<script lang="ts">
  import { goto } from '$app/navigation'
  import { createClient } from '@supabase/supabase-js'
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

  let email = ''
  let password = ''
  let error = ''

  async function handleLogin(event: Event) {
    event.preventDefault()
    error = ''

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError) {
      error = loginError.message || 'Erro ao fazer login.'
      return
    }

    // Guarda o token localmente se quiseres
    localStorage.setItem('authToken', data.session.access_token)

    // Redireciona após login
    goto('/')
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

