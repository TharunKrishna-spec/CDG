import { Stat, Department, BoardMember, Project, Event, OpenRole } from './types';

export const STATS: Stat[] = [
  { label: 'Members', value: '50+' },
  { label: 'Departments', value: '4' },
  { label: 'Active Projects', value: '10+' },
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
      { name: 'Jagadhish', role: 'President' },
      { name: 'JP Anirudh', role: 'Vice President' },
      { name: 'Rahul Verma', role: 'VP Operations' },
      { name: 'Sneha Reddy', role: 'VP Outreach' },
    ],
  },
  {
    category: 'Department Leads',
    members: [
      { name: 'Aditya Raj', role: 'Lead', department: 'RTL Design' },
      { name: 'Eashwar', role: 'Lead', department: 'Design Verification' },
      { name: 'Karthik S', role: 'Lead', department: 'Physical Design' },
      { name: 'Megha Nair', role: 'Lead', department: 'System Management' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'RISC-V Core Implementation',
    department: 'RTL Design',
    status: 'Ongoing',
    date: 'Mar 2026',
    description: 'A 5-stage pipelined RISC-V processor supporting the RV32I base integer instruction set.',
    longDescription: 'This project focuses on designing a high-performance, 5-stage pipelined RISC-V processor from scratch. It supports the RV32I base integer instruction set and is optimized for low power consumption. The implementation includes a comprehensive ALU, register file, and control unit, all written in SystemVerilog. We are currently working on adding support for the M-extension (integer multiplication and division).',
    image: 'https://picsum.photos/seed/riscv/800/600',
    githubUrl: 'https://github.com/cdg-vitc/riscv-core',
    demoUrl: '#',
    techSpecs: {
      architecture: 'RISC-V (RV32I)',
      tools: ['SystemVerilog', 'Vivado', 'Verilator'],
      performance: '5-stage Pipeline, 100MHz target'
    }
  },
  {
    name: 'UVM Testbench for SPI',
    department: 'Design Verification',
    status: 'Completed',
    date: 'Jan 2026',
    description: 'Comprehensive verification environment for an SPI controller using Universal Verification Methodology.',
    longDescription: 'A robust verification environment built using the Universal Verification Methodology (UVM) to verify a complex SPI controller. The testbench includes a complete set of UVM components: agents, drivers, monitors, scoreboards, and sequences. We achieved 100% functional and code coverage, ensuring the reliability of the SPI controller under various edge cases and stress conditions.',
    image: 'https://picsum.photos/seed/uvm/800/600',
    githubUrl: 'https://github.com/cdg-vitc/uvm-spi-testbench',
    demoUrl: '#',
    techSpecs: {
      architecture: 'UVM 1.2',
      tools: ['Questasim', 'SystemVerilog', 'Python'],
      performance: '100% Functional Coverage'
    }
  },
  {
    name: '7nm Standard Cell Layout',
    department: 'Physical Design',
    status: 'Upcoming',
    date: 'May 2026',
    description: 'Custom layout design of basic logic gates using advanced 7nm FinFET technology nodes.',
    longDescription: 'This project involves the manual layout design of a standard cell library using advanced 7nm FinFET technology nodes. We focus on optimizing cell area, power, and performance (PPA). The library includes basic gates like AND, OR, NOT, and more complex cells like flip-flops and multiplexers. We use industry-standard EDA tools for DRC (Design Rule Check) and LVS (Layout vs. Schematic) verification.',
    image: 'https://picsum.photos/seed/layout/800/600',
    githubUrl: '#',
    demoUrl: '#',
    techSpecs: {
      architecture: '7nm FinFET',
      tools: ['Cadence Virtuoso', 'Calibre'],
      performance: 'Optimized PPA'
    }
  },
  {
    name: 'Club Resource Portal',
    department: 'System Management',
    status: 'Ongoing',
    date: 'Feb 2026',
    description: 'Centralized platform for CDG members to access learning resources, tools, and project documentation.',
    longDescription: 'The CDG Resource Portal is a custom-built web application designed to streamline club operations and resource sharing. It features a curated library of VLSI tutorials, a project management dashboard, and a secure tool repository. Built with React and Firebase, the portal ensures that all members have easy access to the knowledge and tools they need to excel in their hardware design journey.',
    image: 'https://picsum.photos/seed/portal/800/600',
    githubUrl: 'https://github.com/cdg-vitc/resource-portal',
    demoUrl: 'https://cdg-portal.example.com',
    techSpecs: {
      architecture: 'React + Firebase',
      tools: ['Tailwind CSS', 'Framer Motion'],
      performance: 'Real-time Sync'
    }
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
