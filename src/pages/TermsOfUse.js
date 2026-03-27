import React from 'react';
import './TermsOfUse.css';

export default function TermsOfUse() {
  return (
    <div className="policy-container">
      <h1>Terms of Use</h1>
      <p className="last-updated">Last Updated: March 27, 2026</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Lower My Medical Bills website, application, and services ("Services"), 
          you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Services.
        </p>
      </section>

      <section>
        <h2>2. User Eligibility</h2>
        <p>
          By using our Services, you represent and warrant that:
        </p>
        <ul>
          <li>You are at least 18 years of age (or the age of majority in your jurisdiction).</li>
          <li>You have the authority to enter into this agreement.</li>
          <li>You will use these Services for lawful purposes only and in compliance with all applicable laws.</li>
        </ul>
      </section>

      <section>
        <h2>3. Services Description</h2>
        <p>
          Lower My Medical Bills provides an automated analysis tool that:
        </p>
        <ul>
          <li>Accepts uploaded Explanation of Benefits (EOB) documents.</li>
          <li>Applies algorithmic analysis to identify potential billing errors, duplicate charges, and appealable denials.</li>
          <li>Generates personalized appeal templates and resources to assist with claim disputes.</li>
        </ul>
        <p>
          <strong>Important:</strong> Our analysis is provided "as-is" and is not a substitute for professional advice 
          from insurance agents, healthcare providers, or legal counsel. Users are solely responsible for verifying findings 
          and making their own judgment before taking action.
        </p>
      </section>

      <section>
        <h2>4. User Content & Uploads</h2>
        <h3>4.1 Your EOB Documents</h3>
        <p>
          You retain all ownership rights to your EOB documents. By uploading, you grant us a limited license to:
        </p>
        <ul>
          <li>Process and analyze the EOB for identification of savings opportunities.</li>
          <li>Generate and display results and templates based on the analysis.</li>
          <li>Store the EOB for up to 90 days to allow access to results and templates.</li>
          <li>Use anonymized, de-identified data for analytics and service improvement.</li>
        </ul>

        <h3>4.2 Prohibited Use</h3>
        <p>You agree not to upload content that:</p>
        <ul>
          <li>Contains another person's private information without consent.</li>
          <li>Violates intellectual property, privacy, or other legal rights.</li>
          <li>Contains malware, viruses, or malicious code.</li>
        </ul>
      </section>

      <section>
        <h2>5. Payment & Pricing</h2>
        <p>
          Certain features of our Services require payment of fees ("Services Fee"). By providing payment information, 
          you authorize us to charge the stated fee to your payment method.
        </p>
        <ul>
          <li><strong>One-Time Charge:</strong> The fee is billed once per EOB analysis; you are not charged for future use unless you submit another EOB.</li>
          <li><strong>Non-Refundable:</strong> All fees are generally non-refundable unless we are unable to provide Services due to our error.</li>
          <li><strong>Payment Processing:</strong> Payments are processed by Stripe. Your card information is not stored by us.</li>
        </ul>
      </section>

      <section>
        <h2>6. Disclaimer of Warranties</h2>
        <p>
          THE SERVICES ARE PROVIDED "AS-IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
          SPECIFICALLY:
        </p>
        <ul>
          <li>We make no warranty that our analysis is accurate, complete, or will result in savings.</li>
          <li>We do not warrant that the Services will be uninterrupted, error-free, or secure.</li>
          <li>Our confidence scores and findings are estimates based on limited EOB data and should be verified independently.</li>
          <li>Appeals may fail even if our recommendations are followed; success depends on many factors beyond our control.</li>
        </ul>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, LOWER MY MEDICAL BILLS SHALL NOT BE LIABLE FOR:
        </p>
        <ul>
          <li>Lost savings, lost wages, lost profit, or indirect/consequential damages.</li>
          <li>Damages arising from your reliance on our analysis or recommendations.</li>
          <li>Failed appeals or denied claims even if our findings were reasonable.</li>
          <li>Data breaches or unauthorized access to your EOB documents (except where negligence is proven).</li>
        </ul>
        <p>
          <strong>CAP ON LIABILITY:</strong> Our total liability for any claim shall not exceed the amount you paid for 
          the Services in the immediately preceding 12 months (or $100, whichever is greater).
        </p>
      </section>

      <section>
        <h2>8. Intellectual Property</h2>
        <p>
          All content, design, layout, and technology on the Services (excluding your uploaded EOB) are owned by or 
          licensed to Lower My Medical Bills. You may not reproduce, distribute, or create derivative works without 
          our express written permission.
        </p>
      </section>

      <section>
        <h2>9. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access to Services at any time, with or without 
          cause or notice. Termination will not affect your already-paid Services for the associated EOB analysis.
        </p>
      </section>

      <section>
        <h2>10. Third-Party Links & Affiliate Relationships</h2>
        <p>
          Our Services may contain links to third-party resources (insurance providers, appeal guides, affiliate programs). 
          We are not responsible for these third-party sites or their content. When you click an affiliate link, we may 
          earn a commission; this does not affect the fees you pay to us.
        </p>
      </section>

      <section>
        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Lower My Medical Bills and its officers, directors, employees, 
          and agents from any claims, damages, or costs arising from your use of the Services or violation of these Terms.
        </p>
      </section>

      <section>
        <h2>12. Governing Law</h2>
        <p>
          These Terms of Use are governed by the laws of the United States and the state in which our Services are primarily 
          operated, without regard to conflict-of-law principles. Any legal action or dispute shall be subject to exclusive 
          jurisdiction in the federal and state courts located in that state.
        </p>
      </section>

      <section>
        <h2>13. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. Your continued use of the Services after changes constitutes acceptance 
          of the new Terms. We will post the updated Terms and update the "Last Updated" date.
        </p>
      </section>

      <section>
        <h2>14. Contact Us</h2>
        <p>
          If you have questions about these Terms of Use, please contact us:
        </p>
        <p>
          <strong>Lower My Medical Bills</strong><br />
          Email: <strong>support@lowermymedicalbills.com</strong><br />
          Website: <strong>www.lowermymedicalbills.com</strong>
        </p>
      </section>
    </div>
  );
}
