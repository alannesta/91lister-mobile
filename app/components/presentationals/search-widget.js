/*
	@flow weak
*/
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	Platform
} from 'react-native';

export default class SearchWidget extends Component {
	//flow
	state: {query: string};

	constructor(props) {
		super(props);
    this.state = {
      query: this.props.query
    }
	}

	render() {
    return (
      <View style={styles.searchWidget}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={this.state.query}
          onChangeText={(userQuery) => {this.setState({query: userQuery})}}
					autoCapitalize={'none'}
					autoCorrect={false}
          />
          <TouchableOpacity
            accessibilityTraits="button"
            onPress={() => {this.props.onSearch(this.state.query)}}
            style={styles.searchButton}
            activeOpacity={0.5}
            >
            <Text>Search</Text>
          </TouchableOpacity>
      </View>
    )
	}
}

const iosStyle = {
  searchWidget: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    width: 180,
		height: 25,
		backgroundColor: '#ededed'
  },
	searchButton: {
		marginLeft: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1.5,
		borderColor: 'grey',
		borderRadius: 4,
		paddingRight: 5,
		paddingLeft: 5,
		height: 25
	}
}

const androidStyle = {
  searchWidget: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    marginTop: 10,
    width: 180
  },
	searchButton: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		borderWidth: 1.5,
		borderColor: 'grey',
		borderRadius: 4,
		paddingRight: 5,
		paddingLeft: 5,
		height: 25
	}
}

const stylesheet = Platform.OS === 'ios'? iosStyle: androidStyle;

const styles = StyleSheet.create(stylesheet);

// using React.proptypes instead of flow for simplicity (this is a runtime check)
SearchWidget.propTypes = {
	query: React.PropTypes.string,
	onSearch: React.PropTypes.func
}
