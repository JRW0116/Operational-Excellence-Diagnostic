window.diagnosticConfig = {
  title: "Operational Excellence Diagnostic",
  brand: "Quality In Practice",
  intro:
    "A practical self-assessment for small manufacturers that want to understand where their operating system is strong, where it is informal, and which capabilities to build next.",
  scale: [
    { value: 1, label: "Not in place" },
    { value: 2, label: "Informal" },
    { value: 3, label: "Developing" },
    { value: 4, label: "Consistent" },
    { value: 5, label: "Sustained" }
  ],
  levels: [
    {
      min: 0,
      max: 1.9,
      name: "Reactive",
      summary:
        "The operation depends heavily on individual effort and firefighting. Start with basic visibility, problem definition, and leader routines."
    },
    {
      min: 2,
      max: 2.9,
      name: "Informal",
      summary:
        "Some good practices exist, but they are inconsistent. Focus on standard routines, shared methods, and practical supervisor capability."
    },
    {
      min: 3,
      max: 3.7,
      name: "Developing",
      summary:
        "The foundation is forming. Strengthen follow-through, cross-functional problem solving, and daily management discipline."
    },
    {
      min: 3.8,
      max: 4.4,
      name: "Capable",
      summary:
        "Core practices are reliable. The next opportunity is to deepen capability, connect systems, and reduce dependence on a few experts."
    },
    {
      min: 4.5,
      max: 5,
      name: "Sustained",
      summary:
        "Operational Excellence is embedded in the way the business runs. Continue developing internal leaders and sharing capability broadly."
    }
  ],
  dimensions: [
    {
      id: "daily-management",
      name: "Daily Management",
      shortName: "Daily Mgmt",
      description:
        "How effectively the organization sees performance, escalates issues, and follows a consistent management cadence.",
      recommendation:
        "Build a practical daily management system: visual performance boards, tiered huddles, escalation rules, and leader standard work.",
      academyPath:
        "Operational Excellence Academy: Daily Management Systems, Visual Management, Operational Decision Making",
      questions: [
        "Teams can see daily performance against a small set of meaningful metrics.",
        "Supervisors use a regular cadence to review performance, constraints, and actions.",
        "Problems are escalated quickly with clear ownership and follow-up.",
        "Leaders routinely verify whether actions were completed and whether they worked."
      ]
    },
    {
      id: "problem-solving",
      name: "Structured Problem Solving",
      shortName: "Problem Solving",
      description:
        "How consistently people define problems, find causes, select countermeasures, and prevent recurrence.",
      recommendation:
        "Standardize problem solving around a simple method that fits the business, then coach supervisors and engineers through real problems.",
      academyPath:
        "Operational Excellence Academy: Structured Problem Solving, Supervisor Problem-Solving Skills, Basic Data Analysis",
      questions: [
        "Teams clearly define problems before jumping to solutions.",
        "Root causes are supported by evidence rather than opinion or habit.",
        "Corrective actions address causes and include verification of effectiveness.",
        "Lessons learned are shared so similar problems do not recur elsewhere."
      ]
    },
    {
      id: "standard-work",
      name: "Standard Work and Process Control",
      shortName: "Standard Work",
      description:
        "How well important work is defined, taught, followed, and improved.",
      recommendation:
        "Prioritize standard work for critical processes, then create routines for training, auditing, and improvement.",
      academyPath:
        "Operational Excellence Academy: Standard Work, Lean Fundamentals, Kaizen Facilitation",
      questions: [
        "Critical processes have current, usable standards that reflect the best known method.",
        "Employees are trained and qualified against the standard method.",
        "Supervisors can tell whether work is being performed to standard.",
        "Standards are updated when better methods are proven."
      ]
    },
    {
      id: "continuous-improvement",
      name: "Continuous Improvement System",
      shortName: "CI System",
      description:
        "How improvement work is selected, supported, completed, and sustained.",
      recommendation:
        "Create a focused improvement system with clear priorities, project selection, review cadence, and coaching support.",
      academyPath:
        "Operational Excellence Academy: Value Stream Management, Kaizen Facilitation, Practical Lean Six Sigma",
      questions: [
        "Improvement work is linked to business priorities rather than isolated ideas.",
        "Projects have clear charters, owners, timelines, and expected outcomes.",
        "Teams receive enough coaching to use improvement methods correctly.",
        "Completed improvements are sustained through standards, metrics, and leader follow-up."
      ]
    },
    {
      id: "quality-integration",
      name: "Quality Integration",
      shortName: "Quality",
      description:
        "How well quality decisions are distributed across functions instead of concentrated in the quality department.",
      recommendation:
        "Broaden quality capability across supervisors, engineering, purchasing, and leadership so quality is managed where decisions are made.",
      academyPath:
        "Quality Academy: Cost of Quality, Root Cause Analysis, CAPA, Risk-Based Thinking, Supplier Quality",
      questions: [
        "Production supervisors understand the quality risks in their processes.",
        "Engineering and operations use data to prevent quality issues before release or change.",
        "Supplier quality risks are understood before they become production or customer problems.",
        "Leaders understand the customer and financial impact of quality decisions."
      ]
    },
    {
      id: "leadership-capability",
      name: "Leadership and Capability Building",
      shortName: "Leadership",
      description:
        "How deliberately the organization develops the people and routines needed to sustain Operational Excellence.",
      recommendation:
        "Define the leadership behaviors and capabilities required, then build a development path for supervisors, engineers, and emerging OpEx leaders.",
      academyPath:
        "Fractional OpEx Leadership plus academy pathways for supervisors, engineers, and quality leaders",
      questions: [
        "Leaders coach teams through problems instead of only assigning fixes.",
        "Supervisors are developed in operational routines, problem solving, and performance management.",
        "The company has internal owners who can sustain improvement work.",
        "New practices are reinforced until they become part of how the business runs."
      ]
    }
  ]
};
