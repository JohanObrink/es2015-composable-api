export default function search(api) {
  
  function touch() {
    return api.http.get('/identification/touch', null, api.cache.none);
  }

  function challenge(userId) {
    return api.http.post('/identification/securitytoken/challenge', {
      useEasyLogin: false,
      userId: userId
    });
  }

  api.auth = {
    touch,
    challenge
  };

  return api;
}
