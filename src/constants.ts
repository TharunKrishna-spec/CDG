import { Stat, Department, BoardMember, Project, Event, OpenRole } from './types';

export const STATS: Stat[] = [
  { label: 'Members', value: '15' },
  { label: 'Departments', value: '5' },
  { label: 'Active Projects', value: '2' },
  { label: 'Workshops Run', value: '1' },
];

export const DEPARTMENTS: Department[] = [
  {
    name: 'RTL Design',
    description: 'Focuses on Register Transfer Level design using Verilog/VHDL to define the logical behavior of integrated circuits.',
    icon: 'Cpu',
  },
  {
    name: 'Design Verification',
    description: 'Ensures the design meets specifications using simulation, formal verification, and UVM methodologies.',
    icon: 'ShieldCheck',
  },
  {
    name: 'Physical Design',
    description: 'Translates logical designs into physical layouts, handling floorplanning, placement, and routing.',
    icon: 'Layers',
  },
  {
    name: 'System Management',
    description: 'Oversees the integration of various components and manages the club operations and infrastructure.',
    icon: 'Settings',
  },
  {
    name: 'Social Media',
    description: 'Handles outreach, content, design communication, and the public voice of the club across digital platforms.',
    icon: 'ImageIcon',
  },
  {
    name: 'Software',
    description: 'Handles firmware development, tooling, and software support for hardware and system bring-up.',
    icon: 'Code2',
  },
];

export const BOARD: { category: string; members: BoardMember[] }[] = [
  {
    category: 'Executive Board',
    members: [
      { name: 'Jegadiswar', role: 'Captain' },
      { name: 'Anirudh Purushothaman', role: 'Vice Captain' },
    ],
  },
  {
    category: 'Department Leads',
    members: [
      { name: 'Joshittha', role: 'Lead', department: 'RTL Design' },
      { name: 'Magesh', role: 'Co-Lead', department: 'RTL Design' },
      { name: 'Arvindh Arjun', role: 'Co-Lead', department: 'Design Verification' },
      { name: 'Mithreya', role: 'Lead', department: 'Social Media' },
      { name: 'Tharun Krishna', role: 'Software Lead' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Low Power NPU with SNN Accelerator in IBEX RISC-V',
    department: 'RTL Design',
    status: 'Ongoing',
    date: '14 Feb 2026',
    description: 'Designing a low-power neural processing unit with an SNN accelerator integrated into the Ibex RISC-V core.',
    longDescription: 'This project targets an energy-efficient NPU pipeline paired with a spiking neural network (SNN) accelerator, integrated into the Ibex RISC-V core. The focus is on optimized dataflow, reduced memory movement, and power-aware control logic to support edge inference workloads.',
    image: 'https://picsum.photos/seed/npu/800/600',
    githubUrl: '#',
    demoUrl: '#',
    techSpecs: {
      architecture: 'Ibex RISC-V + SNN Accelerator',
      tools: ['SystemVerilog', 'Verilator', 'Yosys', 'Python'],
      performance: 'Low-power edge inference focus'
    }
  },
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Inaugration of CDG',
    year: '2026',
    description: 'Venue: VOC Auditorium.',
    icon: 'Zap',
    longDescription: 'Our official CDG inauguration ceremony, bringing together members, faculty, and industry guests at the VOC Auditorium.',
  },
  {
    id: '2',
    title: 'RISCV RoadShow',
    year: '2026',
    description: 'Venue: VOC Auditorium.',
    icon: 'Cpu',
    longDescription: 'A showcase event focused on RISC-V trends, demos, and community engagement at the VOC Auditorium.',
  },
];

export const OPEN_ROLES: OpenRole[] = [
  {
    title: 'RTL Design Member',
    description: 'Passionate about digital logic and Verilog? Join us to build next-gen cores.',
  },
  {
    title: 'Design Verification Member',
    description: 'Work on testbenches, assertions, and coverage-driven validation for digital designs.',
  },
  {
    title: 'Physical Design Member',
    description: 'Explore floorplanning, routing, and layout optimization across advanced technology nodes.',
  },
  {
    title: 'System Management Member',
    description: 'Support club infrastructure, tooling, and coordination across projects and operations.',
  },
  {
    title: 'Social Media Member',
    description: 'Work on outreach, branding, content creation, and public engagement for the club.',
  },
];

export const RECRUITMENT_CONFIG = {
  isOpen: false,
  formUrl: 'https://forms.gle/placeholder',
  closedLabel: 'Recruitment Currently Closed',
  closedNote: 'Applications will be announced soon',
};

export const TECH_STACK = [
  'Verilog',
  'VHDL',
  'SystemVerilog',
  'UVM',
  'Cadence Virtuoso',
  'Synopsys Design Compiler',
  'Python',
  'C++',
  'FPGA',
];
