export default function auth(api) {

  function get() {
    return api.http.get('/identification/', null, api.cache.none);
  }
  
  function touch() {
    return api.http.get('/identification/touch', null, api.cache.none);
  }

  function challenge(userId) {
    return api.http.post('/identification/securitytoken/challenge', {
      useEasyLogin: false,
      userId
    });
  }

  function authenticate(response) {
    return api.http.post('/identification/securitytoken', {response});
  }

  function logout() {
    return api.http.put('/identification/logout');
  }

  api.auth = {
    get,
    touch,
    challenge,
    authenticate,
    logout
  };

  return api;
}
