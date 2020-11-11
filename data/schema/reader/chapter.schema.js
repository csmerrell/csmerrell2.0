import { Schema } from 'mongoose';

const chapterSchema = new Schema({
    title: { type: String, required: true },
    number: { type: Number, required: true },
});

export default chapterSchema;