export const MemberReducer = (state: any = {members: []}, action: any) => {
   switch(action.type){
    case 'ADD_MEMBER':
        const {id,data}= action.payload;
        return {
            ...state,
            members: [
                ...state.members,
                {
                    id: id,
                    data: data
                }
            ]
        }
   
   case 'REMOVE_MEMBER':
        return {members: action.payload};

    default: return state;
   }
}



