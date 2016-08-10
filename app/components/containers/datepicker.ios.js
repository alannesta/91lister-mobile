import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
  InteractionManager,
  Dimensions,
	DatePickerIOS
} from 'react-native';

import { connect } from 'react-redux'
import {changeDate} from '../../actions/toolbar-actions'

class DatePicker extends Component {

  constructor(props) {
    super(props);
    this._onDateChange = this._onDateChange.bind(this);
    let {mSince} = this.props;
    this.state = {
      datePickerDate: mSince === 0? new Date() : new Date(mSince)
    }
  }

  componentDidMount() {
    console.log('date picker mount');
  }

  componentWillUnmount() {

    let {dispatch, order, query, movieData: {movies}} = this.props;
    let movieQuery = {
      count: movies.length,
      order: order,
      query: query
    }
    dispatch(changeDate(this.state.datePickerDate, movieQuery));


  }

  render() {
    let {dispatch, mSince, order, query, movieData: {movies}} = this.props;

    return (
      <View style={styles.datePickerContainer}>
        <DatePickerIOS
            date={this.state.datePickerDate}
            mode="date"
            // timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this._onDateChange}
          />
      </View>
    )
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
		height: WINDOW_HEIGHT-60,
		// flex: 1,
		marginTop: 60
  },
})

function mapStateToProps(state) {
  return state.movieList;
}

export default connect(mapStateToProps)(DatePicker);
