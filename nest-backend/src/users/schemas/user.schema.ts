import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ type: String, required: true, unique: true })
  username: string;
  
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [Types.ObjectId], ref: 'Book', default: [] })
  owned: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Book', default: [] })
  favorites: Types.ObjectId[];

  @Prop({ type: Number, enum: [0, 1, 2], default: 0 })
  tier: number;

  @Prop({ type: String, default: '' })
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', { flattenObjectIds: true, versionKey: false });
UserSchema.set('toObject', { flattenObjectIds: true, versionKey: false });
