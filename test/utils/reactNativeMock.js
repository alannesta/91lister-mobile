import React from "react";

const RN = React;

// export const PropTypes = React.PropTypes;
//
// RN.StyleSheet = {
//   create: (style) => style
// };
//
// const createComponent = (type) => {
//   return React.createClass({
//     displayName: type,
//     propTypes: {
//       children: React.PropTypes.node
//     },
//     render() {
//       return <div {...this.props}>{this.props.children}</div>;
//     }
//   });
// };
//
// RN.View = createComponent("View");
// RN.Text = createComponent("Text");
// RN.ActivityIndicatorIOS = createComponent("ActivityIndicatorIOS");
// RN.Image = createComponent("Image");
// RN.TouchableHighlight = createComponent("TouchableHighlight");
// RN.ScrollView = createComponent("ScrollView");

// mock native components...
export const AsyncStorage = {
  init: function() {
    return Promise.resolve('');
  },
  getItem: function() {
    return Promise.resolve('');
  },
  setItem: function(key, item) {
    this[key] = item;
    return Promise.resolve('');
  }
}

export default RN;
