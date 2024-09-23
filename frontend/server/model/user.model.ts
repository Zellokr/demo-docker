import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nombre: String,
});

export const User = model("usuarios", UserSchema);