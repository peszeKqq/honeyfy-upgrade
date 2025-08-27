// Admin configuration
const ADMIN_EMAILS = [
  'david.masa@hotmail.com', // Your admin email
  'admin@honeyfy.com',      // Add more admin emails as needed
];

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function getAdminEmails(): string[] {
  return ADMIN_EMAILS;
}

// Optional: Add admin roles for more granular control
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  CONTENT_ADMIN: 'content_admin',
  NEWSLETTER_ADMIN: 'newsletter_admin',
} as const;

export type AdminRole = typeof ADMIN_ROLES[keyof typeof ADMIN_ROLES];

// Admin role mapping (you can customize this)
const ADMIN_ROLE_MAPPING: Record<string, AdminRole[]> = {
  'david.masa@hotmail.com': [ADMIN_ROLES.SUPER_ADMIN], // Full access
  'admin@honeyfy.com': [ADMIN_ROLES.CONTENT_ADMIN, ADMIN_ROLES.NEWSLETTER_ADMIN], // Limited access
};

export function getAdminRoles(email: string): AdminRole[] {
  return ADMIN_ROLE_MAPPING[email.toLowerCase()] || [];
}

export function hasRole(email: string, role: AdminRole): boolean {
  return getAdminRoles(email).includes(role);
}
