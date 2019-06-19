import React from 'react'
import styled from 'styled-components'
import Head from '../components/Head'

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 80px auto;
  padding: 0 5%;
`

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin: 37px 0 53px 0;
`

const MainTitle = styled.h1`
  font-family: 'Silka-Bold';
  font-weight: bold;
  color: ${props => props.theme.colors.purple};
  font-size: 64px;
  margin: 0 0 48px 0;
  text-align: center;
`

const Paragraph = styled.p`
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.colors.purple};
  margin: 0 0 20px 0;
  font-size: 14px;
  text-align: justify;
`

const BoldCopy = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  margin-right: 6px;
`

const StyledLink = styled.a`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${props => props.theme.colors.purple};
`

const PrivacyPolicy = () => (
  <div>
    <Head title="reBloom - Privacy Policy" />
    <ContentContainer>
      <LogoImage src="static/assets/images/logo-purple.png" alt="logo" />
      <MainTitle>Privacy Policy</MainTitle>
      <Paragraph>
        Thank you for visiting reBloom's website (“Website”). reBloom, and its parent company
        Innovative Brands LLC (“Innovative Brands”), are committed to protecting your privacy and
        security as a customer. This Privacy Policy describes the personal information we gather
        about you (e.g. name, address, email address and phone number), what we do with it and the
        safeguards we have in place to protect it. Please note that by using this Website you are
        agreeing to be bound by the terms of this Privacy Policy and our{' '}
        <StyledLink href="/terms-and-conditions">Terms and Conditions</StyledLink>.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Information Collection. </BoldCopy> We only collect personally identifiable
        information about you via this Website when you provide it in connection with a request for
        a product, service, or information. For example, if you decide to place an order we will ask
        you for your address, phone number, email address and payment information. If you decide to
        complete a user registration form, we may ask you for information such as your contact
        information (e.g., name, e-mail address and mailing address) and birth date. We do not share
        your information with unaffiliated third parties unless it is necessary to fulfill our
        responsibilities such as delivering a product that you order. If you would prefer that we
        not collect any personally identifiable information from you, please do not provide us with
        any such information.
      </Paragraph>
      <Paragraph>
        We may also collect, store or accumulate certain non-personally identifiable information
        concerning your use of this Website, such as which pages you frequent. We may use
        non-personally identifiable information for internal business purposes and may from time to
        time share or transfer such aggregate, non-personally identifiable information with our
        affiliates or partners.
      </Paragraph>
      <Paragraph>
        This Website is intended for adults. We do not knowingly collect personal information from
        anyone under the age of 18. If you register with us and we discover you are under the age of
        18, we will delete your personally identifiable information from our files.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Security of Personal Information.</BoldCopy> We maintain administrative, technical
        and physical safeguards to protect against unauthorized access, use, modification and
        disclosure of personal information in our custody and control. We are committed to employing
        reasonable technology in order to protect the security of our Website. However, even with
        the best technology, no website is 100% secure. We will take reasonable measures which we
        believe are appropriate to protect your personal information from loss, misuse, alteration
        or destruction, and, where possible, will ask that any third parties to whom we may transfer
        such information to take comparable steps to protect that security.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Technology.</BoldCopy> There are two technologies commonly used on this site:
        clear gifs and cookies, which we use to monitor the performance and effectiveness of the
        site. "Cookies" are small pieces of information stored by your browser on your computer's
        hard drive. We do not use cookies to obtain any personally identifying information. Please
        be assured that accepting a cookie does not give us access to your computer or personal
        information under any circumstances. Most web browsers automatically accept cookies, but you
        can typically change your browser to prevent this. If you disable cookies, you may be unable
        to use certain aspects of the Website. Clear gifs are tiny graphics with a unique
        identifier, similar in function to cookies, that are used to track the online movements of
        web users. Clear gifs are not tied to users' personally identifiable information.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Third Party Partners.</BoldCopy> We may rely on other companies and individuals to
        perform functions on our behalf. Examples include data analysis firms, customer support
        specialists, web hosting companies, and fulfillment companies (e.g., companies that fulfill
        product orders). We may share personally identifiable information with such third parties as
        appropriate for them to perform their functions.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Third Party Links.</BoldCopy> This Privacy Policy only applies to our Website. Our
        Website may include links to third party websites such as our business partners, vendors and
        external information sources. These other sites are outside of our control. Please be aware
        that these websites may collect information about you, and operate according to their own
        privacy practices which may differ from those contained in our Privacy Policy.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Email Marketing.</BoldCopy> We want to communicate with you via email only if you
        are interested in hearing from us. When you purchase a product from this Website, we may
        from time to time send you email marketing messages that we think you might be interested in
        relating to our products. If for any reason you would no longer would like to receive these
        email messages from reBloom, you can click the unsubscribe link in the email to remove
        yourself. Please allow up to 10 days for us to process your request. Please note, if you
        decide not to receive marketing emails from reBloom, you may still receive transactional
        email messages regarding your order (i.e., order confirmation, shipping information,
        customer service notifications, etc.).
      </Paragraph>
      <Paragraph>
        <BoldCopy>One-time Use Features.</BoldCopy> Personal information requested for the Gift of
        Sleep, Share with Friends, referral features, or other one-time use features (typically,
        names and email addresses) is used solely to send communication related to that
        promotion/feature and will not be used in the future for other purposes.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Other Information Disclosure.</BoldCopy> At all times, we reserve the right to
        disclose any information, including personally identifiable information, to comply with any
        applicable law, regulation, legal process or governmental request; to protect Innovative
        Brands LLC rights or property (including without limitation in the event of a transfer of
        control of Innovative Brands LLC, a affiliate, or brand, or a substantial portion of
        assets), or during emergencies when safety is at risk, or for credit fraud protection and
        risk reduction purposes.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Notification of Changes.</BoldCopy>
        We may revise this Privacy Policy from time to time. If we decide to change our Privacy
        Policy, we will post the revised policy here. As we may make changes at any time without
        notifying you, we suggest that you periodically consult this Privacy Policy.
      </Paragraph>
      <Paragraph>
        If you have any questions, complaints, or comments regarding this Privacy Policy or our
        information collection practices, please contact us at{' '}
        <StyledLink href="mailto:privacy@reBloom.com">privacy@reBloom.com</StyledLink>.
      </Paragraph>
      <Paragraph>
        Last Updated: December 20, 2018. Copyright © 2018 Innovative Brands LLC. All rights reserved
      </Paragraph>
    </ContentContainer>
  </div>
)

export default PrivacyPolicy
