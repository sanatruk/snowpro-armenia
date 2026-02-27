export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type PaymentType = "deposit" | "balance" | "refund" | "payout";

export interface Database {
  public: {
    Tables: {
      instructors: {
        Row: {
          readonly id: string;
          readonly name: string;
          readonly slug: string;
          readonly photo_url: string | null;
          readonly headline: string;
          readonly bio: string;
          readonly sport: "ski" | "snowboard" | "both";
          readonly specialties: readonly string[];
          readonly levels: readonly string[];
          readonly languages: readonly string[];
          readonly teaching_styles: readonly string[];
          readonly resorts: readonly string[];
          readonly price_per_hour: number;
          readonly currency: string;
          readonly experience_years: number;
          readonly certifications: readonly string[];
          readonly stripe_account_id: string | null;
          readonly stripe_onboarded: boolean;
          readonly featured: boolean;
          readonly active: boolean;
          readonly rating_avg: number;
          readonly rating_count: number;
          readonly created_at: string;
          readonly updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["instructors"]["Row"],
          "created_at" | "updated_at" | "rating_avg" | "rating_count"
        > & {
          readonly created_at?: string;
          readonly updated_at?: string;
          readonly rating_avg?: number;
          readonly rating_count?: number;
        };
        Update: Partial<
          Database["public"]["Tables"]["instructors"]["Insert"]
        >;
      };
      availability: {
        Row: {
          readonly id: string;
          readonly instructor_id: string;
          readonly date: string;
          readonly start_time: string;
          readonly end_time: string;
          readonly resort_slug: string;
          readonly is_booked: boolean;
          readonly created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["availability"]["Row"],
          "id" | "created_at" | "is_booked"
        > & {
          readonly id?: string;
          readonly created_at?: string;
          readonly is_booked?: boolean;
        };
        Update: Partial<
          Database["public"]["Tables"]["availability"]["Insert"]
        >;
      };
      bookings: {
        Row: {
          readonly id: string;
          readonly student_id: string;
          readonly instructor_id: string;
          readonly availability_id: string;
          readonly resort_slug: string;
          readonly date: string;
          readonly start_time: string;
          readonly end_time: string;
          readonly status: BookingStatus;
          readonly total_amount: number;
          readonly deposit_amount: number;
          readonly platform_fee: number;
          readonly currency: string;
          readonly stripe_payment_intent_id: string | null;
          readonly stripe_checkout_session_id: string | null;
          readonly cancelled_at: string | null;
          readonly cancellation_reason: string | null;
          readonly notes: string | null;
          readonly created_at: string;
          readonly updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["bookings"]["Row"],
          | "id"
          | "created_at"
          | "updated_at"
          | "cancelled_at"
          | "cancellation_reason"
          | "stripe_payment_intent_id"
          | "stripe_checkout_session_id"
          | "platform_fee"
        > & {
          readonly id?: string;
          readonly created_at?: string;
          readonly updated_at?: string;
          readonly cancelled_at?: string | null;
          readonly cancellation_reason?: string | null;
          readonly stripe_payment_intent_id?: string | null;
          readonly stripe_checkout_session_id?: string | null;
          readonly platform_fee?: number;
        };
        Update: Partial<
          Database["public"]["Tables"]["bookings"]["Insert"]
        >;
      };
      reviews: {
        Row: {
          readonly id: string;
          readonly booking_id: string;
          readonly student_id: string;
          readonly instructor_id: string;
          readonly rating: number;
          readonly comment: string | null;
          readonly created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["reviews"]["Row"],
          "id" | "created_at"
        > & {
          readonly id?: string;
          readonly created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["reviews"]["Insert"]
        >;
      };
      payments: {
        Row: {
          readonly id: string;
          readonly booking_id: string;
          readonly type: PaymentType;
          readonly amount: number;
          readonly currency: string;
          readonly stripe_id: string | null;
          readonly created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["payments"]["Row"],
          "id" | "created_at"
        > & {
          readonly id?: string;
          readonly created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["payments"]["Insert"]
        >;
      };
    };
  };
}

// Convenience type aliases
export type Instructor =
  Database["public"]["Tables"]["instructors"]["Row"];
export type Availability =
  Database["public"]["Tables"]["availability"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
