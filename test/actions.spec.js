import * as AppActions from '../app/actions/app-actions'
var expect = require('chai').expect;

describe('app-actions test', () => {
  it('should update network status', () => {
    const expectedAction = {
      type: 'CONNECTION_STATUS_CHANGED',
      connectionType: 'wifi'
    }
    expect(AppActions.updateNetworkStatus('wifi')).to.deep.equal(expectedAction);
  })
})
