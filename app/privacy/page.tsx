export default function PrivacyPage() {
  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="glass-card rounded-2xl p-8 prose prose-invert max-w-none">
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: February 17, 2026</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Email address, name, business name</li>
                <li><strong>Payment Information:</strong> Wallet addresses (no private keys)</li>
                <li><strong>Invoice Data:</strong> Client names, amounts, descriptions</li>
                <li><strong>Usage Data:</strong> Login times, features used, browser information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain the service</li>
                <li>Process and facilitate payments</li>
                <li>Send important notifications about your account</li>
                <li>Improve and optimize the platform</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
              <p>Your data is stored securely using Convex, a modern backend platform. We implement:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encrypted passwords (bcrypt hashing)</li>
                <li>Secure HTTPS connections</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With service providers (Convex, Vercel) to operate the platform</li>
                <li>When required by law or legal process</li>
                <li>To protect rights, property, or safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Blockchain Transparency</h2>
              <p>Payment transactions occur on the Base blockchain, which is public. Transaction amounts, wallet addresses, and timestamps are visible on the blockchain.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
              <p>We use local storage to maintain your login session. No third-party tracking cookies are used.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
              <p>Floe is not intended for users under 18 years of age. We do not knowingly collect information from children.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to Privacy Policy</h2>
              <p>We may update this policy and will notify you of significant changes via email or platform notification.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
              <p>For privacy questions or to exercise your rights, contact: privacy@floe.app</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}