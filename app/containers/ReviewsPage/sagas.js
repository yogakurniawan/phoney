/**
 * Gets list of smartphone brands.
 */

import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_DEVICE_BY_NAME, BASE_API_URL } from 'containers/App/constants';
import { setSelectedDevice, getDeviceByNameError } from 'containers/App/actions';

import {
  LOAD_DEVICE_DETAIL,
  DEVICE_DETAIL_URL,
} from './constants';
import {
  deviceDetailLoaded,
  loadDeviceDetailError,
} from './actions';

/**
 * Products list request/response handler
 */
export function* getDeviceDetail(action) {
  try {
    // Call our request helper (see 'utils/request')
    const { device, brand } = action;
    const queryParams = {
      token: 'eb3db7ab3339d4512b4367490772366fb16d89a5112bb254',
      brand,
      device,
    };

    const response = yield call(request, DEVICE_DETAIL_URL, {
      queryParams,
    });

    yield put(deviceDetailLoaded(response));
  } catch (err) {
    yield put(loadDeviceDetailError(err));
  }
}

export function* getDeviceByName(action) {
  try {
    // Call our request helper (see 'utils/request')
    const queryParams = {
      'filter[where][keyword]': action.brand ? action.brand.toLowerCase() : action.brand,
      'filter[where][name]': action.name,
    };

    const device = yield call(request, `${BASE_API_URL}/items`, {
      queryParams,
    });

    yield put(setSelectedDevice(device));
  } catch (err) {
    yield put(getDeviceByNameError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* deviceDetail() {
  // Watches for LOAD_PRODUCTS actions and calls getProducts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  yield fork(takeLatest, LOAD_DEVICE_DETAIL, getDeviceDetail);
  yield fork(takeLatest, LOAD_DEVICE_BY_NAME, getDeviceByName);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
}

deviceDetail.isDaemon = true;

// Bootstrap sagas
export default [
  deviceDetail,
];
