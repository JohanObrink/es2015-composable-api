import getApi from '../src/main';

describe('api', () => {
  var api, http;

  beforeEach(() => {
    http = sinon.spy();
    api = getApi(http);
  });
	it('runs', () => {
    api.auth.touch();
    expect(http).calledOnce.calledWith('');
  });
});