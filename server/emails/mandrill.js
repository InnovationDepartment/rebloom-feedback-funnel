const mandrill = require('mandrill-api/mandrill')
const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY)
const path = require('path')
const ejs = require('ejs')

const reviewRequest = async payload => {
  const { email, comment } = payload

  const content = await ejs.renderFile(path.join(__dirname, '/review-request.ejs'), {
    comment,
  })

  await genericEmail({
    to: [
      {
        email,
      },
    ],
    subject: 'Thanks for your feedback!',
    tags: ['feedback'],
    content,
  })
}
const reviewReminder = async payload => {
  const { email, comment } = payload

  const content = await ejs.renderFile(path.join(__dirname, '/review-reminder.ejs'), {
    comment,
  })

  await genericEmail({
    to: [
      {
        email,
      },
    ],
    subject: 'Your reBloom bonus order is on the way!',
    tags: ['feedback'],
    content,
  })
}

const genericEmail = payload => {
  const { to, subject, tags, content, send_at, from_email } = payload

  const message = {
    to,
    subject,
    from_email: from_email || 'hello@rebloom.com',
    from_name: 'The reBloom Team',
    tags,
    merge_language: 'handlebars',
    global_merge_vars: [
      {
        name: 'CONTENT',
        content: content,
      },
    ],
  }

  return new Promise((res, rej) => {
    mandrill_client.messages.sendTemplate(
      {
        template_name: 'review-funnel-email',
        template_content: '',
        message: message,
        send_at,
      },
      res,
      rej
    )
  })
}

module.exports = { reviewReminder, reviewRequest, genericEmail }
