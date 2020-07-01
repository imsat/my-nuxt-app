export default function (context) {
  // console.log('[MIDDLEWARE]: JUST AUTH' )
  if(!context.store.getters.isAuthenticated){
    context.redirect('/admin/auth')
  }
}
