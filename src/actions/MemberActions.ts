// export const AddMemberAction = (member: any) => (dispatch: any, getState: any) => {
//     const { Member: { members },
//     } = getState();

//     const hasMember = members.find((i: any) => i.member === member);

//     if(!hasMember && member !== '') {
//         dispatch({
//             type: "ADD_MEMBER",
//             payload: [{id: member, member}, ...members]
//         })
//     }
// }

// export const RemoveMemberAction = (member: any) => (dispatch: any, getState: any) => {
//     const { Member: { members },
//     } = getState();

//     dispatch({
//         type: "REMOVE_MEMBER",
//         payload: members.filter((t: any) => t.id !== member.id)
//     })

// }


// import { ADD_MEMBER, REMOVE_MEMBER } from "../actionType";

// export const AddMemberAction = (member: any) => (dispatch: any, getState: any) => {
//   const {
//     Member: { members },
//   } = getState();

//   const hasMember = members.find((i: any) => i.member === member);

//   if (!hasMember && member !== "") {
//     dispatch({
//       type: ADD_MEMBER,
//       payload: { id: member, member },
//     });
//   }
// };

// export const RemoveMemberAction = (member: any) => (dispatch: any, getState: any) => {
//   const {
//     Member: { members },
//   } = getState();

//   dispatch({
//     type: REMOVE_MEMBER,
//     payload: member.id, // Assuming member has an 'id' property
//   });
// };

export const AddMember = (data: {name: string
    companyName: string;
    status: string;
    notes: string}) => {
    return {
        type: 'ADD_MEMBER',
        payload: {
            id: new Date().getTime.toString(),
            data: data
        }
    }
}

export const RemoveMember = (data: any) => {
    return {
        type: 'REMOVE_MEMBER',
        payload: data
    }
}