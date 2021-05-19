import multer from 'multer'

export default () => filename => {
  return multer({ dest: 'uploads/' }).single(filename)
}
