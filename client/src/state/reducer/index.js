import { types } from "../actions/types";

const initialState = {
  name: "",
  access: false,
  turn: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    case types.SET_ACCESS: {
      return {
        ...state,
        access: action.payload,
      };
    }

    case types.SET_TURN: {
      return {
        ...state,
        turn: action.payload,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
