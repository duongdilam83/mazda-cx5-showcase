export interface CarVersion {
  id: string;
  name: string;
  subTitle: string;
  engine: string;
  power: string;
  torque: string;
  transmission: string;
  drive: string;
  priceVnd: number;
  highlightFeatures: string[];
  recommended?: boolean;
}

export interface CarColor {
  id: string;
  name: string;
  code: string;
  hex: string;
  accentHex: string;
  imageUrl: string;
  description: string;
}

export interface TechHighlight {
  id: string;
  category: "design" | "performance" | "safety" | "interior";
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  bulletPoints: string[];
}

export interface TestDriveFormData {
  fullName: string;
  phone: string;
  email?: string;
  versionInterest: string;
  preferredCity: string;
  preferredDate: string;
  notes?: string;
}

export interface CalculationResult {
  listedPrice: number;
  registrationTax: number; // Thuế trước bạ
  licensePlateFee: number; // Biển số
  roadMaintenanceFee: number; // Phí đường bộ
  civilInsuranceFee: number; // Bảo hiểm TNDS
  inspectionFee: number; // Phí đăng kiểm
  totalOnRoad: number;
  loanAmount: number;
  downPayment: number;
  monthlyPaymentEstimate: number;
}
