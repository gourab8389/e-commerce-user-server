export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
  role: "SUPER_ADMIN" | "SELLER" | "BUYER";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface SellerRegistrationRequest {
  businessName: string;
  businessType: string;
  gstNumber?: string;
  panNumber?: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    landmark?: string;
  };
  bankAccount: {
    accountNumber: string;
    ifscCode: string;
    accountHolder: string;
    bankName: string;
  };
}

export interface UserEvents {
  USER_REGISTERED: {
    userId: string;
    email: string;
    role: string;
  };
  SELLER_REGISTERED: {
    sellerId: string;
    userId: string;
    businessName: string;
  };
  SELLER_APPROVED: {
    sellerId: string;
    userId: string;
    businessName: string;
  };
  SELLER_REJECTED: {
    sellerId: string;
    userId: string;
    reason: string;
  };
}
