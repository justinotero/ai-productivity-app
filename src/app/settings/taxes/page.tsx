import { Breadcrumb } from '@/components/Breadcrumb';

export default function TaxSettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Taxes</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Configure tax rates and regions
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-[--border-color] p-6 hover:bg-[--background-hover] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">United States</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                State and local taxes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[--text-secondary]">Varies by state</span>
              <button className="text-sm text-[--text-secondary] hover:text-[--text-primary]">
                Configure
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[--border-color] p-6 hover:bg-[--background-hover] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">European Union</h3>
              <p className="text-sm text-[--text-secondary] mt-1">
                VAT rates
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[--text-secondary]">Varies by country</span>
              <button className="text-sm text-[--text-secondary] hover:text-[--text-primary]">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 