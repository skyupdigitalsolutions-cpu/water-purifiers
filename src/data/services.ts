import { Wrench, Settings2, Filter, Hammer, Package, CalendarCheck, type LucideIcon } from 'lucide-react';

export type Service = { title: string; description: string; icon: LucideIcon; points: string[] };

export const services: Service[] = [
  {
    title: 'Free Water Purifier Installation',
    description: 'Neat wall or counter installation of new purifiers, with inlet and drain connections set up properly.',
    icon: Wrench,
    points: ['New purifier setup', 'Inlet & drain connections', 'Usage walkthrough'],
  },
  {
    title: 'RO Water Purifier Service',
    description: 'General servicing to keep your RO purifier running cleanly and delivering good water flow.',
    icon: Settings2,
    points: ['Inspection & cleaning', 'Flow & leak check', 'Multi-brand support'],
  },
  {
    title: 'Filter & Membrane Replacement',
    description: 'Replacement of sediment and carbon filters and RO membranes when they are due.',
    icon: Filter,
    points: ['Pre-filters & carbon', 'RO membranes', 'Advice on timing'],
  },
  {
    title: 'Water Purifier Repair',
    description: 'Diagnosis and repair of common issues such as leaks, low flow, noise or no water output.',
    icon: Hammer,
    points: ['Fault diagnosis', 'Leak & flow issues', 'Part replacement'],
  },
  {
    title: 'RO Components & Spare Parts',
    description: 'RO components and spares for servicing and upgrades — ask us for the part you need.',
    icon: Package,
    points: ['Filters & membranes', 'Pumps & valves', 'Fittings & accessories'],
  },
  {
    title: 'Regular Maintenance Support',
    description: 'Periodic maintenance so your purifier keeps performing — just call or WhatsApp to book.',
    icon: CalendarCheck,
    points: ['Scheduled check-ups', 'Filter reminders', 'Ongoing support'],
  },
];
