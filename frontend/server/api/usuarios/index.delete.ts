import {User} from "~/server/model/user.model"; // Asegúrate de que esta ruta apunte a tu modelo de usuario

export default defineEventHandler(async (event) => {
    // Manejo de las solicitudes DELETE
    if (event.node.req.method === 'DELETE') {
        const body = await readBody(event); // Leer el cuerpo de la solicitud

        const userId = body._id; // Suponiendo que el ID del usuario se envía en el cuerpo

        try {
            // Eliminar el usuario de la base de datos
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return {
                statusCode: 500,
                body: { message: 'Error al eliminar usuario' }
            };
        }
    }

});