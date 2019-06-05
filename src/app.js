import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

import styled from 'styled-components'
import { media } from 'utils/style-utils'
import { getHostName } from 'utils/get-env'
import Spinner from 'components/shared/spinner'

import Head from './head'
import NavBar from 'components/NavBar/NavBar'
import Toaster from 'components/shared/toaster'
import TermsAndConditions from 'components/TandC/TandC'
import PrivacyPolicy from 'components/PrivacyPolicy/PrivacyPolicy'

import LogIn from 'components/Auth/Login'
import SignUp from 'components/Auth/SignUp'
const PasswordResetRequest = lazy(() => import(/* webpackChunkName: "app" */ 'components/Auth/PasswordResetRequest'))
const ResetPassword = lazy(() => import(/* webpackChunkName: "app" */ 'components/Auth/PasswordReset'))

import HomePage from 'components/HomePage/HomePage'

// Lazy loading rest of components to improve home page performance
const GetStarted = lazy(() => import(/* webpackChunkName: "app" */ 'components/Consultation/get-started'))
const Consultation = lazy(() => import(/* webpackChunkName: "app" */ 'components/Consultation/Consultation'))
const Recommendations = lazy(() => import(/* webpackChunkName: "app" */ 'components/Recommendations/Recommendations'))
const IngredientLibrary = lazy(() => import(/* webpackChunkName: "app" */ 'components/Ingredients/IngredientLibrary'))
const IngredientPage = lazy(() => import(/* webpackChunkName: "app" */ 'components/Ingredients/IngredientPage'))
const ProductLibrary = lazy(() => import(/* webpackChunkName: "app" */ 'components/Products/ProductLibrary'))
const ProductPage = lazy(() => import(/* webpackChunkName: "app" */ 'components/Products/ProductPage'))
const Cart = lazy(() => import(/* webpackChunkName: "app" */ 'components/Cart/Cart'))
const Checkout = lazy(() => import(/* webpackChunkName: "app" */ 'components/Checkout/Checkout'))
const CheckoutSuccess = lazy(() => import(/* webpackChunkName: "app" */ 'components/Checkout/checkout-success'))
const MySolution = lazy(() => import(/* webpackChunkName: "app" */ 'components/AccountDetails/MySolution/MySolution'))
const MyOrders = lazy(() => import(/* webpackChunkName: "app" */ 'components/AccountDetails/MyOrders/MyOrders'))
const OrderDetail = lazy(() => import(/* webpackChunkName: "app" */ 'components/AccountDetails/MyOrders/OrderDetail'))
const MyDetails = lazy(() => import(/* webpackChunkName: "app" */ 'components/AccountDetails/MyDetails/MyDetails'))
const MyReferrals = lazy(() => import(/* webpackChunkName: "app" */ 'components/AccountDetails/MyReferrals/MyReferrals'))

import OfferLandingPage from 'components/OfferLandingPages/OfferLandingPage'
import CBDLandingPage from 'components/CBD/CBDLanding'

import ReviewFunnelLandingPage from 'components/ReviewFunnel/LandingPage'
import ReviewFunnelSurveySignup from 'components/ReviewFunnel/survey-signup'
import PurchaseSource from 'components/ReviewFunnel/purchase-source'
import ShippingAddress from 'components/ReviewFunnel/shipping-address'
import OrderId from 'components/ReviewFunnel/order-id'
import ProductSelector from 'components/ReviewFunnel/product-selector'
import CustomerFeedback from 'components/ReviewFunnel/rating-and-comment'
import ReviewRequest from 'components/ReviewFunnel/review-request'
import SubmissionSuccess from 'components/ReviewFunnel/submission-success'
import UsagePeriod from 'components/ReviewFunnel/usage-period'
import OfferToC from 'components/ReviewFunnel/offer-t-and-c'
import * as EntryContingencies from 'components/ReviewFunnel/entry-contingencies'

import ModalRoot from 'components/shared/modals/ModalRoot'
import { me } from 'actions/user'

const PageContent = styled.div`
  ${media.small`
    margin-top: 64px;
  `};
  ${media.medium`
    margin-top: 0;
  `};
`

