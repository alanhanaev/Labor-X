export default (values) => {
  const password = (values.password || '').trim()

  return {
    password: password ? null: 'LoginForm.invalidPassword',
  }
}
