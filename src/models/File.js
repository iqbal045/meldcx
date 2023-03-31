const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    file_url: {
      type: String,
      required: true,
    },
    public_key: {
      type: String,
      required: true,
    },
    private_key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

fileSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
  },
});

exports.File = mongoose.model('File', fileSchema);
