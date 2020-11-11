import mongoose from 'mongoose';
import chapterSchema from '../../schema/reader/chapter.schema';

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;