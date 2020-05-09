import { toogleSidebarAction, setUserInfoAction, removeUserInfoAction } from "../actions/actions";
import { TOGGLE_SIDEBAR, SET_USER_INFO, REMOVE_USER_INFO } from "../actions/types";

describe("Redux actions", () => {

  it('should create an action to toogle sidebar', () => {
    expect(toogleSidebarAction()).toEqual({type: TOGGLE_SIDEBAR});
  })

  it('should create an action to set user info', () => {
    const userInfo = {
      id: 1,
      name: test
    }
    expect(setUserInfoAction(userInfo)).toEqual({ type: SET_USER_INFO, payload: userInfo });
  })

  it('should create an action to remove user info', () => {
    expect(removeUserInfoAction()).toEqual({ type: REMOVE_USER_INFO });
  })
})

