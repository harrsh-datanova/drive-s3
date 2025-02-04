import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>("User", UserSchema);
