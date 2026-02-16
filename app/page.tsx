import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 glass-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute w-5 h-5 top-0 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45"></div>
                <div className="absolute w-4 h-4 top-2 left-6 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-400 to-blue-600 transform -rotate-45"></div>
                <div className="absolute w-4 h-4 top-5 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-600 to-blue-800 transform -rotate-45"></div>
                <div className="absolute w-6 h-6 top-6 left-5 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45 opacity-85"></div>
              </div>
              <span className="text-2xl font-semibold text-white">Floe</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="hidden md:block text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2.5 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 glass-card rounded-full text-sm">
                <span className="text-blue-400">●</span> Live on Base Network
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
                Get Paid in <br/>
                <span className="gradient-text">Stablecoins</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Create invoices, send to clients, get paid in USDC. 
                <span className="text-white font-medium"> No banks. No delays. No 3% fees.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-4 rounded-lg font-medium text-lg text-white text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
                  Start Free Trial
                </Link>
                <a href="#how-it-works" className="glass-card px-8 py-4 rounded-lg font-medium text-lg text-white text-center hover:bg-white/5 transition">
                  See How It Works
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text">0.5%</div>
                  <p className="text-gray-400 text-sm mt-1">Transaction Fee</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text">&lt;5s</div>
                  <p className="text-gray-400 text-sm mt-1">Settlement Time</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text">150+</div>
                  <p className="text-gray-400 text-sm mt-1">Countries</p>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="glass-card rounded-2xl p-8 animate-float">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Invoice #1247</p>
                    <h3 className="text-2xl font-semibold mt-1 text-white">$2,500.00</h3>
                  </div>
                  <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Paid
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Client</span>
                    <span className="text-white">Acme Corp</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="text-blue-400">USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network</span>
                    <span className="text-white">Base</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Received 2,500 USDC • 3 mins ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-400">Get paid in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Create Invoice</h3>
              <p className="text-gray-400">Enter client details and amount. Takes 30 seconds.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Send Link</h3>
              <p className="text-gray-400">Share payment link via email or messaging app.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Get Paid</h3>
              <p className="text-gray-400">Receive USDC in your wallet within seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Built for <span className="gradient-text">Freelancers</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to get paid globally</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Instant Settlement</h3>
              <p className="text-gray-400 text-sm">Money in your wallet in seconds, not days</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Global Payments</h3>
              <p className="text-gray-400 text-sm">Accept payments from 150+ countries</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Low Fees</h3>
              <p className="text-gray-400 text-sm">0.5% transaction fee. That's it.</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Mobile Ready</h3>
              <p className="text-gray-400 text-sm">Works perfectly on any device</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Real-time Alerts</h3>
              <p className="text-gray-400 text-sm">Get notified instantly when paid</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Custom Branding</h3>
              <p className="text-gray-400 text-sm">Add your logo and colors</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Simple Dashboard</h3>
              <p className="text-gray-400 text-sm">Track all invoices in one place</p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Secure</h3>
              <p className="text-gray-400 text-sm">Non-custodial. You control your funds.</p>
            </div>
          </div>
        </div>
      </section>

      
{/* Pricing */}
<section id="pricing" className="py-20 px-6">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        Simple <span className="gradient-text">Pricing</span>
      </h2>
      <p className="text-xl text-gray-400">Pay only when you get paid</p>
    </div>

    <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 rounded-full">
          <span className="text-blue-400 font-medium">100% Free During Beta</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">0.5% Transaction Fee</h3>
        <p className="text-gray-400">That's it. No monthly fees, no hidden charges.</p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Unlimited Invoices</h4>
            <p className="text-gray-400 text-sm">Create as many invoices as you need</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Instant USDC Payments</h4>
            <p className="text-gray-400 text-sm">Get paid in seconds on Base network</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Global Reach</h4>
            <p className="text-gray-400 text-sm">Accept payments from 150+ countries</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">All Features Included</h4>
            <p className="text-gray-400 text-sm">Dashboard, analytics, notifications, and more</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
          <h4 className="text-blue-300 font-semibold mb-2">Compare the Savings</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Stripe (2.9%)</span>
              <span className="text-white">$290 on $10k</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">PayPal (3.5%)</span>
              <span className="text-white">$350 on $10k</span>
            </div>
            <div className="flex justify-between border-t border-blue-500/30 pt-2">
              <span className="text-blue-300 font-semibold">Floe (0.5%)</span>
              <span className="text-blue-300 font-semibold">$50 on $10k</span>
            </div>
          </div>
        </div>

        <Link href="/sign-up" className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 py-4 rounded-lg font-medium text-white text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all">
          Start Free - No Credit Card Required
        </Link>
        
        <p className="text-center text-gray-400 mt-4 text-sm">
          Free during beta • 0.5% fee applies after public launch
        </p>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Get Paid <span className="gradient-text">Faster?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join freelancers around the world who've ditched PayPal fees
            </p>
            <Link href="/sign-up" className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 px-12 py-4 rounded-lg font-medium text-lg text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
              Create Your First Invoice
            </Link>
            <p className="text-gray-400 text-sm mt-4">No credit card required • Setup in 2 minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute w-4 h-4 top-0 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45"></div>
                  <div className="absolute w-3 h-3 top-1.5 left-5 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-400 to-blue-600 transform -rotate-45"></div>
                  <div className="absolute w-3 h-3 top-4 left-0 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-600 to-blue-800 transform -rotate-45"></div>
                  <div className="absolute w-5 h-5 top-5 left-4 rounded-[50%_50%_50%_0] bg-gradient-to-br from-blue-500 to-blue-700 transform -rotate-45 opacity-85"></div>
                </div>
                <span className="text-xl font-semibold text-white">Floe</span>
              </div>
              <p className="text-gray-400 text-sm">
                Simple stablecoin invoicing for freelancers and businesses worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Docs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="https://twitter.com/get_floe" className="hover:text-white transition">Twitter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 Floe. All rights reserved.</p>
            <p className="text-gray-400 text-sm">Built with ❤️ for freelancers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}