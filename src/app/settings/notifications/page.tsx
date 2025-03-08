'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Switch } from '@/components/Switch';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const defaultEmailSettings: NotificationSetting[] = [
  {
    id: 'new-order',
    title: 'New Order',
    description: 'When a new order is placed',
    enabled: true,
  },
  {
    id: 'order-status',
    title: 'Order Status Update',
    description: 'When an order status changes',
    enabled: true,
  },
];

const defaultAppSettings: NotificationSetting[] = [
  {
    id: 'low-stock',
    title: 'Low Stock Alert',
    description: 'When product stock is low',
    enabled: true,
  },
];

export default function NotificationSettingsPage() {
  const [emailSettings, setEmailSettings] = useState(defaultEmailSettings);
  const [appSettings, setAppSettings] = useState(defaultAppSettings);

  const handleToggle = (settingId: string, isEmail: boolean) => {
    if (isEmail) {
      setEmailSettings(settings =>
        settings.map(setting =>
          setting.id === settingId
            ? { ...setting, enabled: !setting.enabled }
            : setting
        )
      );
    } else {
      setAppSettings(settings =>
        settings.map(setting =>
          setting.id === settingId
            ? { ...setting, enabled: !setting.enabled }
            : setting
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Configure email and app notifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border border-[--border-color] p-6">
          <h3 className="font-medium">Email Notifications</h3>
          <div className="mt-4 space-y-3">
            {emailSettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{setting.title}</p>
                  <p className="text-sm text-[--text-secondary]">{setting.description}</p>
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => handleToggle(setting.id, true)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[--border-color] p-6">
          <h3 className="font-medium">App Notifications</h3>
          <div className="mt-4 space-y-3">
            {appSettings.map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{setting.title}</p>
                  <p className="text-sm text-[--text-secondary]">{setting.description}</p>
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => handleToggle(setting.id, false)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 