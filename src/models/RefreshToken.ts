import mongoose, { Schema, Document, Model } from "mongoose";

interface IRefreshToken extends Document {
    userId: mongoose.Types.ObjectId;
    tokenId: string; // random UUID
    expiresAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tokenId: { type: String, required: true, unique: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

const RefreshToken: Model<IRefreshToken> =
    mongoose.models.RefreshToken ||
    mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
