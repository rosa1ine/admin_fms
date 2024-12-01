export interface Buyer {
  id: number;
  delivery_address: string;
  contact_number: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    is_active: boolean;
  };
}
