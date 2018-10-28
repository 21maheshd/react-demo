export const UPDATE_USER = 'users:updateUser';

export default function updateUser(newUser){
    return {
        type: UPDATE_USER,
        payload:{
            user: newUser
        }
    }
}