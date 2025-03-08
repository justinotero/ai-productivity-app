import { Breadcrumb } from '@/components/Breadcrumb';
import { TeamMember, teamMembers } from '@/data/team';

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      
      <div>
        <h1 className="text-2xl font-semibold">Team</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Manage team members and roles
        </p>
      </div>

      <div className="rounded-lg border border-[--border-color] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[--background-hover] border-b border-[--border-color]">
            <tr>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Name</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Email</th>
              <th className="text-left text-sm font-medium text-[--text-secondary] px-6 py-3">Role</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[--border-color]">
            {teamMembers.map((member) => (
              <tr key={member.id} className="hover:bg-[--background-hover] cursor-pointer">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4 text-sm">{member.email}</td>
                <td className="px-6 py-4 text-sm">{member.role}</td>
                <td className="px-6 py-4 text-sm text-right">
                  <button className="text-[--text-secondary] hover:text-[--text-primary]">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 