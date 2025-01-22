import mongoose, { Document, Schema } from "mongoose";
import { Credentials } from "google-auth-library";

export interface IUser extends Document {
    userId: string;
    tokens: Credentials;
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        tokens: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the User model
export default mongoose.model<IUser>("User", UserSchema);
