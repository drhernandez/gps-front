import { TOGGLE_SIDEBAR, SET_USER_INFO, REMOVE_USER_INFO } from './types';

function toogleSidebarAction() {
  return {
    type: TOGGLE_SIDEBAR
  }
}

function setUserInfoAction(userInfo) {
  return {
    type: SET_USER_INFO,
    payload: userInfo
  }
}

function removeUserInfoAction() {
  return {
    type: REMOVE_USER_INFO
  }
}

export {
  toogleSidebarAction,
  setUserInfoAction,
  removeUserInfoAction
};