const { env } = require('@/config/environment.config')
const { ApiError } = require('@/utils/apiError.utils')
const { verifyToken } = require('@/utils/jwtProvider.utils')
const { StatusCodes } = require('http-status-codes')

const isAuthorized = async (req, res, next) => {
  // 1. Lấy access token nằm trong request cookie phía client - withCredentials trong file
  // authorizeAxios and credentials in CORS
  const accessTokenFromCookie = req.cookies?.accessToken
  if (!accessTokenFromCookie) {
    next(
      new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Token not found)')
    )
    return
  }

  try {
    // Bước 1: Thực hiện giải mã tokverifyTokenen xem nó có hợp lệ hay là không
    const accessTokenDecoded = await verifyToken(
      accessTokenFromCookie,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    )
    // Bước 2: Quạn trọng: Nếu như cái token hợp lệ, thì sẽ cần phải lưu thông tin
    // giải mã được vào cái req.user, để sử dụng cho các tầng cần xử lý ở phía sau
    req.user = accessTokenDecoded

    // Bước 3: Cho phép cái request đi tiếp
    next()
  } catch (error) {
    //  Trường hợp lỗi 01: Nếu cái accessToken nó bị hết hạn (expired), thì mình
    // cần trả về một mã lỗi GONE - 410 cho phía FE biết để gọi refresh token
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token'))
      return
    }

    //  Trường hợp lỗi 02: Nếu như cái accessToken nó không hợp lệ cho bất kỳ điều gì
    // khác vụ hết hạn thì chúng ta cứ thẳng tay trả về mã 401 cho phía FE xử lý Logout /hoặc
    // gọi Logout tùy trường hợp.
    next(
      new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Token invalid)')
    )
  }
}

const isAuthorizedAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    next(new ApiError(StatusCodes.FORBIDDEN, 'You are not admin!'))
    return
  }
  next()
}

module.exports.authMiddleware = {
  isAuthorized,
  isAuthorizedAdmin
}
