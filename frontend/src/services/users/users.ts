import { UserDto } from '../../../interfaces/userInterfaces';
import { $api } from '../api';

export interface UpdateUserPayload {
    username: string
    name: string,
    email: string
    address:string,
    phone_number: string,
}

export const updateUser = async (payload: UpdateUserPayload) => {
    try {
        const response = await $api.put<UserDto>(`/users/update`, payload);

        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};