
import axios from 'axios'

const urlBase = 'https://api.themoviedb.org/3/search'

/**
 * @param {string}  url url a la cual consultar
 * esta funcion detecta si es una nueva url base (comienza con http:// o https://).
 * en caso de ser asi, retorna la url. en caso contrario, se asume que es un fragmento
 * de path por lo que se concatena con la constante urlBase
 **/
const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://') ? url : `${urlBase}/${url}`

const get = (url = '', headers = {}) => axios.get(readUrl(url), {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  }
})

const post = (url = '', body = {}, headers = {}) => axios.post(readUrl(url), body, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  }
})

const put = (url = '', body = {}, headers = {}) => axios.put(readUrl(url), body, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  }
})

const del = (url = '', headers = {}) => axios.delete(readUrl(url), {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers
  }
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  put,
  delete: del,
}
