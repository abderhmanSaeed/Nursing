export const CONFIG = {
  auth: {
    name: 'auth', route: '/auth',
    children: {
      login: { name: 'login', route: '/auth/login' },
      register: { name: 'register', route: '/auth/register' },
    }
  },
  dashboard: {
    name: 'dashboard', route: '/dashboard',
    children: {
      home: { name: 'home', route: '/dashboard/home' },
    }
  },
  about: { name: 'About', route: '/about', },
  contact: { name: 'contact', route: '/contact', },
  user: {
    name: 'user', route: '/user',
    children: {
      users: { name: 'users', route: '/user/users' },
    }
  },
  request: {
    name: 'request', route: '/request',
    children: {
      requests: { name: 'requests', route: '/request/requests' },
    }
  },
};