let GAid = 'UA-46482134-8' // Default Google Analytics ID - dev environment
if (getHostName() === 'https://www.gowellpath.com') GAid = 'UA-46482134-1'
if (getHostName() === 'https://staging.gowellpath.com') GAid = 'UA-46482134-9'

ReactGA.initialize(GAid)
ReactGA.plugin.require('ecommerce')
ReactGA.pageview(window.location.pathname + window.location.search)

const LoggedInContext = React.createContext(false)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <LoggedInContext.Consumer>
    {isLoggedIn => (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/sign-up',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )}
  </LoggedInContext.Consumer>
)

class App extends Component {
  state = {
    loading: true, //ensures that user is authenticated before any rendering any component
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.me().then(() => {
        this.setState({ loading: false })
      })
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    const { isLoggedIn } = this.props

    if (this.state.loading) {
      return ''
    }

    return (
      <LoggedInContext.Provider value={isLoggedIn}>
        <Head />
        <NavBar />
        <PageContent>
          <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/ease-launch" component={CBDLandingPage} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/reset-password" component={PasswordResetRequest} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />

            <Route exact path="/consultation" component={GetStarted} />
            <Route exact path="/consultation/:sectionName/:questionIdx" component={Consultation} />

            <Route exact path="/ingredients" component={IngredientLibrary} />
            <Route exact path="/ingredients/:slug" component={IngredientPage} />
            <Route exact path="/products" component={ProductLibrary} />
            <Route exact path="/products/:slug" component={ProductPage} />
            <Route exact path="/checkout/cart" component={Cart} />
            <PrivateRoute exact path="/recommendations" component={Recommendations} />
            <PrivateRoute exact path="/checkout/payment" component={Checkout} />
            <PrivateRoute exact path="/checkout/success" component={CheckoutSuccess} />

            <PrivateRoute exact path="/account/my-solution" component={MySolution} />
            <PrivateRoute exact path="/account/my-details" component={MyDetails} />
            <PrivateRoute exact path="/account/my-orders" component={MyOrders} />
            <PrivateRoute exact path="/account/my-orders/:id" component={OrderDetail} />
            <PrivateRoute exact path="/account/my-referrals" component={MyReferrals} />

            {/* <Route exact path="/offer" component={ZenLandingPage} /> */}
            <Route exact path="/bonus" component={OfferLandingPage} />

            <Route exact path="/offer" component={ReviewFunnelLandingPage} />
            <Route exact path="/offer/new-entry" component={ReviewFunnelSurveySignup} />
            <Route exact path="/offer/new-entry/error" component={EntryContingencies.Signup} />
            <Route exact path="/offer/purchase-source" component={PurchaseSource} />
            <Route exact path="/offer/purchase-source/email-offer" component={EntryContingencies.PurchaseSource} />
            <Route exact path="/offer/order-details" component={OrderId} />
            <Route exact path="/offer/order-details/error" component={EntryContingencies.AmazonOrderID} />
            <Route exact path="/offer/order-details/existing-promotion" component={EntryContingencies.PromoCustomer} />
            <Route exact path="/offer/select-product" component={ProductSelector} />
            <Route exact path="/offer/usage-period" component={UsagePeriod} />
            <Route exact path="/offer/usage-period/new-user" component={EntryContingencies.UsagePeriod} />
            <Route exact path="/offer/customer-feedback" component={CustomerFeedback} />
            <Route exact path="/offer/customer-feedback/not-satisfied" component={EntryContingencies.PoorExperience} />
            <Route exact path="/offer/customer-feedback/submitted" component={ReviewRequest} />
            <Route exact path="/offer/shipping-information" component={ShippingAddress} />
            <Route exact path="/offer/submission-success" component={SubmissionSuccess} />
            <Route exact path="/offer-terms-and-conditions" component={OfferToC} />

            {/* Fallback */}
            <Route path="*" component={HomePage} />
          </Switch>
          </Suspense>
        </PageContent>
        <ModalRoot />
        <Toaster />
      </LoggedInContext.Provider>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user && user.user && user.user.id,
  user: user.user.id,
})

const mapDispatchToProps = {
  me,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
