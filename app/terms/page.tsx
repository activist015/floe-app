export default function TermsPage() {
  return (
    <div className="min-h-screen gradient-bg p-6">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="glass-card rounded-2xl p-8 prose prose-invert max-w-none">
          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last updated: February 17, 2026</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Floe, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
              <p>Permission is granted to use Floe for creating and managing invoices for personal or commercial purposes. This license shall automatically terminate if you violate any of these restrictions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Service Description</h2>
              <p>Floe provides a platform for creating invoices and accepting USDC stablecoin payments on the Base network. During the beta period, all features are free. After beta, a 0.5% transaction fee will apply to processed payments.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Provide accurate wallet addresses for receiving payments</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use the service for illegal or fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cryptocurrency Risks</h2>
              <p>You acknowledge that cryptocurrency transactions are irreversible. Floe is not responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Funds sent to incorrect wallet addresses</li>
                <li>Cryptocurrency price volatility</li>
                <li>Network fees or transaction delays</li>
                <li>Loss of private keys or wallet access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p>Floe is provided "as is" without warranties of any kind. We shall not be liable for any damages arising from the use or inability to use the service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
              <p>For questions about these terms, contact us at: support@floe.app</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}