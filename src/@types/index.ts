import { ReactNode } from "react";

export type TUser = {
  email: string;
};

export type VolunteerInput = {
  contact_name: string;
  contact_phone?: string;
  contact_email: string;
  contact_image?: string;
  title: string;
  limit?: number | "";
  address_line1: string;
  city: string;
  state: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  mapLink?: string;
  image: File | null;
};

export interface IFormFieldValidator<T, FormType extends object> {
  validate: (value: T, form: FormType) => TValidatorError;
}

export type Validator<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]?: IFormFieldValidator<any, T>;
};

export type TValidatorError = string | (string | null)[] | null;

export type GlobalButtonProps = {
  label: string;
  type?: "button" | "submit";
  loading?: boolean;
  onClick?: VoidFunction;
  disabled?: boolean;
  prefixIcon?: ReactNode;
  className?: string;
  form?: string;
};

export type ContainedButtonProps = {
  variant?: "contained" | "outlined";
};

export type LoginData = {
  walletAddress: string;
  passphrase: string;
};

export type PickupRequestInput = {
  size: number | "";
  addressId: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type TMetric = {
  title: string;
  value: number;
};

export enum RecyclableUnit {
  Kg = "Kg",
  Unit = "Unit",
}

export type TRecyclable = {
  _id: string;
  name: string;
  image: string;
  unit: RecyclableUnit;
  price_per_unit: number;
};

export enum UserAddressType {
  Home = "Home",
  Work = "Work",
}

export type TUserAddress = {
  _id: string;
  address: string;
  addressType: UserAddressType;
};

export enum PickupRequestStatus {
  pending = "pending",
  accepted = "accepted",
  processing = "processing",
  complete = "complete",
}

export type TPickupRequest = {
  _id: string;
  address: TUserAddress;
  item: TRecyclable;
  size: number;
  amount: number;
  pickup_date: string;
  date_completed: string;
  status: PickupRequestStatus;
  createdAt: string;
  updatedAt: string;
  requested_by: string;
  measured_weight_confirmed: boolean;
  picked_up: boolean;
};

export type LoginVerificationData = {
  code: string;
  session: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type OutlinedButtonProps = {};

export enum NotificationAction {
  acceptMeasuredUnit,
}

export type TNotification = {
  _id: string;
  message: string;
  action: NotificationAction | null;
  refId: string | null;
  createdAt: string;
  action_complete: boolean;
};

export type TVolunteerEvent = {
  _id: string;
  image: string;
  title: string;
  limit?: number | "";
  address_line1: string;
  city: string;
  state: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  mapLink?: string;
};
