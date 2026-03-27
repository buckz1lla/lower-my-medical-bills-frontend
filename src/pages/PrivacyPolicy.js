import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last Updated: March 27, 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Lower My Medical Bills ("we," "us," "our," or "Company") is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and otherwise process your personal information 
          in connection with our website, mobile application, and services (collectively, the "Services").
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li><strong>Uploaded EOB Documents:</strong> When you upload Explanation of Benefits (EOB) documents, 
              we process the document data to analyze your claims and identify savings opportunities.</li>
          <li><strong>Contact Information:</strong> Email address if you choose to subscribe for appeal tracking 
              reminders or template updates.</li>
          <li><strong>Payment Information:</strong> Processed securely through Stripe; we do not store full credit card details.</li>
          <li><strong>Appeal Tracker Data:</strong> If you use the appeal tracker, we store your appeal status updates, 
              timestamps, and related metadata.</li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage Analytics:</strong> We collect data about which EOB results users view, which templates are 
              downloaded, which affiliate links are clicked, and which emails are opened.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, IP address, and referring website.</li>
          <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to understand user behavior 
              and improve our Services.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li><strong>Service Delivery:</strong> Analyze EOB documents, identify savings opportunities, generate appeal templates.</li>
          <li><strong>Communication:</strong> Send appeal tracking reminders, payment confirmations, and service updates.</li>
          <li><strong>Analytics & Improvement:</strong> Understand how users interact with our platform to improve features and fix issues.</li>
          <li><strong>Affiliate Relationships:</strong> Track which affiliate links users click to fulfill affiliate program obligations.</li>
          <li><strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Retention</h2>
        <p>
          We retain uploaded EOB documents for <strong>90 days</strong> after upload to allow you to download templates 
          and view results. After 90 days, EOB data is permanently deleted unless you request otherwise. Appeal tracker 
          records are retained as long as you maintain an account. Email addresses are retained for newsletter/reminder 
          purposes until you unsubscribe.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We employ industry-standard encryption (SSL/TLS) to protect data in transit. Stored EOB documents are encrypted 
          at rest. However, no system is 100% secure. You assume some risk by transmitting personal information online.
        </p>
      </section>

      <section>
        <h2>6. Sharing Your Information</h2>
        <p>We do <strong>not</strong> sell your personal data. We may share information in these limited cases:</p>
        <ul>
          <li><strong>Service Providers:</strong> With third-party vendors (e.g., Stripe for payments, Resend for email) 
              under confidentiality agreements.</li>
          <li><strong>Affiliate Partners:</strong> We disclose that a link was clicked to affiliate programs (e.g., eHealth, CJ) 
              to track commissions, but we do not share your personal identity.</li>
          <li><strong>Legal Requirements:</strong> If required by law, court order, or government request.</li>
          <li><strong>Business Transfers:</strong> If we are acquired or merge with another company, your data may be transferred 
              as part of that transaction.</li>
        </ul>
      </section>

      <section>
        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have rights including:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data.</li>
          <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements).</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from email reminders or affiliate tracking.</li>
          <li><strong>Portability:</strong> Request your data in a portable format.</li>
        </ul>
        <p>To exercise these rights, contact us at <strong>privacy@lowermymedicalbills.com</strong>.</p>
      </section>

      <section>
        <h2>8. Third-Party Links</h2>
        <p>
          Our Services may contain links to third-party websites (e.g., insurance provider websites, appeal resources). 
          We are not responsible for their privacy practices. Please review their privacy policies before using their services.
        </p>
      </section>

      <section>
        <h2>9. Changes to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material changes by updating the 
          "Last Updated" date and posting the revised policy on our website.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our privacy practices, please contact us:
        </p>
        <p>
          <strong>Lower My Medical Bills</strong><br />
          Email: <strong>privacy@lowermymedicalbills.com</strong><br />
          Website: <strong>www.lowermymedicalbills.com</strong>
        </p>
      </section>
    </div>
  );
}
