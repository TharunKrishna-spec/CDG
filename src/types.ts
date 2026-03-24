export interface Stat {
  label: string;
  value: string;
}

export interface Department {
  name: string;
  description: string;
  icon: string;
}

export interface BoardMember {
  name: string;
  role: string;
  image?: string;
  department?: string;
}

export interface Event {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: string;
  image?: string;
  longDescription?: string;
}

export interface OpenRole {
  title: string;
  description: string;
}
