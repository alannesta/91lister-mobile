import * as API from '../app/api'
var utils = require('../app/utils/utils');

describe('api', () => {
	var fetchSpy;
	var startOfTodayTimestampStub;

	before(function() {
		fetchSpy = sinon.spy(global, 'fetch');
		startOfTodayTimestampStub = sinon.stub(utils, 'startOfTodayTimestamp').returns(20000);

	});

	after(function() {
		global.fetch.restore();
		startOfTodayTimestampStub.restore();
	});

	it('fetchmovie api should use defualt params and return a collection of movies', () => {
		var expectedMovies = MOCK_MOVIES;
		var defaultFetchParams = {
			count: 10,
			order: 'trend',
			since: 0,
			query: "",
			likedFilter: false,
			to: 20
		};

		var fecthMovieMock = nock(API.BASE_URL)
			.get('/movies')
			.query(defaultFetchParams)
			.reply(200, MOCK_MOVIES);

		// not providing any query params, will call fetch using default params
		return API.fetchMovie().then((movies) => {
			expect(fetchSpy.calledWith(API.BASE_URL + '/movies?count=10&since=0&to=20&order=trend&query=&likedFilter=false')).to.be.true;
			expect(movies).to.deep.equal(MOCK_MOVIES);
		});
	});

	it('fetchmovie api should use the provided query params and return a collection of movies', () => {
		var expectedMovies = MOCK_MOVIES;
		var options = {
			count: 100,
			order: 'trend',
			query: 'good',
			startDate: 123344,
			likedFilter: true,
			to: 20000
		};
		var fecthMovieMock = nock(API.BASE_URL)
			.get('/movies')
			.query({
				count: 100,
				query: 'good',
				order: 'trend',
				since: 123344 / 1000,
				likedFilter: true,
				to: 20000/1000
			})
			.reply(200, MOCK_MOVIES);

		return API.fetchMovie(options).then((movies) => {
			expect(fetchSpy.calledWith(API.BASE_URL + '/movies?count=100&since=123.344&to=20&order=trend&query=good&likedFilter=true')).to.be.true;
			expect(movies).to.deep.equal(expectedMovies);
		});
	});

	it('should throw correct error when fetch fails', function() {
		var options = {
			count: 100,
			order: 'trend',
			query: 'good',
			startDate: 123344,
			likedFilter: false,
			to: 20000
		};
		var fecthMovieMock = nock(API.BASE_URL)
			.get('/movies')
			.query({
				count: 100,
				query: 'good',
				order: 'trend',
				since: 123344 / 1000,
				likedFilter: false,
				to: 20000/1000
			})
			.reply(401);

		// asset that the correct error will eventually be thrown
		return API.fetchMovie(options).catch(function(err) {
			expect(err.code).to.equal('SESSION_EXPIRED');
		});
	})
});
