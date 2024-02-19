export interface AdminCredentials {
  userName: string;
  schoolName: string | undefined;
  email: any;
  role: string | undefined;
  password: string;
  schoolid?: string | undefined;
  image?: string | null;
  phoneNumber?: string;
}

export interface User {
  email: string;
  password: string;
  Role: string | undefined;
}

export interface updateAdminCred {
  username?: string;
  phoneNumber?: string;
  image?: string | null;
}
