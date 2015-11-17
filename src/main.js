import Api from './api';
import auth from './api.auth';
import search from './api.search';

export default function (http) {
  return new Api(http)
    .mixin(auth)
    .mixin(search);
}