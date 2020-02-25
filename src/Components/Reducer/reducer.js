import uuid from "uuid/v4";

export const initialState = {
  comments: []
};

export const ADD = "add";
export const DEL = "del";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        comments: [...state.comments, { text: action.payload, id: uuid() }]
      };
    case DEL:
      return {
        ...state,
        comments: state.comments.filter(toDo => toDo.id !== action.payload)
      };

    default:
      return;
  }
};

export default reducer;
