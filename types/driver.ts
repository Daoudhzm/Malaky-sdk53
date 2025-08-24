export interface Driver {
  id: number;
  profile_image_url?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  rating?: number;
  is_available: boolean;
  last_active_at?: Date;
  ride_status?: "pending" | "accepted" | "declined" | null;
  car_image_url?: string;
  car_model: string;
  car_color?: string;
  car_plate_number: string;
  car_seats: number;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;

  // Statistiques additionnelles
  total_rides?: number;
  total_earnings?: number;
  this_month_earnings?: number;
  acceptance_rate?: number;
  completion_rate?: number;
}

export interface DriverStats {
  total_rides: number;
  total_earnings: number;
  this_month_earnings: number;
  this_week_earnings: number;
  acceptance_rate: number;
  completion_rate: number;
  average_rating: number;
  total_distance: number;
}
