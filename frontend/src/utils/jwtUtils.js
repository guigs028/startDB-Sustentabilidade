// Função para decodificar JWT (Base64)
export const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

// Função para pegar a role do usuário do token
export const getUserRole = (token) => {
  const decoded = decodeJWT(token);
  return decoded?.role || decoded?.tipo || null;
};

// Função para redirecionar baseado na role
export const getRedirectPathByRole = (role) => {
  switch (role?.toUpperCase()) {
    case 'GERADOR':
      return '/gerador';
    case 'COLETOR':
      return '/coletor';
    default:
      return '/dashboard';
  }
};
