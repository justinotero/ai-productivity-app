import { Breadcrumb } from '@/components/Breadcrumb';

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Store Details</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Basic information about your store
        </p>
      </div>

      <div className="max-w-2xl">
        <form className="space-y-6">
          <div className="rounded-lg border border-[--border-color] p-6 space-y-4">
            <div>
              <label className="text-sm font-medium block">Store Name</label>
              <input 
                type="text" 
                placeholder="Enter store name"
                className="mt-1 w-full rounded-lg border border-[--border-color] px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium block">Store URL</label>
              <input 
                type="url" 
                placeholder="https://example.com"
                className="mt-1 w-full rounded-lg border border-[--border-color] px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium block">Description</label>
              <textarea 
                rows={3}
                placeholder="Enter store description"
                className="mt-1 w-full rounded-lg border border-[--border-color] px-3 py-2"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 