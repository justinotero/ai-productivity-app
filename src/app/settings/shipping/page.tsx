import { Breadcrumb } from '@/components/Breadcrumb';

export default function ShippingSettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Shipping</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Manage shipping zones and rates
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-[--border-color] p-6 hover:bg-[--background-hover] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Domestic Shipping</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                United States
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[--text-secondary]">From $5.00</span>
              <button className="text-sm text-[--text-secondary] hover:text-[--text-primary]">
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[--border-color] p-6 hover:bg-[--background-hover] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">International Shipping</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                Rest of World
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[--text-secondary]">From $15.00</span>
              <button className="text-sm text-[--text-secondary] hover:text-[--text-primary]">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 