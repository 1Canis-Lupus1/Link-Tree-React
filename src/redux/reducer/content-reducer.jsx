import { ADD_ENTRY, EDIT_ENTRY, DELETE_ENTRY, ADD_ID } from "../action";

const contentData = {
  id:'',
  contents: []
};

export const contentReducer = (state = contentData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_ENTRY: {
      newState.contents=[...newState.contents,action.payload.content]
      break;
    }
    case EDIT_ENTRY: {
      newState.contents.map(id=>{
        if(id.content._id === action.payload.content._id){
          if (action.payload.content.type === "title") {
            id.content.title = action.payload.content.value;
          } else if (action.payload.content.type === "type") {
            id.content.url = action.payload.content.value;
          } else if (action.payload.content.type === "status") {
            id.status = action.payload.content.value;
          }
        }
      })
      break;
    }
    case DELETE_ENTRY: {
      newState.contents = newState.contents.filter(
        (id) =>id.content._id !== action.payload._id
      );
      break;
    }
    case ADD_ID:{
      newState.id = action.payload._id;
      break;
    }
    default: {
    }
  }
  return newState;
};
