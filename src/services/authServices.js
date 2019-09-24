import http from './httpService';
import { apiUrl } from '../config.json'

const endpoint = `${apiUrl}/auth`
const token = ''

http.setJwt(getToken())

export function getToken() {
    return localStorage.getItem(token)
}