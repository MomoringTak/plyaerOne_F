import { v4 as uuidv4 } from "uuid";

//입력된 날짜 추가해야됨. 추 후 예정. DB 저장 ㄱㄱ
export const initialState = {
  comments: []
};

export const ADD = "add";
export const DEL = "del";

const reducer = (state, action) => {
  const date = new Date();
  const CURRENT_TIME = date.toUTCString();
  switch (action.type) {
    case ADD:
      return {
        ...state,
        comments: [
          ...state.comments,
          { text: action.payload, time: CURRENT_TIME, id: uuidv4() }
        ]
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
