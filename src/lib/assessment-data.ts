export type AssessmentQuestion = {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    nextQuestionId: string | null; // null = end
    specialtyIds: number[]; // contributes to recommendation
  }[];
};

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "What area does your legal need relate to?",
    options: [
      {
        label: "Business or Company",
        value: "business",
        nextQuestionId: "q2a",
        specialtyIds: [],
      },
      {
        label: "Personal or Family",
        value: "personal",
        nextQuestionId: "q2b",
        specialtyIds: [],
      },
      {
        label: "Property or Real Estate",
        value: "property",
        nextQuestionId: "q2c",
        specialtyIds: [],
      },
      {
        label: "I was injured or harmed",
        value: "injury",
        nextQuestionId: "q2d",
        specialtyIds: [8],
      },
      {
        label: "Criminal matter",
        value: "criminal",
        nextQuestionId: "q3criminal",
        specialtyIds: [7],
      },
    ],
  },
  {
    id: "q2a",
    question: "What kind of business matter?",
    options: [
      {
        label: "Starting a new business",
        value: "formation",
        nextQuestionId: "q3biz",
        specialtyIds: [1],
      },
      {
        label: "Protecting an idea or invention",
        value: "ip",
        nextQuestionId: "q3ip",
        specialtyIds: [2],
      },
      {
        label: "Employee or workplace issue",
        value: "employment",
        nextQuestionId: "q3employment",
        specialtyIds: [3],
      },
      {
        label: "Contract dispute",
        value: "contract",
        nextQuestionId: "q3contract",
        specialtyIds: [11],
      },
      {
        label: "Tax issue",
        value: "tax",
        nextQuestionId: null,
        specialtyIds: [9],
      },
    ],
  },
  {
    id: "q2b",
    question: "What kind of personal matter?",
    options: [
      {
        label: "Divorce or separation",
        value: "divorce",
        nextQuestionId: null,
        specialtyIds: [6],
      },
      {
        label: "Child custody",
        value: "custody",
        nextQuestionId: null,
        specialtyIds: [6],
      },
      {
        label: "Adoption",
        value: "adoption",
        nextQuestionId: null,
        specialtyIds: [6],
      },
      {
        label: "Immigration",
        value: "immigration",
        nextQuestionId: "q3immigration",
        specialtyIds: [5],
      },
      {
        label: "Will or estate planning",
        value: "estate",
        nextQuestionId: null,
        specialtyIds: [10],
      },
    ],
  },
  {
    id: "q2c",
    question: "What kind of property matter?",
    options: [
      {
        label: "Buying or selling property",
        value: "transaction",
        nextQuestionId: null,
        specialtyIds: [4],
      },
      {
        label: "Landlord-tenant dispute",
        value: "landlord",
        nextQuestionId: null,
        specialtyIds: [4, 12],
      },
      {
        label: "Lease negotiation",
        value: "lease",
        nextQuestionId: null,
        specialtyIds: [4, 11],
      },
      {
        label: "Zoning or development",
        value: "zoning",
        nextQuestionId: null,
        specialtyIds: [4],
      },
    ],
  },
  {
    id: "q2d",
    question: "Can you tell us more about the injury?",
    options: [
      {
        label: "Car or vehicle accident",
        value: "auto",
        nextQuestionId: null,
        specialtyIds: [8],
      },
      {
        label: "Workplace injury",
        value: "workplace",
        nextQuestionId: null,
        specialtyIds: [8, 3],
      },
      {
        label: "Medical malpractice",
        value: "medical",
        nextQuestionId: null,
        specialtyIds: [8],
      },
      {
        label: "Slip and fall or premises",
        value: "premises",
        nextQuestionId: null,
        specialtyIds: [8],
      },
    ],
  },
  {
    id: "q3biz",
    question: "What stage is your business?",
    options: [
      {
        label: "Just an idea",
        value: "idea",
        nextQuestionId: null,
        specialtyIds: [1],
      },
      {
        label: "Ready to incorporate",
        value: "incorporate",
        nextQuestionId: null,
        specialtyIds: [1],
      },
      {
        label: "Already operating, need restructuring",
        value: "restructure",
        nextQuestionId: null,
        specialtyIds: [1, 9],
      },
      {
        label: "Raising funding",
        value: "funding",
        nextQuestionId: null,
        specialtyIds: [1, 11],
      },
    ],
  },
  {
    id: "q3ip",
    question: "What kind of IP protection?",
    options: [
      {
        label: "Patent (invention)",
        value: "patent",
        nextQuestionId: null,
        specialtyIds: [2],
      },
      {
        label: "Trademark (brand/logo)",
        value: "trademark",
        nextQuestionId: null,
        specialtyIds: [2],
      },
      {
        label: "Copyright (creative work)",
        value: "copyright",
        nextQuestionId: null,
        specialtyIds: [2],
      },
      {
        label: "Someone is infringing my IP",
        value: "infringement",
        nextQuestionId: null,
        specialtyIds: [2, 12],
      },
    ],
  },
  {
    id: "q3employment",
    question: "Are you an employer or employee?",
    options: [
      {
        label: "I'm an employer needing compliance help",
        value: "employer",
        nextQuestionId: null,
        specialtyIds: [3],
      },
      {
        label: "I'm an employee with a workplace issue",
        value: "employee",
        nextQuestionId: null,
        specialtyIds: [3, 12],
      },
    ],
  },
  {
    id: "q3contract",
    question: "What's the contract situation?",
    options: [
      {
        label: "I need a contract drafted",
        value: "drafting",
        nextQuestionId: null,
        specialtyIds: [11],
      },
      {
        label: "I need a contract reviewed",
        value: "review",
        nextQuestionId: null,
        specialtyIds: [11],
      },
      {
        label: "Someone breached our contract",
        value: "breach",
        nextQuestionId: null,
        specialtyIds: [11, 12],
      },
      {
        label: "I'm being sued for breach",
        value: "defense",
        nextQuestionId: null,
        specialtyIds: [11, 12],
      },
    ],
  },
  {
    id: "q3immigration",
    question: "What type of immigration matter?",
    options: [
      {
        label: "Work visa (H-1B, L-1, O-1)",
        value: "work",
        nextQuestionId: null,
        specialtyIds: [5],
      },
      {
        label: "Green card / permanent residence",
        value: "greencard",
        nextQuestionId: null,
        specialtyIds: [5],
      },
      {
        label: "Family-based petition",
        value: "family",
        nextQuestionId: null,
        specialtyIds: [5],
      },
      {
        label: "Business immigration (EB-5, E-2)",
        value: "business",
        nextQuestionId: null,
        specialtyIds: [5, 1],
      },
    ],
  },
  {
    id: "q3criminal",
    question: "What kind of criminal matter?",
    options: [
      {
        label: "I've been charged with a crime",
        value: "charged",
        nextQuestionId: null,
        specialtyIds: [7],
      },
      {
        label: "I'm under investigation",
        value: "investigation",
        nextQuestionId: null,
        specialtyIds: [7],
      },
      {
        label: "DUI / traffic offense",
        value: "dui",
        nextQuestionId: null,
        specialtyIds: [7],
      },
      {
        label: "I need advice about my rights",
        value: "rights",
        nextQuestionId: null,
        specialtyIds: [7, 12],
      },
    ],
  },
];

export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return assessmentQuestions.find((q) => q.id === id);
}

export function getRecommendedSpecialtyIds(
  answers: { questionId: string; value: string }[],
): number[] {
  const ids = new Set<number>();
  for (const answer of answers) {
    const question = getQuestionById(answer.questionId);
    if (!question) continue;
    const option = question.options.find((o) => o.value === answer.value);
    if (!option) continue;
    for (const id of option.specialtyIds) {
      ids.add(id);
    }
  }
  return Array.from(ids);
}
