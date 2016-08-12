export default (state='', action) => {
  switch (action.type) {
    case 'User_Id_Changed':
      return action.userId;
    default:
      return state;
  }
}
