import mongoose from 'mongoose'

export const user = ({
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export const post = ({
  text: { type: String, required: true },
  imageUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
})

export const passwordResetToken = ({
  token: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '20m'
  }
})
