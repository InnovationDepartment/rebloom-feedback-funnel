import React from 'react'
import styled from 'styled-components'
import Head from '../static/components/head'

const ContentContainer = styled.div`
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 80px auto;
`

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  margin: 37px 0 53px 0;
`

const MainTitle = styled.h1`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${props => props.theme.colors.purple};
  font-size: 64px;
  margin: 0 0 48px 0;
  text-align: center;
`

const Paragraph = styled.p`
  font-family: 'Lato', sans-serif;
  color: ${props => props.theme.colors.purple};
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 14px;
`

const BoldCopy = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  margin-right: 6px;
`

const EmailLink = styled.a`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: ${props => props.theme.colors.purple};
`

const TermsAndConditions = () => (
  <div>
    <Head title="reBloom - Terms & Conditions" />
    <ContentContainer>
      <LogoImage src="static/assets/images/logo-purple.png" alt="logo" />
      <MainTitle>Terms and Conditions</MainTitle>
      <Paragraph>
        Thank you for visiting reBloom’s website. Innovative Brands LLC
        maintains this website (the "Website") for your personal entertainment,
        information, education and communication. Your access to and use of the
        Website is subject to these Terms and Conditions and all applicable
        laws. By accessing and browsing the Website, you accept, without
        limitation or qualification, these Terms and Conditions and acknowledge
        that any other agreements between you and Innovative Brands LLC
        regarding this Website are superseded and of no force or effect.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Free 7-pack offer terms and conditions.</BoldCopy> Limited
        conditions apply to receive your free seven-pack. You must provide a
        valid order ID to show proof of purchase. Offer is limited to one free
        offer (seven-pack) per household. Seven-pack offer valid in the United
        States of America only. Offer is valid for orders purchased at full
        price or using a promo discount no greater than 30%. To qualify for this
        offer, you must share with us your experience with reBloom, after having
        used the product for at least one week. This offer, however, is in no
        way dependent on the quality of feedback that you provide, whether the
        feedback is positive or negative. We do not require that you publish the
        feedback you provide us on the website the product was purchased on in
        order to qualify for this offer. Additional purchase is not required to
        receive this offer. No credit card required and no shipping fees
        required. Offer valid while supplies lasts and subject to change or
        cancellation at any time. If you have difficulty with redeeming your
        offer or think that an error has been made in determining your validity
        to receive the offer, please email help@rebloom.com with any
        questions/concerns.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Content.</BoldCopy> The design of this Website and all text,
        graphics, information, content, and other material displayed on or that
        can be downloaded from this Website are © 2009-2013 Innovative Brands
        LLC All rights reserved. The design of the Website, text, graphics,
        information and content may not be used except as provided in these
        Terms and Conditions or with prior written permission of Innovative
        Brands LLC Certain trademarks, trade names, service marks and logos used
        or displayed on this Website are registered and unregistered trademarks,
        trade names and service marks of Innovative Brands LLC and its
        affiliates. Nothing contained on this Website grants or should be
        construed as granting, by implication, estoppel, or otherwise, any
        license or right to use any trademarks, trade names, service marks or
        logos displayed on this Website without the prior written permission of
        Innovative Brands LLC
      </Paragraph>
      <Paragraph>
        While Innovative Brands LLC uses reasonable efforts to include accurate
        and up-to-date information on the Website, Innovative Brands LLC makes
        no warranties or representations as to its accuracy. Innovative Brands
        LLC assumes no liability or responsibility for any errors or omissions
        in the content of the Website.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Submissions to this Website.</BoldCopy> Although Innovative Brands
        LLC may from time to time monitor or review discussions, chats,
        postings, transmissions, bulletin boards, and the like on the Website
        (“Postings”), Innovative Brands LLC is under no obligation to do so and
        assumes no responsibility or liability arising from the content of any
        such Posting, nor for any error, defamation, libel, slander, omission,
        falsehood, obscenity, pornography, profanity, danger or inaccuracy
        contained in any information within such Postings on the Website.
      </Paragraph>
      <Paragraph>
        You are prohibited from posting or transmitting any unlawful,
        threatening, libelous, defamatory, obscene, scandalous, inflammatory,
        pornographic or profane material or any material that could constitute
        or encourage conduct that would be considered a criminal offense, give
        rise to civil liability or otherwise violate any law. Innovative Brands
        LLC will fully cooperate with any law enforcement authorities or court
        order requesting or directing Innovative Brands LLC to disclose the
        identity of anyone posting any such information or materials. Innovative
        Brands LLC may remove Postings at any time, and for any reason.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Third Party Links.</BoldCopy> From time to time, this Website may
        contain links to web sites that are not owned, operated or controlled by
        Innovative Brands LLC or its respective affiliates. All such links are
        provided solely as a convenience to you. If you use these links, you
        will leave this Website. Neither Innovative Brands LLC nor any of its
        affiliates are responsible for any content, materials or other
        information located on or accessible from any other web site. Neither
        Innovative Brands LLC nor any of its affiliates endorse, guarantee, or
        make any representations or warranties regarding any other web sites, or
        any content, materials or other information located or accessible from
        any other web sites, or the results that you may obtain from using any
        other web sites. If you decide to access any other web sites linked to
        or from this Website, you do so entirely at your own risk.
      </Paragraph>
      <Paragraph>
        <BoldCopy>User Information.</BoldCopy> Other than personally identifiable
        information, which is subject to this Website's Privacy Policy, any
        material, information, suggestions, ideas, concepts, know-how,
        techniques, questions, comments or other communication you transmit or
        post to this Website in any manner ("User Communications") is and will
        be considered non-confidential and non-proprietary. We and our
        respective affiliates and our or their designees may use any or all User
        Communications for any purpose whatsoever, including, without
        limitation, reproduction, transmission, disclosure, publication,
        broadcast, development, manufacturing and/or marketing in any manner
        whatsoever for any or all commercial or non-commercial purposes. We may,
        but are not obligated to, monitor or review any User Communications. We
        will have no obligation to use, return, review, or respond to any User
        Communications. We will have no liability related to the content of any
        such User Communications, whether or not arising under the laws of
        copyright, libel, privacy, obscenity, or otherwise. We retain the right
        to remove any or all User Communications that includes any material we
        deem inappropriate or unacceptable.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Health Related Information.</BoldCopy> Information presented on
        this Website is intended to impart general fitness, nutrition and health
        information. Innovative Brands LLC is not engaged in rendering medical
        advice or services. The information presented on this Website is not
        intended for diagnostic or treatment purposes. You should consult your
        doctor for medical advice or services. Consultation with your doctor is
        particularly important if you are under eighteen (18) years old,
        pregnant, breastfeeding, or have health problems. Never disregard
        professional medical advice or delay in seeking it because of something
        you have read on this Website. Information and statements regarding
        dietary supplements have not been evaluated by the Food and Drug
        Administration and are not intended to diagnose, treat, cure, or prevent
        any disease.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Return Policy.</BoldCopy> Please read all the details of this
        policy carefully so there is no confusion regarding returns. All first
        time orders, including free trial orders, are final sale. Under certain
        circumstances, we allow returns on non-first time orders. In order to
        make a return, please contact Customer Support via email,
        help@rebloom.com, within 30 days of the date of purchase to obtain a
        return authorization and shipping instructions. As we sell a product
        that can be consumed in individual bottles, to qualify for a partial
        refund (less shipping & handling), we actually have to physically
        receive your return and you may only have consumed a maximum of seven
        bottles out of the total order. All product being returned must be
        received within 10 days of receiving a return authorization. All returns
        must be sent to our New York location. Unauthorized returns sent to our
        shipping facility in Georgia will be assessed a $15 processing fee.
        Authorized returns sent to our New York location will be processed for a
        partial refund with no additional fees. You will receive your partial
        refund within 30 days from the date the product is received at our
        offices. You are responsible for the return shipment expense and we
        BoldCopyly suggest you send the package with delivery confirmation. We
        cannot take responsibility for shipments that we did not receive and
        that you are not able to show were ever delivered. If you have questions
        or concerns about this policy, please email help@reBloom.com.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Subscription Member Orders.</BoldCopy> reBloom’s subscription
        membership allows customers to receive their requested quantity of
        reBloom delivered directly to their door on a regular basis without the
        hassle of re-ordering. Enrollment in a reBloom subscription is at your
        option, but please note that the subscription membership is included
        with select product configurations in order to allow you to access
        exclusive discounts and incentives such as free trial samples,
        discounted pricing on future orders and free shipping. In addition to
        accessing these benefits, when you purchase a subscription membership,
        you are agreeing to be charged for the future shipments described within
        that product's additional offer details at checkout. Customers enrolled
        in subscriptions can easily adjust their preferences (order timing and
        quantity) or cancel at any time by emailing help@reBloom.com. Please
        note that with subscription membership, it is up to you to contact us to
        cancel your membership (so there is no confusion, subscription
        membership is an opt-out (“negative option”) program). We will assume
        that you are enjoying the great natural sleep you are getting with
        reBloom unless we hear from you, and will therefore continue to adhere
        to the time interval for order shipping and billing that you agreed to
        in the offer details at the time of original purchase.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Jurisdiction.</BoldCopy> Innovative Brands LLC products,
        materials, offers and information appearing on this Website are intended
        for U.S. visitors/customers only. This Website is controlled by
        Innovative Brands LLC from its offices in New York, NY. Innovative
        Brands LLC makes no representation that materials on this Website are
        appropriate or available for use in locations outside the United States.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Limitations of Liability.</BoldCopy> Your use of and browsing of
        this Website are at your own risk. Neither Innovative Brands LLC nor any
        other party involved in creating, producing or delivering this Website
        is liable for any direct, incidental, consequential, indirect or
        punitive damages arising out of your access to, or use of, this Website.
        Without limiting the foregoing, everything on this Website is provided
        to you "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
        IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTY OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        Please note that some jurisdictions may not allow exclusions of implied
        warranties, so some of these exclusions may not apply to you. Check your
        local laws. Innovative Brands LLC assumes no liability and shall not be
        liable for any damages to, or viruses that may infect, your computer
        equipment or other property on account your use of this Website.
      </Paragraph>
      <Paragraph>
        <BoldCopy>General.</BoldCopy> Our failure to exercise or enforce any right
        or provision of these Terms and Conditions shall not constitute a waiver
        of such right or provision by us. If any provision of these Terms and
        Conditions is found by a court of competent jurisdiction to be invalid,
        the parties nevertheless agree that the court should endeavor to give
        effect to the parties' intentions as reflected in the provision, and the
        other provisions of our Terms and Conditions remain in full force and
        effect.
      </Paragraph>
      <Paragraph>
        <BoldCopy>Revisions to these Terms and Conditions.</BoldCopy> Innovative
        Brands LLC may at any time revise these Terms and Conditions by updating
        this posting. You are bound by any such revisions and should therefore
        periodically visit this page to review the then current Terms and
        Conditions to which you are bound.
      </Paragraph>
      <Paragraph>
        Please email{' '}
        <EmailLink href="mailto:privacy@rebloom.com">
          privacy@reBloom.com
        </EmailLink>{' '}
        with any questions or concerns about these Terms and Conditions.
      </Paragraph>
    </ContentContainer>
  </div>
)

export default TermsAndConditions
