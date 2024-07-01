// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AgencyTemplate = {
  id: string;
  name: string;
  logo_url: string;
  logo_opacity_url: string;
  float_cover_elements1: string;
  float_cover_elements2: string;
  float_cover_elements3: string;
  title_content_header: string;
  background_content_pages: string;
  back_cover_background: string;
  floating_back_cover_elements1: string;
  floating_back_cover_elements2: string;
};

export type ReportTemplate = {
  id: string;
  agency_id: string;
  company_name: string;
  url_site: string;
  kit_digital: string;
};

export type ReportsCardType = {
  id: string;
  agency_id: string;
  name: string;
  select_template: string;
  url_site: string;
  urlSite: string;
  yes_radio: boolean;
  no_radio: boolean;
  setReportId?: (id: string) => void;
  setShowModal?: (show: boolean) => void;
};

export type ReportObject = {
  id: string;
  name: string;
  logo_url: string;
  logo_opacity_url: string;
  back_cover_background: string;
  background_content_pages: string;
  float_cover_elements1: string;
  float_cover_elements2: string;
  float_cover_elements3: string;
  floating_back_cover_elements1: string;
  floating_back_cover_elements2: string;
  agency_id: string;
  select_template: string;
  url_site: string;
  yes_radio: boolean;
  no_radio: boolean;
  cover: string;
  tecnical: string[];
  keywords: string[];
  semrush: string[];
};

export type CloudinaryData = {
  resources: {
    folder: string;
    secure_url: string;
  }[];
};

export type Clients = {
  id: string;
  agency_name: string;
  name: string;
  logo_url: string;
  color_card: string;
  monthly_payment: string;
  agency_id: string;
  paused: boolean;
};
// id: '64cdd2ca-15d6-4d19-9ada-3370f75c5659',
//       agency_name: 'Dinkbit',
//       name: 'Studex',
//       monthly_payment: '90.00',
//       color_card: '#f9f6f6',
//       agency_id: 'd844ac3f-0fad-4ece-a11f-ae18bb08da47',
//       logo_url:
//         'https://res.cloudinary.com/dxjuhqvt6/image/upload/v1712455962/agency-client-Dinkbit/Studex/cgmbv5pndzyzjy9gqqp1.png'
//     }

export type Customer = {
  id: string;
  name: string;
  paid_amount: number;
  status: string;
  paid_type: string;
  probability: number;
  comment: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  user_role: string;
  user_avatar: string;
};

export type StatePotentialCustomer = {
  status: string;
  label: string;
  color: string;
};

export type SemrushImages = {
  id: string;
  name: string;
  url: string;
  position: number;
};
