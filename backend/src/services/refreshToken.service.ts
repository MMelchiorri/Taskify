import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

export function refreshTokenService() {
  const jti = uuidv4()
  const expiresIn = 3600 // Token valid for 1 hour
  const token = jwt.sign({ jti }, process.env.JWT_SECRET_REFRESH_TOKEN!, {
    expiresIn,
  })

  return { jti, token, expiresIn }
}
