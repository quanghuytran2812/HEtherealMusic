const { env } = require('@/config/environment.config')
const SibApiV3Sdk = require('@getbrevo/brevo')

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
let apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async (data) => {
  // Khởi tạo một cái sendSmtpEmail với những thông tin cần thiết
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  // Tài khoản gửi mail: Lưu ý địa chỉ admin email phải là cái email mà các bạn tạo tài khoản trên Brevo
  sendSmtpEmail.sender = { name: env.ADMIN_EMAIL_NAME, email: env.ADMIN_EMAIL_ADDRESS }

  // Những tài khoản nhận email
  sendSmtpEmail.to = [{ email: data.recipientEmail }]

  // Tiêu đề của email
  sendSmtpEmail.subject = data.subject

  // Nội dung email dạng HTML
  sendSmtpEmail.htmlContent = data.htmlContent

  return await apiInstance.sendTransacEmail(sendSmtpEmail)
}

module.exports.BrevoEmail = {
  sendEmail
}