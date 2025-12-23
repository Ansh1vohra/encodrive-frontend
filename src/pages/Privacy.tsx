import LegalLayout from "../components/LegalLayout";

const Privacy = () => {
  return (
    <LegalLayout title="Privacy Policy" updatedAt="March 2025">
      <h2 className="py-3">1. Information We Collect</h2>
      <p>
        We collect minimal personal information such as email address and usage
        data required to operate Encodrive.
      </p>

      <h2 className="py-3">2. Encryption & Security</h2>
      <p>
        All files are encrypted client-side. Encodrive never has access to your
        encryption keys or file contents.
      </p>

      <h2 className="py-3">3. Data Storage</h2>
      <p>
        Encrypted files are stored securely on AWS S3 with strict access
        controls.
      </p>

      <h2 className="py-3">4. Cookies</h2>
      <p>
        We may use cookies for authentication and analytics purposes only.
      </p>

      <h2 className="py-3">5. Your Rights</h2>
      <p>
        You may request deletion of your account and associated metadata at any
        time.
      </p>
    </LegalLayout>
  );
};

export default Privacy;
