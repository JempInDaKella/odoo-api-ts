export interface Partner {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company_type?: 'company' | 'person';
}

export interface DashboardStats {
  totalPartners: number;
  totalCompanies: number;
}