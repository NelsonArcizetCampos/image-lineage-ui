<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Função para verificar se o usuário está autenticado
  function isAuthenticated() {
    // Exemplo: Verifica se há um token no localStorage
    const token = localStorage.getItem('authToken');
    return !!token; // Retorna true se o token existir, caso contrário, false
  }

  // Verifica o estado de autenticação ao carregar o layout
  onMount(() => {
    const isLoggedIn = isAuthenticated();

    // Se o usuário não estiver logado e não estiver na página de login, redireciona para /login
    if (!isLoggedIn && $page.url.pathname !== '/login') {
      goto('/login');
    }

    // Se o usuário estiver logado e tentar acessar a página de login, redireciona para a página inicial (ex: /dashboard)
    if (isLoggedIn && $page.url.pathname === '/login') {
      goto('/');
    }
  });
</script>

<slot />
