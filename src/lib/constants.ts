import { PickupRequestStatus, RecyclableUnit } from "../@types";

export const recyclableUnitDescriptionMapping = {
  [RecyclableUnit.Kg]: "weight",
  [RecyclableUnit.Unit]: "unit",
};

export const pickupStatusColors = {
  [PickupRequestStatus.pending]: {
    background: "#f8d7da",
    foreground: "#721c24",
  }, // Light red background, dark red text
  [PickupRequestStatus.accepted]: {
    background: "#d4edda",
    foreground: "#155724",
  }, // Light green background, dark green text
  [PickupRequestStatus.processing]: {
    background: "#fff3cd",
    foreground: "#856404",
  }, // Light yellow background, dark brown text
  [PickupRequestStatus.complete]: {
    background: "#d1ecf1",
    foreground: "#0c5460",
  }, // Light blue background, dark blue text
};
