import axios from 'axios'

export const doGetCookieAxios = (url, token) => {
  return axios({
    url: url,
    method: 'get',
    headers: {
      myToken: token
    }
  })
}
