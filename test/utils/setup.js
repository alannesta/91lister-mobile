/*
 Test set up and expose globals
 */
global.expect = require('chai').expect;
global.fetch = require('isomorphic-fetch');
global.nock = require('nock');
global.sinon = require('sinon');

var utils = require('../../app/utils/utils');

global.MOCK_MOVIES = [{
	id: 1,
	name: "mock movie 0",
	url: "wwww.mock.com",
	liked: "false"
}, {
	id: 2,
	name: "mock movie 1",
	url: "wwww.mock.com",
	liked: "true"
}, {
	id: 3,
	name: "mock movie 2",
	url: "wwww.mock.com",
	liked: "false"
}];
