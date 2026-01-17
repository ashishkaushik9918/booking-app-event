"use client"
import {
  Home,
  Calendar,
  Users,
  ClipboardList,
  Wallet,
  Percent,
  Bell,
  FileText,
  BarChart3,
  Settings,
  MapPin,
  UserCog,
  Shield,
  CreditCard,
  Layers,
  Star,
  LogOut,
  KeyRound,
  User,
  Activity,
  LifeBuoy,
  Key,
  CheckCheck,
  Sun,
  List,
  HelpCircle,
  Moon,
  Globe,
  Search,
  ChartNoAxesCombined,
  File,
  ShieldAlert


} from "lucide-react";

export const navigationIcon: Record<string, React.ElementType> = {
  ShieldAlert:ShieldAlert,
  Dashboard: Home,
  Bookings: Calendar,
  Customers: Users,
  Services: ClipboardList,
  Finance: Wallet,
  Offers: Percent,
  Notifications: Bell,
  CMS: FileText,
  Reports: BarChart3,
  Settings: Settings,
  Locations: MapPin,
  Staff: UserCog,
  Security: Shield,
  Subscriptions: CreditCard,
  Integrations: Layers,
  Reviews: Star,
  LogOut: LogOut,
  KeyRound: KeyRound,
  User:User,
  Activity:Activity,
  LifeBuoy:LifeBuoy,
  Key:Key,
  CheckCheck:CheckCheck,
  Sun:Sun,
  List:List,
  HelpCircle:HelpCircle,
  Moon:Moon,
  Globe:Globe,
  Search: Search,
  CreditCard: CreditCard,
  Bell: Bell,
  BarChart3: ChartNoAxesCombined,
  File:File
};

type Props = {
  iconName: keyof typeof navigationIcon;
  size?: number;
  className?: string;
};

export default function NavIcon({ iconName, size = 20 ,className}: Props) {
  const Icon = navigationIcon[iconName];

  if (!Icon) return null;

  return <Icon size={size} className={ className} />;
}