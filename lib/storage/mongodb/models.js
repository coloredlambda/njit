export const user = ({
  email: { type: String, required: true },
  password: { type: String, required: true }
})

export const post = ({
  content: { type: String, required: true },
  imageUrl: { type: String }
})
