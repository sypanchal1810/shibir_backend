import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  shibirId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.]+[a-zA-Z]{2,5}$/g,
  })
  email: string;

  @Prop({ required: false, minlength: 8, select: false })
  password: string;

  @Prop({ required: false, select: false })
  passwordConfirm: string;

  @Prop({ select: false })
  createdAt: Date;

  @Prop({ select: false })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
