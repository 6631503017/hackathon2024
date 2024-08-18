import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {

    @Prop({ type: String, required: true })
    title: string;
  
    @Prop({ type: Number, required: true })
    price: number;
  
    @Prop({ type: String, default: '' })
    image: string;
  
    @Prop({ type: [String], default: [] })
    tags: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.set('toJSON', { flattenObjectIds: true, versionKey: false });
BookSchema.set('toObject', { flattenObjectIds: true, versionKey: false });
