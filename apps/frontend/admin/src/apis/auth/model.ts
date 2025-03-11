export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  role: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
