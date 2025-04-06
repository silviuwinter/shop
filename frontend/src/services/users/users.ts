import { UserDto } from '../../../interfaces/userInterfaces';
import { $api } from '../api';

export interface UpdateUserPayload {
    username: string, // the user's username
    name: string, // the user's full name
    email: string, // the user's email address
    address: string, // the user's home address
    phone_number: string, // the user's phone number
}

export const updateUser = async (payload: UpdateUserPayload) => {
    try {
        const response = await $api.put<UserDto>(`/users/update`, payload); // sends updated user info to the server

        return response.data; // returns the updated user data
    } catch (error) {
        console.error('Error updating user:', error); // logs if something goes wrong
        throw error; // re-throws the error so it can be handled elsewhere
    }
};