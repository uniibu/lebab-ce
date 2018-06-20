import lebab from 'lebab';
export default (ctx, inject) => {
  ctx.$lebab = lebab;
  inject('lebab', lebab);
};
