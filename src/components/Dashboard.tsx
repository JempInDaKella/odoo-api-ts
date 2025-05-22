import React, { useEffect, useState } from 'react';
import { Odoo } from '../odoo-api';
import type { Partner, DashboardStats } from '../types/odoo';

interface DashboardProps {
  odoo: Odoo;
  onLogout: () => void;
}

export default function Dashboard({ odoo, onLogout }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({ totalPartners: 0, totalCompanies: 0 });
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = odoo.env('res.partner');
        
        // Get total partners
        const totalPartners = await res.search_count([]);
        
        // Get total companies
        const totalCompanies = await res.search_count([
          ['company_type', '=', 'company']
        ]);

        // Get recent partners
        const recentPartners = await res.search_read<Partner>(
          [['id', '!=', false]], 
          ['name', 'email', 'phone', 'company_type'],
          5,
          0,
          'create_date DESC'
        );

        setStats({ totalPartners, totalCompanies });
        setPartners(recentPartners);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [odoo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Partners</h2>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalPartners}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Companies</h2>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalCompanies}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Partners</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {partners.map((partner) => (
                    <tr key={partner.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{partner.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{partner.email || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{partner.phone || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{partner.company_type || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}