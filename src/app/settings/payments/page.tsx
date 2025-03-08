import { Breadcrumb } from '@/components/Breadcrumb';

export default function PaymentSettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Payment Methods</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Configure your payment providers
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-[--border-color] p-6 hover:bg-[--background-hover] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Stripe</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                Accept credit card payments via Stripe
              </p>
            </div>
            <button className="text-sm text-[--text-secondary] hover:text-[--text-primary]">
              Configure
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[--border-color] p-6 hover:bg-[--background-hover] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">PayPal</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                Accept payments via PayPal
              </p>
            </div>
            <button className="text-sm text-[--text-secondary] hover:text-[--text-primary]">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 