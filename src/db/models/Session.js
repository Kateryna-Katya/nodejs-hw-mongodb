import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
sessionSchema.post('save', handleSaveError);
sessionSchema.post('findOneAndUpdate', handleSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateSetting);

export const Session = model('session', sessionSchema);
