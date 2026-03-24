import { Stat, Department, BoardMember, Event, OpenRole } from './types';

export const STATS: Stat[] = [
  { label: 'Members', value: '50+' },
  { label: 'Departments', value: '4' },
  { label: 'Workshops Run', value: '15+' },
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
];

export const BOARD: { category: string; members: BoardMember[] }[] = [
  {
    category: 'Faculty Advisor',
    members: [{ name: 'Dr. S. Ramesh', role: 'Faculty Advisor' }],
  },
  {
    category: 'Executive Board',
    members: [
      { name: 'Tharun Krishna', role: 'President' },
      { name: 'Ananya Sharma', role: 'VP Technical' },
      { name: 'Rahul Verma', role: 'VP Operations' },
      { name: 'Sneha Reddy', role: 'VP Outreach' },
    ],
  },
  {
    category: 'Department Leads',
    members: [
      { name: 'Aditya Raj', role: 'Lead', department: 'RTL Design' },
      { name: 'Ishita Gupta', role: 'Lead', department: 'Design Verification' },
      { name: 'Karthik S', role: 'Lead', department: 'Physical Design' },
      { name: 'Megha Nair', role: 'Lead', department: 'System Management' },
    ],
  },
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Verilog Mastery Workshop',
    year: '2026',
    description: 'A deep dive into advanced Verilog coding styles and synthesis optimization.',
    icon: 'Cpu',
    longDescription: 'This workshop covers advanced RTL design techniques, including state machine optimization, clock domain crossing, and synthesis-friendly coding styles. Participants will get hands-on experience with industry-standard tools.',
  },
  {
    id: '2',
    title: 'VLSI Industry Talk',
    year: '2026',
    description: 'Guest lecture by industry experts from Intel on the future of FinFET technology.',
    icon: 'Mic',
    longDescription: 'Join us for an insightful session with senior engineers from Intel. We will discuss the evolution of transistor technology, from planar FETs to FinFETs and the upcoming Gate-All-Around (GAA) architectures.',
  },
  {
    id: '3',
    title: 'Design-a-Thon 2026',
    year: '2026',
    description: 'Our flagship 24-hour hardware design competition.',
    icon: 'Zap',
    longDescription: 'The CDG Design-a-Thon is a high-intensity 24-hour challenge where teams compete to design, verify, and implement complex digital systems. This year\'s theme is "Edge AI Accelerators".',
  },
  {
    id: '4',
    title: 'FPGA Bootcamp',
    year: '2025',
    description: 'Intensive 3-day training on Xilinx Vivado and FPGA prototyping.',
    icon: 'Layers',
    longDescription: 'A comprehensive bootcamp covering the entire FPGA design flow, from RTL entry to bitstream generation and hardware debugging using ILA. Perfect for beginners and intermediate designers.',
  },
  {
    id: '5',
    title: 'ASIC Flow Seminar',
    year: '2025',
    description: 'Understanding the complete RTL-to-GDSII flow.',
    icon: 'Settings',
    longDescription: 'This seminar breaks down the complex ASIC design cycle, including synthesis, floorplanning, placement, routing, and physical verification (DRC/LVS).',
  },
];

export const OPEN_ROLES: OpenRole[] = [
  {
    title: 'RTL Design Intern',
    description: 'Passionate about digital logic and Verilog? Join us to build next-gen cores.',
  },
  {
    title: 'Content Writer',
    description: 'Help us document our projects and write technical blogs for the community.',
  },
  {
    title: 'Event Coordinator',
    description: 'Manage our workshops and ensure smooth execution of club events.',
  },
];

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
