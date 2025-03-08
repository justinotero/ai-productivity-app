import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

interface SettingCard {
  title: string;
  description: string;
  href: string;
}

const settingCards: SettingCard[] = [
  {
    title: 'Store Details',
    description: 'Basic information about your store',
    href: '/settings/store'
  },
  {
    title: 'Payment Methods',
    description: 'Configure your payment providers',
    href: '/settings/payments'
  },
  {
    title: 'Shipping',
    description: 'Manage shipping zones and rates',
    href: '/settings/shipping'
  },
  {
    title: 'Taxes',
    description: 'Configure tax rates and regions',
    href: '/settings/taxes'
  },
  {
    title: 'Team',
    description: 'Manage team members and roles',
    href: '/settings/team'
  },
  {
    title: 'Notifications',
    description: 'Configure email and app notifications',
    href: '/settings/notifications'
  }
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Manage your store preferences and configuration.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {settingCards.map((card) => (
          <Link 
            key={card.href} 
            href={card.href}
            className="rounded-lg border border-[--border-color] p-6 hover:border-[--text-secondary] transition-colors cursor-pointer"
          >
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="text-sm text-[--text-secondary] mt-1">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
} 