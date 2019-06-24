export default {
  'existing-entry': {
    header: 'Oops!',
    subheader: 'It seems like you’ve already redeemed  your free 7-bottle pack.',
    body1: 'This offer is only available one time per household.',
  },
  qualify: {
    header: 'Oops!',
    subheader:
      'Unfortunately, you don’t qualify for this offer. In the meantime, get 25% off your next  reBloom order.',
    buttonCopy: 'GET 25% OFF',
    buttonDest: 'http://www.google.com',
    contactInfo: true,
  },
  invalid: {
    header: 'Oops!',
    subheader: 'We can’t seem to find your Order ID in our system.',
    body1:
      'Please contact our support team at help@rebloom.com and we’ll take care of you right away.',
    buttonCopy: 'CONTACT SUPPORT',
    buttonDest: 'mailto:help@rebloom.com',
  },
  'negative-experience': {
    header: 'Oh no!',
    subheader: 'Our goal is to make our customers happy.',
    body1: `We’re so sorry to hear you had a negative experience. Please write to our support team at help@rebloom.com if you have any feedback, questions, or concerns and we’ll be sure to take care of you.`,
    body2: `Want to give it another go? Claim your free reBloom by clicking below.`,
    buttonCopy: 'GET FREE REBLOOM',
    buttonDest: '/address-confirmation',
    buttonDestInternal: true,
  },
  default: {
    header: 'Oops!',
    subheader: 'Something went wrong.',
    body1: 'Please try again.',
  },
}
