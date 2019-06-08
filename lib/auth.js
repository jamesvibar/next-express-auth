const WINDOW_USER_SCRIPT_VARIABLE = '__USER__'

export const getUserScript = user => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)};`
}

export const getSessionFromServer = req => {
  if (req.user) {
    return { user: req.user }
  }
  return {}
}

export const getSessionFromClient = () => {
  if (typeof window !== 'undefined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {}
    return { user }
  }
  return { user: {} }
}
