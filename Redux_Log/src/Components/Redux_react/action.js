// import * as types from "./actionType"


// const registerRequst = () => ({
//     type:types.REGISTER_REQUEST,
// });

// const registerSuccess=() => ({
//     type:types.REGISTER_SUCCESS,
//     payload:user,
// });

// const registerFailer=() => ({
//     type:types.REGISTER_FAILURE,
//     payload:error,
// });

// export const registerInitiate = (email, password, name) => {
//     return function (dispatch){
//         dispatch(registerRequst());
//         auth.createUser(email, password).then(({user}) => {
//             user.updateProfile({
//                 name
//             })
//             dispatch(registerSuccess(user));
//         }).catch((error) => dispatch(registerFailer(error.message)) );
//     }
// }
