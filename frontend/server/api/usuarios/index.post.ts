import { User } from "~/server/model/user.model";
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
    // Manejo de las solicitudes POST
    if (event.node.req.method === 'POST') {
        const body = await readBody(event); // Leer el cuerpo de la solicitud

        try {
            // Crear un nuevo usuario
            const newUser = new User({
                nombre: body.nombre // Asegúrate de que el campo 'nombre' esté en el cuerpo de la solicitud
            });

            // Guardar el usuario en la base de datos
            const savedUser = await newUser.save();
            return savedUser; // Devolver el usuario guardado
        } catch (error: any) {
            console.error('Error al insertar usuario:', error);
            return {
                statusCode: 500,
                body: { message: 'Error al insertar usuario' }
            };
        }
    }
});