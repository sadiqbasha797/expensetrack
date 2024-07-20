// src/app/models/user.ts

export interface User {
    _id?: string;
    username: string;
    email: string;
    password?: string; // Not to be used in front-end except for login or register
  }
  