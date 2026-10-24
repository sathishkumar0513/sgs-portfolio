export const content = {
  businessName: 'Sri Gomathi Sanker Lorry Body Labour Works',
  shortName: 'Sri Gomathi Sanker',
  tagline: 'Strength · Quality · Trust',
  description:
    'Dependable lorry body building, fabrication and repair—made with care, built for the long road.',
  owner: {
    name: 'Gomathi Nayagam S',
    title: 'Founder & Owner',
  },
  navigation: [
    ['Home', '#home'],
    ['About', '#about'],
    ['Services', '#services'],
    ['Projects', '#projects'],
    ['Process', '#process'],
    ['Why us', '#why-us'],
    ['Reviews', '#reviews'],
    ['Contact', '#contact'],
  ],
  contact: {
    phone: '9486716176',
    whatsapp: '9087505060',
    email: 'REPLACE_ME',
    address: 'Ettayapuram Road, Thoothukudi - 628002 (Near Mappillaiyoorani Vilaku).',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Ettayapuram%20Road%2C%20Thoothukudi%20-%20628002%20%28Near%20Mappillaiyoorani%20Vilaku%29&output=embed',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Ettayapuram%20Road%2C%20Thoothukudi%20-%20628002%20%28Near%20Mappillaiyoorani%20Vilaku%29',
    socialLinks: {
      instagram: 'REPLACE_ME',
      facebook: 'REPLACE_ME',
      youtube: 'REPLACE_ME',
    },
  },
  stats: [
    { value: 15, suffix: '+', label: 'Years of experience', placeholder: 'REPLACE_ME' },
    { value: 500, suffix: '+', label: 'Bodies built', placeholder: 'REPLACE_ME' },
    { value: 400, suffix: '+', label: 'Happy clients', placeholder: 'REPLACE_ME' },
    { value: 800, suffix: '+', label: 'Repairs completed', placeholder: 'REPLACE_ME' },
  ],
  about: {
    eyebrow: 'Made by hand. Made to last.',
    title: 'A workshop built on a promise.',
    paragraphs: [
      'A good lorry body does more than carry a load. It protects your investment, supports your livelihood and earns your trust every single kilometre.',
      'At Sri Gomathi Sanker Lorry Body Labour Works, every build is shaped around the way you work. From the first measurement to the last coat of paint, we focus on sound materials, careful workmanship and a job done right.',
    ],
    values: ['Built around your work', 'Straightforward communication', 'Workmanship we stand behind'],
  },
  services: [
    {
      title: 'New body building',
      description: 'Custom lorry bodies designed around your truck, load and day-to-day work.',
      icon: 'Truck',
    },
    {
      title: 'Body repair & renovation',
      description: 'Restore working strength with thoughtful repairs and complete body renewals.',
      icon: 'Wrench',
    },
    {
      title: 'Panels, sides & rails',
      description: 'Side panels, rear panels, floor and rail work made to fit and built to endure.',
      icon: 'PanelsTopLeft',
    },
    {
      title: 'Tipper & open body',
      description: 'Practical tipper and open-body fabrication for demanding daily loads.',
      icon: 'Construction',
    },
    {
      title: 'Welding & fabrication',
      description: 'Accurate structural welding, reinforcement and made-to-measure steelwork.',
      icon: 'Flame',
    },
    {
      title: 'Paint & finishing',
      description: 'Careful surface preparation, durable paint and a clean professional finish.',
      icon: 'Paintbrush',
    },
    {
      title: 'Tarpaulin & accessories',
      description: 'Useful finishing touches, tarpaulin fitting and accessories for the road.',
      icon: 'PackageCheck',
    },
  ],
  projects: [
    { title: 'Built for the long haul', category: 'New Body', image: '/assets/projects/cargo-body.svg', label: '01' },
    { title: 'Ready for heavy loads', category: 'Tipper', image: '/assets/projects/tipper.svg', label: '02' },
    { title: 'A working body restored', category: 'Repair', image: '/assets/projects/repair.svg', label: '03' },
    { title: 'Open body, made to measure', category: 'Open Body', image: '/assets/projects/open-body.svg', label: '04' },
    { title: 'Strong sides. Clean finish.', category: 'New Body', image: '/assets/projects/side-work.svg', label: '05' },
  ],
  process: [
    { title: 'Inquiry', description: 'Tell us about your vehicle, your load and the work you need done.' },
    { title: 'Measurement & design', description: 'We measure carefully and agree on a practical body design together.' },
    { title: 'Material selection', description: 'Choose suitable steel, timber and fittings for the job ahead.' },
    { title: 'Fabrication & welding', description: 'Our team shapes, fits and joins each part with care.' },
    { title: 'Painting & finishing', description: 'Surfaces are prepared, painted and finished for a clean result.' },
    { title: 'Quality check', description: 'We inspect fit, finish and details before the handover.' },
    { title: 'Delivery', description: 'Your lorry is ready to get back to work.' },
  ],
  benefits: [
    'Skilled welders and experienced hands',
    'Quality steel, timber and fittings',
    'Clear timelines and on-time delivery',
    'Fair, straightforward pricing',
    'After-work support when you need it',
  ],
  testimonials: [
    { name: 'REPLACE_ME — customer name', role: 'Lorry owner', quote: 'The team understood exactly what we needed. The body feels solid, the finishing is neat, and the work was completed with care.' },
    { name: 'REPLACE_ME — customer name', role: 'Transport operator', quote: 'Good communication from the first visit to delivery. A practical build and a workshop we would gladly return to.' },
    { name: 'REPLACE_ME — customer name', role: 'Fleet manager', quote: 'Reliable workmanship and a clean repair. Our lorry was back on the road ready for work.' },
  ],
  copyright: 'Sri Gomathi Sanker Lorry Body Labour Works',
} as const

export type ServiceIconName = (typeof content.services)[number]['icon']
