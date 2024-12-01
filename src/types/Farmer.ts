export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface Farmer {
  id: number;
  name: string;
  location: string;
  contact_info: string;
  profile_picture: string;
  user: User | null;  // Update 'user' to be of type User, not just number
}
