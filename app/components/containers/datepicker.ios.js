/*
	@flow weak
*/
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
  InteractionManager,
  Dimensions,
	DatePickerIOS,
	Switch
} from 'react-native';

import { connect } from 'react-redux'
import {updateMovieQuery} from '../../actions/toolbar-actions'

class DatePicker extends Component {

	state: {datePickerDate: Date, likedSwitch: boolean};
	_onDateChange: Function;
	_toggleLikedFilter: Function;

  constructor(props) {
    super(props);
    this._onDateChange = this._onDateChange.bind(this);
		this._toggleLikedFilter = this._toggleLikedFilter.bind(this);

    let {mSince, liked} = this.props;
    this.state = {
      datePickerDate: mSince === 0? new Date() : new Date(mSince),
			likedSwitch: liked
    }
  }

  componentDidMount() {
    console.log('date picker mount');
  }

  componentWillUnmount() {
		let {dispatch, mSince, count, liked, query, order} = this.props;
    // dispatch(changeDate(this.state.datePickerDate, movieQuery));
		let newQuery = {
			liked,
			query,
			order,
			count: 10,	// reset count to 10 every time mSince is changed
			mSince: this.state.datePickerDate.getTime()	// convert to number?
		}
		dispatch(updateMovieQuery(newQuery, true));
  }

  render() {
    let {dispatch, mSince, liked} = this.props;

    return (
			<View>
				<View style={styles.datePickerContainer}>
					<DatePickerIOS
							date={this.state.datePickerDate}
							mode="date"
							// timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
							onDateChange={this._onDateChange}
						/>
				</View>
				<View style={styles.switchContainer}>
					<View style={styles.optionRow}>
						<Text style={styles.optionHint}>Only show liked movies?</Text>
						<Switch
							onValueChange={this._toggleLikedFilter}
							value={this.state.likedSwitch} />
					</View>
				</View>
			</View>
    )
  }

	_toggleLikedFilter(flag: boolean) {
		let {dispatch, mSince, count, liked, query, order} = this.props;
		this.setState({
			likedSwitch: flag
		});
		let newQuery = {
			liked: flag,
			count,
			query,
			order,
			mSince
		}
		dispatch(updateMovieQuery(newQuery, false));
	}

  _onDateChange(date) {
    this.setState({
      datePickerDate: date
    });
  }
}

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  datePickerContainer: {
		marginTop: 60
  },
	switchContainer: {
		marginTop: 20,
		padding: 15,
	},
	optionHint: {
		fontSize: 18
	},
	optionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

function mapStateToProps(state) {
  return state.movieList.movieQuery;
}

export default connect(mapStateToProps)(DatePicker);
