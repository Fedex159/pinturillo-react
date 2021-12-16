import { types } from "../actions/types";

const initialState = {
  name: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
