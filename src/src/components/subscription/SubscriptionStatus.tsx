import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';

export default function SubscriptionStatus() {
  const { user } = useAuth();
  const subscription = authService.getCurrentSubscription();

  if (!user || !subscription) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current Plan:</span>
          <span className="font-medium capitalize">{subscription.plan}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
            {subscription.status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Valid Until:</span>
          <span className="font-medium">{formatDate(subscription.endDate)}</span>
        </div>

        {subscription.nextPayment && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Next Payment:</span>
            <span className="font-medium">{formatDate(subscription.nextPayment)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Auto-Renew:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.autoRenew ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {subscription.autoRenew ? 'Enabled' : 'Disabled'}
          </span>
        </div>

        {user.platform !== 'web' && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Device ID:</span>
            <span className="font-mono text-sm">{user.deviceId}</span>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Upgrade Plan
        </button>
        {subscription.status === 'pending' && (
          <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
            Enter Activation Code
          </button>
        )}
      </div>
    </div>
  );
}