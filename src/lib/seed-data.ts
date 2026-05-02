export type Specialty = {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export type LawFirm = {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  firmSize: "solo" | "small" | "mid" | "large";
  yearFounded: number;
  featured: boolean;
  specialtyIds: number[];
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  specialtyId: number;
  firmId: string | null;
  status: "new" | "reviewed" | "matched" | "closed";
  createdAt: string;
};

export const specialties: Specialty[] = [
  {
    id: 1,
    name: "Business Formation",
    slug: "business-formation",
    description:
      "LLC, incorporation, partnership agreements, and business structuring.",
    icon: "Building2",
  },
  {
    id: 2,
    name: "Intellectual Property",
    slug: "intellectual-property",
    description: "Patents, trademarks, copyrights, and trade secrets.",
    icon: "Lightbulb",
  },
  {
    id: 3,
    name: "Employment Law",
    slug: "employment-law",
    description:
      "Workplace disputes, contracts, discrimination, and compliance.",
    icon: "Users",
  },
  {
    id: 4,
    name: "Real Estate",
    slug: "real-estate",
    description: "Property transactions, leases, zoning, and land use.",
    icon: "Home",
  },
  {
    id: 5,
    name: "Immigration",
    slug: "immigration",
    description: "Visas, green cards, citizenship, and immigration compliance.",
    icon: "Globe",
  },
  {
    id: 6,
    name: "Family Law",
    slug: "family-law",
    description: "Divorce, custody, adoption, and prenuptial agreements.",
    icon: "Heart",
  },
  {
    id: 7,
    name: "Criminal Defense",
    slug: "criminal-defense",
    description:
      "Defense representation for criminal charges and investigations.",
    icon: "Shield",
  },
  {
    id: 8,
    name: "Personal Injury",
    slug: "personal-injury",
    description: "Accident claims, medical malpractice, and wrongful death.",
    icon: "AlertTriangle",
  },
  {
    id: 9,
    name: "Tax Law",
    slug: "tax-law",
    description: "Tax planning, disputes, audits, and compliance.",
    icon: "Calculator",
  },
  {
    id: 10,
    name: "Estate Planning",
    slug: "estate-planning",
    description: "Wills, trusts, probate, and estate administration.",
    icon: "FileText",
  },
  {
    id: 11,
    name: "Contract Disputes",
    slug: "contract-disputes",
    description: "Breach of contract, negotiation, and commercial litigation.",
    icon: "FileWarning",
  },
  {
    id: 12,
    name: "Civil Litigation",
    slug: "civil-litigation",
    description:
      "General civil disputes, lawsuits, and alternative dispute resolution.",
    icon: "Scale",
  },
];

export const lawFirms: LawFirm[] = [
  {
    id: "f1",
    name: "Parker & Associates",
    slug: "parker-associates",
    description:
      "A boutique firm specializing in startup formation and venture capital transactions. We help founders navigate the legal complexities of building a company from the ground up.",
    website: "https://parkerassociates.example.com",
    email: "info@parkerassociates.example.com",
    phone: "(212) 555-0101",
    city: "New York",
    state: "NY",
    firmSize: "small",
    yearFounded: 2015,
    featured: true,
    specialtyIds: [1, 2, 11],
  },
  {
    id: "f2",
    name: "Chen IP Law",
    slug: "chen-ip-law",
    description:
      "Focused exclusively on intellectual property protection for tech companies. From patent prosecution to IP litigation, we safeguard your innovations.",
    website: "https://cheniplaw.example.com",
    email: "contact@cheniplaw.example.com",
    phone: "(415) 555-0202",
    city: "San Francisco",
    state: "CA",
    firmSize: "small",
    yearFounded: 2018,
    featured: true,
    specialtyIds: [2, 11],
  },
  {
    id: "f3",
    name: "Rivera Employment Group",
    slug: "rivera-employment-group",
    description:
      "Representing both employers and employees in workplace matters. We provide practical, cost-effective legal solutions for employment disputes and compliance.",
    website: "https://riveraemployment.example.com",
    email: "help@riveraemployment.example.com",
    phone: "(312) 555-0303",
    city: "Chicago",
    state: "IL",
    firmSize: "mid",
    yearFounded: 2010,
    featured: false,
    specialtyIds: [3, 12],
  },
  {
    id: "f4",
    name: "Westfield Real Estate Law",
    slug: "westfield-real-estate",
    description:
      "Full-service real estate legal practice handling commercial and residential transactions, development projects, and landlord-tenant disputes.",
    website: "https://westfieldrelaw.example.com",
    email: "info@westfieldrelaw.example.com",
    phone: "(310) 555-0404",
    city: "Los Angeles",
    state: "CA",
    firmSize: "mid",
    yearFounded: 2008,
    featured: true,
    specialtyIds: [4, 11],
  },
  {
    id: "f5",
    name: "Gupta Immigration Services",
    slug: "gupta-immigration",
    description:
      "Dedicated immigration law practice helping individuals and businesses navigate the U.S. immigration system. Expertise in H-1B, EB-5, and family-based petitions.",
    website: "https://guptaimmigration.example.com",
    email: "info@guptaimmigration.example.com",
    phone: "(713) 555-0505",
    city: "Houston",
    state: "TX",
    firmSize: "small",
    yearFounded: 2016,
    featured: false,
    specialtyIds: [5],
  },
  {
    id: "f6",
    name: "Morrison Family Law",
    slug: "morrison-family-law",
    description:
      "Compassionate and skilled family law attorneys handling divorce, custody, and adoption with a focus on preserving family relationships.",
    website: "https://morrisonfamily.example.com",
    email: "info@morrisonfamily.example.com",
    phone: "(617) 555-0606",
    city: "Boston",
    state: "MA",
    firmSize: "small",
    yearFounded: 2012,
    featured: false,
    specialtyIds: [6, 10],
  },
  {
    id: "f7",
    name: "Atlas Legal Partners",
    slug: "atlas-legal-partners",
    description:
      "A modern, full-service law firm serving startups and growing businesses. We combine deep legal expertise with a practical understanding of business.",
    website: "https://atlaslegal.example.com",
    email: "hello@atlaslegal.example.com",
    phone: "(512) 555-0707",
    city: "Austin",
    state: "TX",
    firmSize: "mid",
    yearFounded: 2014,
    featured: true,
    specialtyIds: [1, 2, 3, 9, 11],
  },
  {
    id: "f8",
    name: "Nakamura Tax Advisors",
    slug: "nakamura-tax",
    description:
      "Specialized tax law firm providing strategic tax planning, IRS dispute resolution, and compliance services for individuals and businesses.",
    website: "https://nakamuratax.example.com",
    email: "tax@nakamuratax.example.com",
    phone: "(206) 555-0808",
    city: "Seattle",
    state: "WA",
    firmSize: "solo",
    yearFounded: 2020,
    featured: false,
    specialtyIds: [9, 1],
  },
  {
    id: "f9",
    name: "Sterling Defense Group",
    slug: "sterling-defense",
    description:
      "Aggressive criminal defense representation. Former prosecutors who understand both sides of the courtroom and fight for the best possible outcome.",
    website: "https://sterlingdefense.example.com",
    email: "defense@sterlingdefense.example.com",
    phone: "(305) 555-0909",
    city: "Miami",
    state: "FL",
    firmSize: "small",
    yearFounded: 2011,
    featured: false,
    specialtyIds: [7],
  },
  {
    id: "f10",
    name: "Blackwell & Moore",
    slug: "blackwell-moore",
    description:
      "Established civil litigation firm with a proven track record in complex commercial disputes, class actions, and appellate advocacy.",
    website: "https://blackwellmoore.example.com",
    email: "info@blackwellmoore.example.com",
    phone: "(202) 555-1010",
    city: "Washington",
    state: "DC",
    firmSize: "large",
    yearFounded: 2001,
    featured: true,
    specialtyIds: [11, 12, 3],
  },
  {
    id: "f11",
    name: "Patel Estate Planning",
    slug: "patel-estate-planning",
    description:
      "Helping families protect their legacy through comprehensive estate planning, including wills, trusts, and business succession planning.",
    website: "https://patelestate.example.com",
    email: "plan@patelestate.example.com",
    phone: "(404) 555-1111",
    city: "Atlanta",
    state: "GA",
    firmSize: "solo",
    yearFounded: 2019,
    featured: false,
    specialtyIds: [10, 9],
  },
  {
    id: "f12",
    name: "Coastal Injury Law",
    slug: "coastal-injury-law",
    description:
      "Results-driven personal injury firm. No fees unless we win. Handling auto accidents, slip and falls, medical malpractice, and wrongful death.",
    website: "https://coastalinjury.example.com",
    email: "help@coastalinjury.example.com",
    phone: "(858) 555-1212",
    city: "San Diego",
    state: "CA",
    firmSize: "small",
    yearFounded: 2013,
    featured: false,
    specialtyIds: [8, 12],
  },
];

export const sampleInquiries: Inquiry[] = [
  {
    id: "inq1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "(555) 111-2222",
    message:
      "I'm starting a tech company and need help with incorporation and IP protection.",
    specialtyId: 1,
    firmId: "f1",
    status: "new",
    createdAt: "2026-04-28T10:30:00Z",
  },
  {
    id: "inq2",
    name: "Mike Torres",
    email: "mike@example.com",
    phone: "(555) 333-4444",
    message: "Need help with an employment dispute — wrongful termination.",
    specialtyId: 3,
    firmId: null,
    status: "reviewed",
    createdAt: "2026-04-27T14:15:00Z",
  },
  {
    id: "inq3",
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "(555) 555-6666",
    message: "Looking for help with H-1B visa transfer for my new job.",
    specialtyId: 5,
    firmId: "f5",
    status: "matched",
    createdAt: "2026-04-25T09:00:00Z",
  },
  {
    id: "inq4",
    name: "James Lee",
    email: "james@example.com",
    phone: "(555) 777-8888",
    message: "Need estate planning — will and trust setup for our family.",
    specialtyId: 10,
    firmId: null,
    status: "new",
    createdAt: "2026-05-01T16:45:00Z",
  },
  {
    id: "inq5",
    name: "Ana Rodriguez",
    email: "ana@example.com",
    phone: "(555) 999-0000",
    message: "Commercial lease dispute with my landlord. Need legal advice.",
    specialtyId: 4,
    firmId: "f4",
    status: "closed",
    createdAt: "2026-04-20T11:30:00Z",
  },
];

export function getFirmsBySpecialty(specialtyId: number): LawFirm[] {
  return lawFirms.filter((f) => f.specialtyIds.includes(specialtyId));
}

export function getFirmBySlug(slug: string): LawFirm | undefined {
  return lawFirms.find((f) => f.slug === slug);
}

export function getSpecialtyById(id: number): Specialty | undefined {
  return specialties.find((s) => s.id === id);
}

export function getSpecialtiesForFirm(firm: LawFirm): Specialty[] {
  return firm.specialtyIds.map((id) => getSpecialtyById(id)!).filter(Boolean);
}
