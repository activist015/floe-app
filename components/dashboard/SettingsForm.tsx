"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SettingsForm() {
  const router = useRouter();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/sign-in");
      return;
    }
    setUserId(id as Id<"users">);
  }, [router]);

  const profile = useQuery(
    api.users.getProfile,
    userId ? { userId } : "skip"
  );

  const updateProfile = useMutation(api.users.updateProfile);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    walletAddress: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        businessName: profile.businessName || "",
        walletAddress: profile.walletAddress || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsLoading(true);
    setSuccess(false);

    try {
      await updateProfile({
        userId,
        name: formData.name || undefined,
        businessName: formData.businessName || undefined,
        walletAddress: formData.walletAddress || undefined,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId || !profile) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {/* Profile Section */}
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Acme Inc"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-2">Payment Settings</h2>
        <p className="text-gray-400 text-sm mb-6">Configure where you receive USDC payments</p>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            USDC Wallet Address (Base Network) *
          </label>
          <input
            type="text"
            value={formData.walletAddress}
            onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
          />
          <p className="text-xs text-gray-400 mt-2">
            This is where you'll receive USDC payments from your invoices. Make sure it's a Base network address.
          </p>
          
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-yellow-300 font-medium text-sm mb-1">Important</p>
                <p className="text-yellow-200 text-xs">
                  Double-check your wallet address. Payments sent to the wrong address cannot be recovered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-2">Account</h2>
        <p className="text-gray-400 text-sm mb-6">Manage your account settings</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Account Created</p>
              <p className="text-gray-400 text-sm">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div>
              <p className="text-red-300 font-medium">Delete Account</p>
              <p className="text-red-200 text-sm">Permanently delete your account and all data</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                  alert("Account deletion will be available soon");
                }
              }}
              className="px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : success ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Saved!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}