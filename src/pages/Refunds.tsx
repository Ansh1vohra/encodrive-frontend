import LegalLayout from "../components/LegalLayout";

const Refunds = () => {
  return (
    <LegalLayout
      title="Cancellations and Refunds"
      updatedAt="March 2025"
    >
      <h2 className="py-3">1. Subscription Cancellation</h2>
      <p>
        You may cancel your Encodrive subscription at any time from your account
        dashboard.
      </p>

      <h2 className="py-3">2. Billing Cycle</h2>
      <p>
        Subscriptions are billed monthly. Cancellation stops future billing but
        does not affect the current billing period.
      </p>

      <h2 className="py-3">3. Refund Policy</h2>
      <p>
        Refunds are generally not provided except where required by law or in
        cases of duplicate billing.
      </p>

      <h2 className="py-3">4. Enterprise Plans</h2>
      <p>
        Refund and cancellation terms for Enterprise plans are governed by
        separate agreements.
      </p>
    </LegalLayout>
  );
};

export default Refunds;
