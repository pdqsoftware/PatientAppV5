export interface Patient {
  id?: number;
  name: string;
  surname: string;
  southAfricanIdNumber: string;
  dateOfBirth: string; // Use ISO string (e.g. "1990-01-01")

  weightKg?: number;
  heightCm?: number;
  gender?: string;

  // Add a new column
  // homeTown?: string;

  // Derived fields (optional for view use)
  age?: number;
  bmi?: number;
}
