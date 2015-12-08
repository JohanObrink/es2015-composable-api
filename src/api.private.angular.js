import api from './api.private';

angular
  .module('api', [])
  .service('api.private', apiService);

apiService.$inject = ['$http'];

function apiService($http) {
  return api($http);
}