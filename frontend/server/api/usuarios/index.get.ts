import {User} from "~/server/model/user.model";

export default defineEventHandler(async (event) => {
    try {
        return await User.find()
    } catch (error: any) {
        console.error('Error al obtener usuarios:', error);
        return {
            statusCode: 500,
            body: { message: 'Error al obtener usuarios' }
        };
    }
});