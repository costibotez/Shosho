import React, { useState } from 'react';
import PlanCard from "./PlanCard";
import './index.scss';
import PaymentSection from "./PaymentSection";
import PlansSection from "./PlansSection";
import CreditCardCheckout from "./CreditCardCheckout";
import { StripeProvider, Elements } from 'react-stripe-elements';
import stripeConfig from '../../../config/stripe';
import Loader from '../../Loader';

const Payment = props => {
  const [ selectedPlan, setSelectedPlan ] = useState(null);

  return (
    <div className="payment-wrap">
      <PlanCard tariff={props.user.paymentData.plan ? props.user.paymentData.plan.title : null} cancelled={props.user.paymentData.cancelled} expirationDate={props.user.paymentData ? new Date(props.user.paymentData.expirationDate) : null } />
      <PaymentSection title="Choose a plan">
        {
          !props.plans
          ? <Loader />
          : <PlansSection active={selectedPlan} select={plan => setSelectedPlan(plan)} plans={props.plans}/>
        }
      </PaymentSection>
      {
        selectedPlan &&
        <StripeProvider apiKey={stripeConfig.apiKey}>
          <Elements>
            <CreditCardCheckout selectedPlan={selectedPlan} />
          </Elements>
        </StripeProvider>
      }
      <p className="credit-card-checkout__desc"><span className="icon icon--lock"></span>Secure and encrypted payments. We do not store credit card details. All payments are done through secure payment gateway <a href="https://stripe.com/docs/security/stripe">Stripe</a>.</p>
    </div>
  );
};

export default Payment;
