interface User {
  id: number; 
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersApiResponse {
  page: number;
  total_pages: number;
  data: User[];
}

export type { User, UsersApiResponse };