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
        comments: [
          ...state.comments,
          {
            description: action.payload.commentText,
            createdAt: action.payload.createdAt,
            uuid: action.payload.id
          }
        ]
      };
    case DEL:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.uuid !== action.payload
        )
      };

    default:
      return;
  }
};

export default reducer;
