import * as Utils from '../app/utils/utils';

describe('Utility functions', () => {
	it('should check if isToday', () => {
		var today = new Date();
		expect(Utils.isToday(today)).to.be.true;
	});

	it('should return the correct timestamp of start of a date', () => {
		var date = new Date(2016, 7, 28);	// Aug 28, 2016
		expect(date.getTime()).to.equal(1472356800000);
	});

});

