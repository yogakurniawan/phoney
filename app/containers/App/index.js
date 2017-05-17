/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import * as productActions from 'containers/ProductsPage/actions';
import * as deviceDetailActions from 'containers/DeviceDetailPage/actions';
import * as actions from './actions';
import * as selectors from './selectors';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 0 16px;
  margin-top: 50px;
`;

class App extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { findAllDevices } = this.props;
    console.log('called');
    findAllDevices();
  }

  onSuggestionSelected = (evt, { suggestion, suggestionValue }) => {
    const { setSelectedDevice, pushState, loadDevice, getDeviceByName } = this.props;
    pushState(`/detail?brand=${encodeURIComponent(suggestion.keyword)}&device=${encodeURIComponent(suggestionValue)}`);
    setSelectedDevice(suggestion);
    loadDevice(suggestion.keyword, suggestionValue);
    getDeviceByName(suggestion.keyword, suggestionValue);
  }

  render() {
    const { children, allDevices } = this.props;
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s"
          defaultTitle="Phone Catalogues - Handset list, details, specifications and information"
          meta={[
            { name: 'robot', content: 'all' },
            { name: 'keywords', content: 'GSM,mobile,phone,Nokia,Sony Ericsson,Apple,iPhone,Siemens,Motorola,Alcatel,Panasonic,Samsung,cellphone,specifications,information,info,opinion,review,pictures,photos' },
            { name: 'description', content: 'Phone Catalogues - The complete resource for Handset list, details, specification and information' },
          ]}
        />
        <Header onSuggestionSelected={this.onSuggestionSelected} allDevices={allDevices} />
        <ContentWrapper>
          {React.Children.toArray(children)}
        </ContentWrapper>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  findAllDevices: React.PropTypes.func,
  setSelectedDevice: React.PropTypes.func,
  pushState: React.PropTypes.func,
  loadDevice: React.PropTypes.func,
  getDeviceByName: React.PropTypes.func,
  allDevices: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

const mapDispatchToProps = {
  findAllDevices: productActions.findAllDevices,
  setSelectedDevice: actions.setSelectedDevice,
  pushState: push,
  loadDevice: deviceDetailActions.loadDevice,
  getDeviceByName: actions.loadDeviceByName,
};

const mapStateToProps = createStructuredSelector({
  allDevices: selectors.allDevices(),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
