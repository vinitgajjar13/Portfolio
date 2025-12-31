
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  images?: string[];
  technologies?: string[];
  link?: string;
}

export interface Service {
  title: string;
  description: string;
}
