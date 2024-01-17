import mongoose from 'mongoose';

const callIdSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CallIdModel = mongoose.model('CallId', callIdSchema);

export default CallIdModel;
