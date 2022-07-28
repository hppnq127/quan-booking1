import io from 'socket.io-client'
import { URL_BOOKING_STUDIO } from '../../../../setup/URL'
export const socket = io(`${URL_BOOKING_STUDIO?.slice(0,-4)}`)

