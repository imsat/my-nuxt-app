export default function(context) {
  console.log('[MIDDLEWARE]: CHECK-AUTH' )
  if(process.client) {
    context.store.dispatch('initAuth', null);
  }else {
    context.store.dispatch('initAuth', context.req);
  }
}
