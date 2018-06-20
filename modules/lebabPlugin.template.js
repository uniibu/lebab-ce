import lebab from 'lebab'
export default (ctx, inject) => {
  ctx.$lebab = lebab
  console.log(lebab)
  inject('lebab', lebab)
}
