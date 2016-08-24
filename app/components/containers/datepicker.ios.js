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
import {changeDate, changeLikedFilter, updateMovieQuery} from '../../actions/toolbar-actions'

class DatePicker extends Component {

	state: {datePickerDate: Date, likedSwitch: boolean};
	_onDateChange: Function;
	_toggleLikedFilter: Function;

  constructor(props) {
    super(props);
    this._onDateChange = this._onDateChange.bind(this);
    let {mSince, likedFilter} = this.props;
    this.state = {
      datePickerDate: mSince === 0? new Date() : new Date(mSince),
			likedSwitch: false
    }
  }

  componentDidMount() {
    console.log('date picker mount');
  }

  componentWillUnmount() {
    let {dispatch, movieQuery: {order, query, liked, count}, movieData: {movies}} = this.props;
    let movieQuery = {
      count: count,
      order: order,
      query: query,
			liked: liked
    }
    // dispatch(changeDate(this.state.datePickerDate, movieQuery));
		dispatch(updateMovieQuery("mSince", this.state.datePickerDate));
  }

  render() {
    let {dispatch, mSince, order, query, movieData: {movies}} = this.props;

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
		let {dispatch} = this.props;
		this.setState({
			likedSwitch: flag
		});
		dispatch(changeLikedFilter(flag));
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
  return state.movieList;
}

export default connect(mapStateToProps)(DatePicker);
