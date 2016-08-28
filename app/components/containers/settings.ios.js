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

class Settings extends Component {

	state: {startDate: Date, endDate: Date, likedSwitch: boolean, endDateFilterSwitch: boolean};
	_onStartDateChange: Function;
	_onEndDateChange: Function;
	_toggleLikedFilter: Function;
	_toggleEndDateFilter: Function;

  constructor(props) {
    super(props);
    this._onStartDateChange = this._onStartDateChange.bind(this);
		this._onEndDateChange = this._onEndDateChange.bind(this);
		this._toggleLikedFilter = this._toggleLikedFilter.bind(this);
		this._toggleEndDateFilter = this._toggleEndDateFilter.bind(this);

    let {startDate, likedFilter} = this.props;
    this.state = {
      startDate: startDate === 0? new Date() : new Date(startDate),
			endDate: new Date(),
			likedSwitch: likedFilter,
			endDateFilterSwitch: false
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
		let {dispatch, startDate, count, likedFilter, query, order} = this.props;
    // dispatch(changeDate(this.state.startDate, movieQuery));
		let newQuery = {
			likedFilter,
			query,
			order,
			count: 10,	// reset count to 10 every time startDate is changed
			startDate: this.state.startDate.getTime()	// convert to number?
		}
		console.log(newQuery);
		dispatch(updateMovieQuery(newQuery, true));
  }

  render() {
    let {dispatch, startDate, liked} = this.props;

    return (
			<View>
				<View style={styles.datePickerContainer}>
					<DatePickerIOS
							date={this.state.startDate}
							mode="date"
							onDateChange={this._onStartDateChange}
						/>
					{
						this.state.endDateFilterSwitch ?
						<DatePickerIOS
								date={this.state.endDate}
								mode="date"
								onDateChange={this._onEndDateChange}
							/>
						:
						null
					}
				</View>
				<View style={styles.switchContainer}>
					<View style={styles.optionRow}>
						<Text style={styles.optionHint}>Show end date filter?</Text>
						<Switch
							onValueChange={this._toggleEndDateFilter}
							value={this.state.endDateFilterSwitch} />
					</View>
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

	_toggleEndDateFilter(flag: boolean) {
		this.setState({
			endDateFilterSwitch: flag
		});
	}

	_toggleLikedFilter(flag: boolean) {
		let {dispatch, startDate, count, likedFilter, query, order} = this.props;
		this.setState({
			likedSwitch: flag
		});
		let newQuery = {
			likedFilter: flag,
			count,
			query,
			order,
			startDate
		};
		dispatch(updateMovieQuery(newQuery, false));
	}

  _onStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }
	_onEndDateChange(date) {
		this.setState({
			endDate: date
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
		marginTop: 5,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

function mapStateToProps(state) {
  return state.movieList.movieQuery;
}

export default connect(mapStateToProps)(Settings);
