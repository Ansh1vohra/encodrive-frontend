import LegalLayout from "../components/LegalLayout";

const Terms = () => {
  return (
    <LegalLayout title="Terms and Conditions" updatedAt="March 2025">
      <h2 className="py-3">1. Acceptance of Terms</h2>
      <p>
        By accessing or using Encodrive, you agree to be bound by these Terms and
        Conditions. If you do not agree, please do not use the service.
      </p>

      <h2 className="py-3">2. Description of Service</h2>
      <p>
        Encodrive provides end-to-end encrypted file storage where encryption
        occurs on the client side. We never store your encryption keys.
      </p>

      <h2 className="py-3">3. User Responsibilities</h2>
      <ul>
        <li>You are responsible for safeguarding your encryption keys</li>
        <li>You must not upload illegal or harmful content</li>
        <li>You agree not to misuse the service</li>
      </ul>

      <h2 className="py-3">4. Limitation of Liability</h2>
      <p>
        Encodrive shall not be liable for data loss caused by lost encryption
        keys, misuse, or unauthorized access to user devices.
      </p>

      <h2 className="py-3">5. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use constitutes
        acceptance of the updated terms.
      </p>
    </LegalLayout>
  );
};

export default Terms;
