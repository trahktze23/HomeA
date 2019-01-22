import config from '@/config';

const storage = config.userStorage;


function logout() {
  // remove user from local storage to log user out
  storage.removeItem('user');
  location.reload(true);
}
function handleLoginResponse(response) {
  return response.text().then((text) => {
    try {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
        // auto logout if 401 response returned from api
          logout();
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    } catch (err) {
      return { user: null };
    }
  });
}


function login(userLogin, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: userLogin, password }),
  };

  return fetch(`${config.baseUrl}/users/authenticate`, requestOptions)
    .then(handleLoginResponse)
    .then(({ user }) => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        storage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}


function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${config.baseUrl}/users`, requestOptions).then(handleLoginResponse);
}

function getCurrentUser() {
  return storage.getItem('user');
}

function isLoggedIn() {
  if (getCurrentUser()) { return true; }
  return false;
}

export default {
  login,
  logout,
  getAll,
  getCurrentUser,
  isLoggedIn,
};
