'use client';

import React, { useState } from 'react';
import projectLogos from './projectLogos.json';
import AskBot from './AskBot';

/* ─── DATA ─── */
const logoRows = [
  projectLogos.slice(0, 9),
  projectLogos.slice(9, 18),
  [...projectLogos.slice(18, 27), projectLogos[33]],
  [...projectLogos.slice(27, 33), ...projectLogos.slice(34)],
];

const deals = [
  {
    title: 'SciSports',
    tagline: 'Strategic Acquisition',
    sector: 'AI & Sports Analytics',
    type: 'M&A Advisory',
    website: 'https://scisports.com',
    description: 'SciSports is a global leader in AI-driven football analytics, delivering real-time, actionable insights into player and team performance. Their solution empowers clubs, federations, agents, and analysts to make data-driven decisions. With a database of over 275,000 players and 180+ teams globally.',
    challenge: 'SciSports had built an impressive product and client base in Europe, but needed to refine its corporate strategy and company narrative to attract strategic buyers and maximize valuation.',
    outcome: 'Facilitated their successful acquisition by VANAD Group, positioning SciSports for accelerated international growth.',
    announcement: { label: 'VANAD Group acquires SciSports', url: 'https://www.scisports.com/vanad-group-acquires-scisports/' },
  },
  {
    title: 'Horus',
    tagline: 'Strategic Acquisition',
    sector: 'Mobility & Mapping',
    type: 'M&A Advisory',
    website: 'https://horus.nu',
    description: 'Horus bridges worlds with adaptive mapping solutions, transforming vehicles into powerful computing hubs that process complex sensor data on-edge. Their modular technology enables seamless integration into existing operations for precision mapping and reality capture.',
    challenge: 'Horus had built industry-leading mapping technology and needed strategic advisory to navigate the acquisition process and find the right buyer to accelerate their growth.',
    outcome: 'Ran the acquisition process from end to end, culminating in Horus being acquired by Systematic Growth, a private equity firm positioned to scale their mapping technology internationally.',
    announcement: { label: 'Horus joins Nilario', url: 'https://nilario.com/news/horus-joins-nilario' },
  },
  {
    title: 'VIM',
    tagline: 'Interim Managing Director',
    sector: 'Aviation Software',
    type: 'Fractional',
    website: '',
    description: 'VIM is a Chinese multinational that builds software for the aviation MRO industry, the maintenance, repair, and overhaul work that happens once an aircraft lands and enters the hangar before it can fly again. Its platform digitises engineering, maintenance planning, work orders, parts inventory, and regulatory compliance, helping airlines and MRO providers cut aircraft downtime and turn planes around faster and safer.',
    challenge: 'VIM wanted a foothold in the Middle East but had no operation on the ground. The mandate was to stand up an entire branch in Dubai from scratch: legal and entity setup, hiring across commercial and technical functions, building the delivery and commercial processes, and the systems to execute and track it all.',
    outcome: 'Served as interim Managing Director for two years, building the Dubai team from the ground up, hiring across functions, and putting the processes, execution rhythm, and performance tracking in place. The branch became fully operational and self-sustaining.',
  },
  {
    title: 'Purple Ruler',
    tagline: 'Fractional CFO & Ops',
    sector: 'Education Technology',
    type: 'Fractional',
    website: 'https://www.purpleruler.com/',
    description: 'Purple Ruler is a UK online education provider delivering live tutoring and alternative provision for learners with special educational needs and mental health challenges. Pupils join small national classrooms of up to six, taught live by specialist teachers, blending the English National Curriculum with inquiry-based, IB-inspired methods. Every lesson is live instruction, with no AI or recordings.',
    challenge: 'Purple Ruler had strong demand and a mission-driven product, but was scaling faster than its commercial strategy and internal systems could support. They needed a clear commercial model, defined KPIs, and the operational infrastructure to grow without breaking.',
    outcome: 'Stepped in as fractional CFO and operations lead to define the commercial strategy, build the financial and operational backbone, and put reporting and performance tracking in place. The company has since scaled to >1M MRR, expanded its commercial footprint into the United States, and expanded its team internationally.',
  },
  {
    title: 'OneApply',
    tagline: 'Interim Fundraising & Strategy',
    sector: 'HR Tech',
    type: 'Fractional',
    website: '',
    description: 'OneApply builds AI-powered candidate screening. Its platform lets companies use their own employee and hiring data to improve the quality and speed of recruitment, surfacing stronger candidates and sharpening hiring decisions. Backed by LinkedIn, it is used by thousands of companies.',
    challenge: 'OneApply needed to raise capital to scale the platform, and to sharpen its strategy and investor narrative before going to market.',
    outcome: 'Came in on an interim basis to run the fundraising process and shape the company strategy, building the financial model, investor materials, and positioning to take the platform to growth-stage investors.',
  },
  {
    title: 'MOOS',
    tagline: 'Seed / Acquisition',
    sector: 'AI & Sensor Tech',
    type: 'Fundraising',
    website: 'https://moos.nu',
    description: 'MOOS provides AI-powered shelf sensors that deliver real-time visibility on inventory levels across retail and healthcare. Their technology uses shelf triggers to optimize availability, reduce out-of-stocks, and prevent shrinkage, replacing scheduled checks with intelligent, event-driven operations.',
    challenge: 'MOOS needed growth capital to scale their smart sensor platform and expand across retail and healthcare markets.',
    outcome: 'Supported MOOS through their fundraising round, positioning their IoT inventory intelligence for retail-tech and healthcare investors.',
  },
  {
    title: 'Incus 3D',
    tagline: 'Series B',
    sector: 'Additive Manufacturing',
    type: 'Fundraising',
    website: 'https://incus3d.com',
    description: 'Incus develops industrial metal additive manufacturing systems based on Lithography-based Metal Manufacturing (LMM). Their process uses photopolymerization to shape metal powder-filled resins into complex near-net-shape parts, sintered to full density. The technology produces intricate metal components with quality unachievable by traditional MIM or CNC, serving medical devices, aerospace, and precision engineering.',
    challenge: 'Incus needed to secure growth capital to scale production and expand into the US and India.',
    outcome: 'Built their financial model, investor materials, and managed the fundraising process to position them for their next growth phase.',
  },
  {
    title: 'SPARK',
    tagline: 'Series B',
    sector: 'Battery Technology',
    type: 'Fundraising',
    website: 'https://sparksolar.io',
    description: 'SPARK builds solar-powered battery systems that store energy during the day for use at night. Their smart batteries automatically manage charging and power supply, with multiple units connecting to create larger solar systems capable of powering appliances like refrigerators and small crop mills in off-grid communities.',
    challenge: 'SPARK needed growth capital to scale their off-grid solar battery technology and expand distribution across emerging markets.',
    outcome: 'Supported SPARK through their fundraising process, connecting their energy access solution with impact and sustainability investors.',
  },
  {
    title: 'Infraspeak',
    tagline: 'Series B',
    sector: 'Digital Technology',
    type: 'Commercial Due Diligence',
    website: 'https://infraspeak.com/en',
    description: 'Infraspeak is an intelligent maintenance management platform that helps facility and maintenance teams work smarter. Their platform combines IoT, AI, and automation to streamline maintenance operations across buildings, facilities, and infrastructure.',
    challenge: 'Infraspeak was preparing for a Series B round and potential investors requested commercial due diligence to validate their market position, growth potential, and commercial strategy.',
    outcome: 'Delivered comprehensive commercial due diligence, providing investors with clarity on market dynamics, competitive positioning, commercial strategy and execution risks, financial health, and growth potential.',
  },
  {
    title: 'Fairly Made',
    tagline: 'Series B',
    sector: 'Digital Technology',
    type: 'Commercial Due Diligence',
    website: 'https://www.fairlymade.com/',
    description: 'Fairly Made is a sustainability platform that helps fashion and textile brands measure, manage, and improve the environmental and social impact of their supply chains. Their technology provides full traceability and lifecycle assessment across the value chain.',
    challenge: 'Fairly Made was raising a Series B and required commercial due diligence to assess market opportunity, competitive landscape, and scalability of their sustainability platform.',
    outcome: 'Provided in-depth commercial due diligence, helping investors evaluate the company\'s positioning in the growing sustainable fashion technology space.',
  },
  {
    title: 'Barion',
    tagline: 'Series B',
    sector: 'FinTech',
    type: 'Fundraising',
    website: 'https://www.barion.com/en/',
    description: 'Barion is a Hungarian fintech company providing smart payment solutions for online and in-store commerce. Their platform offers seamless checkout, payment gateway services, and a digital wallet, serving thousands of merchants across Europe.',
    challenge: 'Barion needed growth capital to scale their payment platform across European markets and expand their product offering.',
    outcome: 'Supported Barion with preperation for their Series B, positioning their fintech platform for international growth-stage investors.',
  },
  {
    title: 'Owlin',
    tagline: 'Series B',
    sector: 'Digital Technology',
    type: 'Fundraising',
    website: 'https://owlin.com/',
    description: 'Owlin is an AI-powered risk intelligence platform that monitors global news and data sources in real-time to help financial institutions, corporates, and governments identify emerging risks and opportunities.',
    challenge: 'Owlin needed growth capital to scale their AI risk intelligence platform and expand their enterprise client base internationally.',
    outcome: 'Supported Owlin with preparation of their Series B, positioning their risk-tech platform for growth-stage investors.',
  },
  {
    title: 'MoreApp',
    tagline: 'Series B',
    sector: 'Digital Technology',
    type: 'Fundraising',
    website: 'https://moreapp.com/',
    description: 'MoreApp digitizes paperwork with smart digital forms, helping field teams and organizations replace paper processes with efficient mobile workflows. Their platform serves thousands of companies across industries.',
    challenge: 'MoreApp needed growth capital to scale their digital forms platform and accelerate international expansion.',
    outcome: 'Supported MoreApp through their Series B fundraising process, positioning their workflow automation platform for growth-stage investors.',
  },
  {
    title: 'Maqqie',
    tagline: 'Series B',
    sector: 'HRTech',
    type: 'Fundraising',
    website: 'https://maqqie.nl/',
    description: 'Maqqie is a platform that simplifies flexible workforce management, helping companies manage freelancers and contractors with compliant payments, contracts, and administration.',
    challenge: 'Maqqie needed growth capital to scale their workforce platform and expand across the flexible labor market.',
    outcome: 'Supported Maqqie through their Series B fundraising process, connecting their HR-tech platform with growth-stage investors.',
  },
  {
    title: 'Blue Heart Energy',
    tagline: 'Series A',
    sector: 'HVAC Technology',
    type: 'Fundraising',
    website: 'https://blueheartenergy.com',
    description: 'BlueHeart Energy uses powerful sound waves in a pressurized helium environment to create heating and cooling. Their heat pump engine is the first to operate without HFC or flammable refrigerants, with zero direct CO2 emissions, delivering silent operation under 40dB.',
    challenge: 'BlueHeart needed capital for product improvements, cost reduction, and building a clear path to industrialization of their thermoacoustic heat pump technology.',
    outcome: 'Supported Blue Heart end to end through their €15M Series A, positioning their clean HVAC breakthrough for strategic and financial investors.',
  },
  {
    title: 'inPhocal',
    tagline: 'Series A',
    sector: 'Photonics',
    type: 'Fundraising',
    website: 'https://inphocal.com',
    description: 'inPhocal, founded in 2019 at High Tech Campus Eindhoven, has developed transformative laser technology based on CERN research. Winners of the CES Innovation Award, Gerard & Anton Award, and Deloitte Fast 50 finalist, they have deployed production line systems marking up to 3,000 unique QR codes per minute.',
    challenge: 'inPhocal needed capital to scale their laser marking technology from early deployment into full commercial production across multiple industries.',
    outcome: 'Supported inPhocal through their fundraising round, translating their deep-tech CERN-origin story into a compelling investment case.',
  },
  {
    title: 'Alfarim',
    tagline: 'Series A',
    sector: 'Health & Life Sciences',
    type: 'Fundraising',
    website: 'https://alfarim.com',
    description: 'Alfarim produces actinium-225, the world\'s most sought-after medical isotope, on an industrial scale. Their innovative technology enables controlled large-scale production to meet growing global demand, accelerating targeted alpha therapies as a groundbreaking cure for cancers including prostate cancer, leukaemia, and breast cancer.',
    challenge: 'Alfarim needed growth capital to scale their isotope production technology and meet the surging demand from the radiopharmaceutical industry for actinium-225.',
    outcome: 'Supported Alfarim through their fundraising process, positioning their life sciences breakthrough for deep-tech and healthcare investors.',
  },
  {
    title: 'PreciTaste',
    tagline: 'Series A',
    sector: 'FoodTech & AI',
    type: 'Fundraising',
    website: 'https://precitaste.com',
    description: 'PreciTaste builds AI-powered restaurant software that optimizes kitchen operations. Their platform includes demand forecasting, daily prep management, hourly production planning, predictive ordering, and real-time food tracking, helping restaurant chains reduce waste and improve efficiency at scale.',
    challenge: 'PreciTaste needed capital to scale their AI kitchen platform across major restaurant chains and expand their product suite.',
    outcome: 'Supported PreciTaste through their fundraising round, connecting their food-tech AI solution with growth-stage investors.',
  },
  {
    title: 'Recell',
    tagline: 'Series A',
    sector: 'Biotech',
    type: 'Fundraising',
    website: 'https://recell.eu',
    description: 'Recell elevates discarded cellulosic waste into next-generation advanced resources, creating sustainable value for building materials, green chemicals, and advanced biofuels. Their technology delivers measurable impact while accelerating defossilization with the smallest possible CO₂ footprint.',
    challenge: 'Recell needed growth capital to scale their waste-to-resource technology and serve growing demand for sustainable building materials and green chemicals.',
    outcome: 'Supported Recell through their €20M Series A, positioning their circular economy technology for impact-focused investors.',
  },
  {
    title: '{Solid}3D',
    tagline: 'Series A',
    sector: 'Robotics',
    type: 'Fundraising',
    website: 'https://solid-3d.com',
    description: 'Solid-3D is a robotics company accelerating the transition to automated warehouses, manufacturing facilities, and construction sites. Their flagship Mark.One Robotic platform combines advanced AI with cloud connectivity for high-precision operations including DM code pasting, stake out operations, floor printing, and floor drilling.',
    challenge: 'Solid-3D needed capital to scale their fleet of high-precision positioning robots and expand across warehouse automation and construction markets.',
    outcome: 'Supported Solid-3D through their fundraising round, positioning their industrial robotics platform for logistics and automation investors.',
  },
  {
    title: 'Telkey',
    tagline: 'Series A',
    sector: 'Digital Technology',
    type: 'Fundraising',
    website: 'https://telkey.com/en/',
    description: 'Telkey provides smart access solutions for property management, enabling digital key distribution, remote access control, and seamless entry management for residential and commercial properties across Scandinavia.',
    challenge: 'Telkey needed capital to scale their smart access platform and expand beyond the Scandinavian market.',
    outcome: 'Supported Telkey through their Series A fundraising process, positioning their proptech solution for growth-stage investors.',
  },
  {
    title: 'Easy2Audit',
    tagline: 'Series A',
    sector: 'Digital Technology',
    type: 'Fundraising',
    website: 'https://easy2audit.com/',
    description: 'Easy2Audit streamlines the audit process with intelligent automation, helping accounting firms and auditors work more efficiently. Their platform reduces manual work and improves audit quality through smart workflows and data analysis.',
    challenge: 'Easy2Audit needed capital to scale their audit automation platform and expand their client base across the accounting industry.',
    outcome: 'Supported Easy2Audit through their Series A fundraising process, connecting their audit-tech solution with growth-stage investors.',
  },
  {
    title: 'ViaLuxury',
    tagline: 'Series A',
    sector: 'Travel Tech',
    type: 'Fundraising',
    website: 'https://vialuxury.com/nl-NL',
    description: 'ViaLuxury is a digital platform connecting luxury brands with consumers, offering curated access to premium products and experiences. Their marketplace combines technology with curation to deliver an elevated shopping experience.',
    challenge: 'ViaLuxury needed capital to scale their luxury marketplace platform and expand their brand partnerships.',
    outcome: 'Supported ViaLuxury through their Series A fundraising process, positioning their luxury-tech platform for growth-stage investors.',
  },
  {
    title: 'DOCKR',
    tagline: 'Series A',
    sector: 'Mobility & Sustainability',
    type: 'Fundraising',
    website: 'https://www.dockrmobility.com/en/',
    description: 'DOCKR provides electric last-mile delivery vehicles for urban logistics, offering flexible leasing solutions for businesses transitioning to zero-emission fleets. Their platform combines electric cargo bikes and vans with smart fleet management.',
    challenge: 'DOCKR needed capital to scale their electric fleet and expand their sustainable urban logistics platform across European cities.',
    outcome: 'Supported DOCKR through their Series A fundraising process, positioning their green mobility solution for impact and logistics investors.',
  },
  {
    title: 'Vitadio',
    tagline: 'Series A',
    sector: 'Digital Therapeutics',
    type: 'Fundraising',
    website: 'https://vitad.io/',
    description: 'Vitadio is a digital therapeutics company offering an AI-powered app for diabetes management. Their clinically validated platform helps patients manage Type 2 diabetes through personalized coaching, nutrition guidance, and behavioral interventions.',
    challenge: 'Vitadio needed capital to scale their digital therapeutics platform and expand clinical validation across European markets.',
    outcome: 'Supported Vitadio through their Series A fundraising process, positioning their health-tech solution for digital health investors.',
  },
  {
    title: 'Viride',
    tagline: 'Series A',
    sector: 'FoodTech',
    type: 'Fundraising',
    website: 'https://viride.net/en/',
    description: 'Viride develops sustainable energy solutions, working at the intersection of clean technology and industrial decarbonization to help companies reduce their environmental footprint.',
    challenge: 'Viride needed capital to scale their clean energy technology and expand across industrial markets.',
    outcome: 'Supported Viride through their Series A fundraising process, connecting their sustainability solution with climate-tech investors.',
  },
  {
    title: 'Prosoma',
    tagline: 'Series A',
    sector: 'HealthTech',
    type: 'Fundraising',
    website: 'https://www.prosoma.com/en',
    description: 'Prosoma develops digital health solutions focused on chronic pain management, combining clinical expertise with technology to deliver evidence-based therapeutic programs for patients.',
    challenge: 'Prosoma needed capital to scale their digital pain management platform and expand their clinical programs.',
    outcome: 'Supported Prosoma through their Series A fundraising process, positioning their digital health platform for healthcare investors.',
  },
  {
    title: 'Perivision',
    tagline: 'Series A',
    sector: 'Health & Life Sciences',
    type: 'Fundraising',
    website: 'https://www.perivision.com/',
    description: 'Perivision develops advanced ophthalmic diagnostic technology, providing innovative solutions for eye care professionals to improve patient outcomes through early detection and monitoring.',
    challenge: 'Perivision needed capital to scale their diagnostic technology and expand into the UK and USA.',
    outcome: 'Supported Perivision through their Series A fundraising process, connecting their med-tech innovation with healthcare investors.',
  },
  {
    title: 'Junea',
    tagline: 'Series A',
    sector: 'Smart Vending',
    type: 'Fundraising',
    website: 'https://junea.nl/',
    description: 'Junea is a smart vending machine company that combines sleek hardware design with intelligent software to bring modern, app-based snack and drink solutions to offices and workspaces across the Netherlands.',
    challenge: 'Junea needed capital to scale their smart vending platform and expand across new locations and markets.',
    outcome: 'Supported Junea through their Series A fundraising process, positioning their smart vending solution for growth-stage investors.',
  },
  {
    title: 'Datylon',
    tagline: 'Series A',
    sector: 'Digital Technology',
    type: 'Fundraising',
    website: 'https://www.datylon.com/',
    description: 'Datylon provides professional data visualization and chart design tools, enabling organizations to create beautiful, on-brand reports and dashboards at scale through automated chart generation.',
    challenge: 'Datylon needed capital to scale their data visualization platform and expand their enterprise client base.',
    outcome: 'Supported Datylon through their Series A fundraising process, connecting their design-tech solution with growth-stage investors.',
  },
  {
    title: 'CoreLife Analytics',
    tagline: 'Series A',
    sector: 'AI-Driven Drug Discovery',
    type: 'Fundraising',
    website: 'https://corelifeanalytics.com/',
    description: 'CoreLife Analytics develops advanced analytics solutions for the life sciences industry, helping pharmaceutical and biotech companies make data-driven decisions across drug development and commercialization.',
    challenge: 'CoreLife Analytics needed capital to scale their analytics platform and expand across the pharmaceutical industry.',
    outcome: 'Supported CoreLife Analytics through their Series A fundraising process, positioning their life sciences analytics platform for healthcare investors.',
  },
  {
    title: 'AM-Flow',
    tagline: 'Series A',
    sector: 'Advanced Manufacturing',
    type: 'Fundraising',
    website: 'https://am-flow.com/',
    description: 'AM-Flow automates the post-processing workflow in additive manufacturing with AI-powered identification, sorting, and quality control systems. Their technology enables fully automated 3D printing factories.',
    challenge: 'AM-Flow needed capital to scale their automation solutions and expand across the additive manufacturing industry.',
    outcome: 'Supported AM-Flow through their Series A fundraising process, connecting their manufacturing automation platform with growth-stage investors.',
  },
  {
    title: 'Collie',
    tagline: 'Seed',
    sector: 'AgriTech',
    type: 'Fundraising',
    website: 'https://collie.ag',
    description: 'Collie has developed a deep-tech virtual fencing and cow guidance system for sustainable dairy farming. The Collie collar uses gentle techniques to train cows to respond to sounds and vibrations, allowing farmers to monitor, move, and contain cows anywhere using their smartphone.',
    challenge: 'Collie had established a small network of interested investors but struggled to convert interest into firm commitments. They needed to refine their equity story and strengthen investor materials.',
    outcome: 'Provided end-to-end fundraising support, refining their narrative, strengthening materials, and positioning them for a successful Seed round.',
  },
  {
    title: 'Earthrover',
    tagline: 'Seed',
    sector: 'AgriTech & Robotics',
    type: 'Fundraising',
    website: 'https://earthrover.farm',
    description: 'Earthrover builds autonomous agricultural robots that use AI and computer vision to perform precision farming tasks, reducing chemical inputs and improving crop yields sustainably.',
    challenge: 'Earthrover needed a full equity story improvement and targeted investor sourcing to fund their next phase, including an improved version of the rover, AI enhancements, and expanded rover functionality such as speed and precision.',
    outcome: 'Rebuilt their equity story from the ground up, screened and qualified hundreds of potential investors, and positioned Earthrover for capital aligned with their deep-tech agriculture thesis.',
  },
  {
    title: 'OMRT',
    tagline: 'Seed',
    sector: 'Digital Technology',
    type: 'Fundraising',
    website: 'https://omrt.tech',
    description: 'OMRT is the platform for parametric real estate development, using advanced computational design to transform how buildings are planned, designed, and developed. Their technology enables data-driven decision-making across the entire real estate development process.',
    challenge: 'OMRT needed growth capital to scale their parametric design platform and expand across the real estate development industry.',
    outcome: 'Supported OMRT through their fundraising process, positioning their proptech innovation for investors in the digital infrastructure space.',
  },
  {
    title: 'Tarnoc',
    tagline: 'Seed',
    sector: 'HVAC Technology',
    type: 'Fundraising',
    website: 'https://tarnoc.nl',
    description: 'Tarnoc, based at YES!Delft on the TU Delft Campus, has developed the Turbine Heat Pump, a patented high-temperature heat pump that serves as a 1-to-1 replacement for gas boilers. The system works without an outdoor unit and connects directly to existing piping and radiators, making homes all-electric in one day.',
    challenge: 'Tarnoc needed capital to bring their patented Turbine Heat Pump technology from development into commercial production and market deployment.',
    outcome: 'Supported Tarnoc through their fundraising round, connecting their clean energy heating solution with aligned climate-tech investors.',
  },
  {
    title: 'CO2BioClean',
    tagline: 'Seed',
    sector: 'Advanced Materials',
    type: 'Fundraising',
    website: 'https://co2bioclean.com',
    description: 'CO2BioClean turns carbon emissions into natural biopolymers for a fossil-free future. Their patented fermentation process captures industrial CO2 at source and transforms it into fully biodegradable PolyHydroxyAlkanoates (PHA) for use in bioplastics and textiles, addressing both climate change and plastic pollution simultaneously.',
    challenge: 'CO2BioClean needed capital to scale their patented CO2-to-biopolymer fermentation process from pilot to industrial production.',
    outcome: 'Supported CO2BioClean through their fundraising round, connecting their dual-impact cleantech solution with climate and materials investors.',
  },
  {
    title: 'Stilride',
    tagline: 'Seed',
    sector: 'Mobility & Aerospace',
    type: 'Fundraising',
    website: 'https://stilride.com',
    description: 'Stilride (STILFOLD) has reimagined green manufacturing with their patented industrial origami technology. Their approach to folding steel into complex shapes eliminates the need for traditional stamping and welding, dramatically reducing material waste, energy consumption, and production costs.',
    challenge: 'Stilride needed growth capital to scale their revolutionary steel-folding manufacturing technology and expand across automotive and mobility industries.',
    outcome: 'Supported Stilride through their fundraising process, positioning their green manufacturing innovation for mobility and sustainability investors.',
  },
  {
    title: 'Kitepower',
    tagline: 'Seed',
    sector: 'Energy & Sustainability',
    type: 'Fundraising',
    website: 'https://thekitepower.com/',
    description: 'Kitepower develops airborne wind energy systems that use automated kites to generate clean electricity. Their technology harvests wind at higher altitudes where winds are stronger and more consistent, delivering portable renewable energy.',
    challenge: 'Kitepower needed seed funding to advance their airborne wind energy technology from prototype to commercial deployment.',
    outcome: 'Supported Kitepower through their Seed fundraising process, connecting their deep-tech energy innovation with climate investors.',
  },
  {
    title: 'Evert',
    tagline: 'Seed',
    sector: 'Energy & Sustainability',
    type: 'Fundraising',
    website: 'https://evert.com/',
    description: 'Evert develops smart energy management solutions, helping businesses and consumers optimize their energy consumption and transition to sustainable energy sources.',
    challenge: 'Evert needed seed funding to develop their energy management platform and establish initial market traction.',
    outcome: 'Supported Evert through their Seed fundraising process, positioning their clean energy solution for early-stage investors.',
  },
]

const thoughts = [
  {
    title: 'The Invisible Hand Reassigning Tasks',
    date: 'January 29, 2026',
    readTime: '5 min',
    excerpt: 'Markets rarely eliminate work outright. They reprice activities and move them around. The invisible hand is not handing out pink slips. It is reallocating tasks.',
    content: "Periods of technological change reliably produce the same anxiety. Jobs will disappear. Workers will be replaced. Labour markets will break. The concern is understandable, but history suggests a quieter outcome. Markets rarely eliminate work outright. They reprice activities and move them around. The invisible hand is not handing out pink slips. It is reallocating tasks.\n\nMarkets speak in prices, not headlines\n\nLabour markets do not react to predictions about automation. They react to price signals. When a task becomes cheaper to perform, it is performed more often. When it becomes expensive, it is redesigned, substituted, or bundled differently.\n\nAI is collapsing the cost of narrowly defined activities at speed. Drafting first versions of text. Writing boilerplate code. Parsing unstructured information. None of this removes the need for human labour. It changes where labour is most valuable.\n\nThese shifts rarely announce themselves. Tasks migrate before job titles do. And the invisible hand reprices work quietly, long before narratives catch up.\n\nA small but telling example\n\nI have effectively zero technical coding ability. Until recently, building anything resembling a functional internal system would have required a developer or a meaningful investment of time learning tools I do not use elsewhere.\n\nLast week, I built a prospect qualification system. It takes criteria I define, scans company websites for relevant signals, evaluates each company, retrieves associated LinkedIn information, and populates a Google Sheet. The system achieves roughly ninety five percent accuracy and took about 8 hours to design and refine.\n\nAfter that, I built a website. That took roughly one hour. Thanks, Maurice Kleine.\n\nIn neither case did I become a software engineer. What changed was the cost and accessibility of a specific cluster of tasks. Writing code. Handling integrations. Parsing unstructured information. Those tasks became deployable without deep technical expertise. The surrounding work did not. Deciding what signals mattered, how strict the criteria should be, and where judgment was required remained fully human work. Context, prioritisation, and accountability were still scarce. Execution at the margin was not.\n\nThis is task reallocation in practice. The invisible hand did not move me into a new labour category. It removed barriers between ideas and execution. Scaled across thousands of similar activities, the implication is clear. Work is not disappearing. The boundary around who can perform certain tasks is shifting.\n\nWhere this is already visible\n\nThis pattern is not confined to digital work. It is visible across multiple sectors, including companies we work with directly.\n\nIn retail and logistics, automation has not eliminated employment. It has shifted it. Transactional work declines while demand rises for fulfilment, routing, inventory orchestration, and systems oversight. As execution becomes cheaper, judgment about flow and prioritisation becomes scarce.\n\nIn healthcare-related organisations we engage with, AI increasingly assists with diagnostics, yet clinicians remain scarce. Automation expands capacity, which increases demand for care coordination, patient interaction, exception handling, and oversight. Machines absorb speed and scale. Humans absorb responsibility, trust, and decision-making under uncertainty.\n\nIn education, the reallocation is visible even where teaching remains fully human. A leading online education platform my brother built delivers live instruction in small group settings. Technology changes the economics of delivery and observability. The work does not disappear, but marginal execution costs fall, outcomes become more visible, and human effort concentrates on pedagogical judgment, accountability, and system-level exception handling.\n\nRobotic automation makes the same point more clearly\n\nWhen robots enter a factory, they rarely replace a job. They replace a specific physical task. A bin pick. A weld. A transport movement. A fastening operation. The job disappears only on paper. The work moves elsewhere.\n\nRobots absorb repetition, precision, and endurance. Human labour shifts toward setup, calibration, monitoring, maintenance, troubleshooting, and recovery from edge cases. As execution becomes cheap, system-level judgment becomes valuable.\n\nWhy this transition feels sharper\n\nWhat makes the current moment feel more disruptive is not just that technology has become more capable. The difference is that technological capability, distribution, and marginal cost reduction now reinforce each other.\n\nOnce a tool becomes useful, it spreads quickly and becomes cheap to deploy at scale. Tasks that once took weeks can now collapse into minutes, not only because the tools are far more capable, but because they are immediately accessible and usable by people without deep technical expertise.\n\nThe invisible hand is repricing tasks faster than organisations can rewire themselves to follow. These tensions are failures of adaptation.\n\nWhere the Invisible Hand Is Pointing\n\nLabour markets increasingly demand specific combinations of tasks, but hiring and career systems still rely on static proxies like job titles and linear progression. As tasks evolve faster than roles, matching frictions increase.\n\nThe future will not be decided by how intelligent machines become. It will be decided by how quickly people and organisations realign around what markets are already signalling.\n\nAcross the economy, the pattern is consistent. Machines absorb repetition, speed, and scale. Humans move toward judgment, system design, accountability, and intervention when systems fail.\n\nThis is not creative destruction. It\u2019s creative reallocation. And the invisible hand will continue reassigning tasks, with or without our permission.",
    link: 'https://medium.com/@simon.demarmels/the-invisible-hand-reassigning-tasks-fa76bf649c9d',
  },
  {
    title: 'Context Is King',
    date: 'June 25, 2025',
    readTime: '5 min',
    excerpt: "There is no shortage of capital. What changes the game is context, and context is hard because it\u2019s personal, market-aware, emotional, and constantly changing.",
    content: "Spend enough time in private markets, and one thing becomes clear: there is no shortage of capital. Every time I\u2019ve helped a company raise, we could have built a list of a hundred relevant funds in under a day. Family offices. PE shops. Strategics. Panicky European unions. It\u2019s all out there.\n\nAnd when you really look at it, most of that money comes with roughly the same cost of capital and expectations. Some of it is friendlier, sure. Some moves faster. Some shows up with a nicer logo. But when you strip away the dressing, money is money.\n\nWhat changes the game is context. And context is hard because it\u2019s personal. It\u2019s market-aware. It\u2019s emotional. And it\u2019s constantly changing.\n\nWhy context matters\n\nI\u2019ve seen two companies raise at the same stage, with similar traction, in the same space, and walk away with completely different outcomes. One ends up with a mediocre deal, the other sparks a bidding war. It\u2019s not just about who had the better deck or stronger pipeline. It\u2019s about how well they positioned the narrative. Who they told it to, when they told it, and who was already circling.\n\nIn short: it was context.\n\nContext is everything around the numbers. It\u2019s the story, the timing, the credibility, the subtle cues that say, \u201Cthis train is leaving the station.\u201D It\u2019s not fake urgency, or fluffed numbers, or hype. It\u2019s about making something feel inevitable. When context clicks, things accelerate.\n\nConfession time: When I first joined the sell-side I walked a founder into a pitch meeting with a very high-profile investor, but with a story that hadn\u2019t been pressure-tested well enough. Halfway through, the investor interrupted with: \u201CWait, so who is your end market exactly?\u201D That was the moment I realized we\u2019d built a raise on product and traction, but not on context. Rookie mistake.\n\nMomentum is manufactured\n\nInvestors like to say they want to invest in great companies. But what they\u2019re really looking for is a signal. Momentum. Narrative fit. If a deal feels hot, everyone wants in. If a deal feels cold, even strong fundamentals can be ignored.\n\nThe difference between hot and cold? Often it\u2019s timing, positioning, and sequencing. Not intrinsic value.\n\nThis is why we spend so much time helping founders not just prepare their materials, but orchestrate their raise. You don\u2019t just open a data room and hope the money flows in. You craft the storyline and control who sees it first. You manage tempo.\n\nBecause capital doesn\u2019t chase spreadsheets. It chases heat.\n\nWhen context isn\u2019t enough\n\nLet me be clear: context isn\u2019t magic. Sometimes, the story just doesn\u2019t stick because the world isn\u2019t ready for it.\n\nWe once worked with a deep-tech company building genuinely novel and technically sound hardware. The product made sense, with real promise. We believed in it. The seed investors believed in it. The founding team was sharp. The prototype worked.\n\nBut what we couldn\u2019t narrate our way around was the economics. Competing technologies were significantly cheaper at that time. Add to that a regulatory tailwind that everyone assumed would arrive\u2026but hadn\u2019t yet. We burned weeks trying to frame the story just right.\n\nWe eventually told the founder to pull the process and wait until unit economics were clearer or until the market caught up. Brutal, but necessary.\n\nWhen the story sells itself\n\nContrast that with a different deal we supported about six months later. The fundamentals were solid. A B2B platform that showed solid signs of having found product-market fit in Europe, was growing efficiently, and had decent NRR. But what really made the raise fly was how we positioned it.\n\nWe framed it around a very real, very urgent U.S. market opportunity that was heating up fast. We showed how this company had quietly won in Europe and how its technology was a perfect complement to a much larger player.\n\nWe didn\u2019t need hype. We needed clarity. We had leverage, not just because the company was good, but because the context made it obvious where it could go next, and who might care. When everything clicks, you\u2019re not selling anymore. You\u2019re just helping people see what\u2019s already there.\n\nIt\u2019s not the best deck that wins, it\u2019s the best framed one.\n\nLook, we build beautiful decks. Incredible decks. And I must sadly admit that I\u2019ve watched more than one of those masterpieces go nowhere while some half-baked PDF thrown together in a hurry lands a $10M term sheet.\n\nWhy? Because context beats content. Every time.\n\nA successful fundraise sees the path before the pitch, like an eagle watching the current long before it dives. So stop thinking about fundraising like it\u2019s a beauty contest. It\u2019s a timing game. A pattern game. A human game. And if you want to win, you need more than polish. You need presence. You need timing.\n\nYou need context.\n\nAnd if you think I sound like a babbling idiot hung up on the intangible, shoot me a message and let me argue my position over a coffee \u2615",
    link: 'https://medium.com/@simon.demarmels/context-is-king-4b9317d51e58',
  },
  {
    title: 'Why Fundraising Needs a Gearbox, Not a Megaphone',
    date: 'May 12, 2025',
    readTime: '5 min',
    excerpt: "Most founders treat fundraising like a sprint. The most effective ones treat it like a pipeline that\u2019s always running in the background and improving with each iteration.",
    content: "Fundraising Is a System, Not an Event\n\nA lot of founders think about fundraising the way people think about weddings: a big, high-stakes event that you plan for obsessively, survive on adrenaline, and then hope never to repeat. But in reality (especially for venture-backed businesses) fundraising is more like engine design. You\u2019re not just trying to get through it once. You\u2019re building a machine that you\u2019ll need to turn on again and again.\n\nThat means it has to be scalable. Repeatable. And maybe most importantly, built with structure.\n\nIt seems to me that most founders treat their first real raise or two as a sprint (to be fair, when I first entered the game I kind of saw it through those lenses too). They muscle through it, build the deck, send the emails, take 40 calls, and eventually cross the finish line. Then they get back to the \u201Creal work.\u201D\n\nBut the most effective founders I\u2019ve worked with recognize the value of treating fundraising like a product launch. Or better yet, like a pipeline. One that\u2019s always running in the background and improving with each iteration. And doesn\u2019t rely on brute force!\n\nWarm leads get tracked over time. Relationships get built between rounds. There\u2019s a proper cadence for updates. Landing intros becomes systematized. They run a process, not a hope.\n\nWhat the Fundraising Engine Looks Like\n\nIf I were building an engine to raise capital (spoiler: we do this every day for our clients) it would include things like:\n\n\u2022 A structured CRM to track investor meetings and outcomes\n\u2022 A clear narrative that evolves with your company\n\u2022 Dynamic metrics dashboards that stay pitch-ready\n\u2022 Regular investor updates (not just when you\u2019re raising)\n\u2022 Playbooks for outreach, follow-ups, data room and updates\n\u2022 Defined roles and responsibilities for the team\n\u2022 A clear calendar for check-ins and outreach campaigns\n\u2022 A documented feedback loop for story iterations\n\nWhat\u2019s that look like? A sales process. Fundraising is enterprise sales where the product is your vision. And the buyer might not always know they need it yet.\n\nWhy This Matters\n\nWhen fundraising becomes a system, a few big things happen:\n\n\u2022 You move faster. Because you\u2019re not reinventing the wheel each time.\n\u2022 You convert better. Because you\u2019re not relying on cold starts and chaos.\n\u2022 You stay in control. Because you\u2019re managing the process instead of reacting to it.\n\nI\u2019ve seen founders cut their raise time in half between rounds, not because the market suddenly loved them more, but because they treated fundraising like an operational discipline. And in markets where timing matters (spoiler: it always does), that difference is everything.\n\nBuild the Engine Before You Need to Drive It\n\nThe worst time to build a process is when you\u2019re already in it. You don\u2019t want to be assembling the engine while hurtling down the highway.\n\nThe best founders start early and treat their conversations as learning loops. They set up their CRM before it\u2019s urgent and draft investor updates when it\u2019s quiet. They lay the track before they need the train.\n\nIf you wait until you\u2019re running out of runway, you\u2019ll raise with fear. If you build your system early, you raise with confidence.\n\nFinal thoughts\n\nThere\u2019s something powerful about turning an ad-hoc process into a repeatable system. It transforms the energy of a single founder into something the whole team can contribute to. Your CFO can own metrics prep. Your Head of Sales can manage CRM hygiene. Your co-founder can build investor relationships in parallel. Everyone gets a role. Everyone contributes to the outcome.\n\nFundraising should not be treated as a necessary evil. It\u2019s a repeatable function. And repeatable functions deserve systems. If you build the engine right, the next time you raise, it won\u2019t feel like panic. It\u2019ll feel like switching gears.\n\nIf you want to discuss how we can build you an engine that purrs like a kitten in the background, email me at simon@evolute.partners and let\u2019s grab a coffee \u2615",
    link: 'https://medium.com/@simon.demarmels/why-fundraising-needs-a-gearbox-not-a-megaphone-4c2d9ab06ff1',
  },
  {
    title: 'Notes from the Sell-Side: What We See, What We Learn, and Why It Matters',
    date: 'May 1, 2025',
    readTime: '7 min',
    excerpt: "There tends to be a frustrating scarcity of high-quality data in our industry. This is an accountability exercise: documenting the things we observe, learn, and occasionally trip over.",
    content: "I thought I\u2019d start writing for 2 reasons.\n\nFirstly, there tends to be a frustrating scarcity of high-quality data in our industry, naturally, we\u2019re sell-side advisors in private markets. I\u2019m not just talking about multiples and IRR targets, but the subtler stuff: decision-making data, patterns, and edge-case experiences that don\u2019t show up in Pitchbook. At evolute, or any other sell-side firm, the decisions we make and the guidance we give our clients needs to be grounded in truth, but if the data isn\u2019t there, or we just haven\u2019t been in a situation which has allowed us to acquire the knowledge, then its difficult to do our jobs with confidence, and in a way that adds unquestionable value to the people and companies we work with.\n\nSo this is in part an accountability exercise: a commitment (or an attempt at) to documenting the things we observe, learn, and occasionally trip over.\n\nSecond, now that we\u2019ve launched a new brand and officially spun out from our previous company, I want to try running some experiments my own way. And since I\u2019ve always had a soft spot for the written (typed?) word, I figured I\u2019d kick things off with a simple one: start writing. The goal? Establish ourselves as thoughtful operators in a market that loves buzzwords but sometimes struggles with substance, and ideally, pull in some low-CAC inbound while we\u2019re at it. My partner\u2019s got a family, for God\u2019s sake. His wife would kill us if he had to be in another country every week.\n\nNow, I\u2019ll admit: I\u2019m probably a little too transparent in life (as evidenced above), and I don\u2019t expect that to change during this experiment. But what I won\u2019t do, ever, is jeopardize the trust our clients place in us, or disclose anything that even edges into sensitive territory. That line\u2019s not blurry.\n\nStill, I do think that by reflecting on our shared experiences with an appropriate level of redaction, I can contribute to the broader knowledge base of the business community, pursue our own goal of bringing a bit more daylight into a relatively opaque industry, build a successful company with my team, and maybe even establish myself as an honest dude trying to channel his inner Eugene Fama (I like profits though).\n\nMy first official musing is about a company we supported a little over a year ago. Let\u2019s set the stage with a few key parameters:\n\n\u2022 Fundraise year: 2024\n\u2022 Product: a hardware-software analytics solution\n\u2022 Tech maturity: TRL 8-ish at the time\n\u2022 End customers: large organizations (industry undisclosed), often with multiple brands and many locations\n\u2022 Funding: raised a sizeable pre-seed\n\u2022 Product characteristics: scalable, but with some hardware COGS\n\u2022 Tech: proprietary, IP-protected\n\u2022 Problem-solution fit: solving a very real, salient customer pain point\n\nThis is one of those classic stories: a promising platform technology with multiple use cases across application areas. While it resonates equally in each vertical, the founders had chosen a focus about a year prior to our collaboration.\n\nOur collaboration started as the team prepped for their first big institutional round. Strategic questions were piling up. Meanwhile, their most influential angel was sending mixed signals at full volume: \u201CGo big! Raise a $20M seed.\u201D \u201CActually, reduce your burn.\u201D \u201CFocus on Industry 1.\u201D \u201CNo! Pivot to Industry 2.\u201D\n\nClassic. The angel had been helpful in the early days: some domain knowledge, a good check size, and the ability to wrangle other angels in. But somewhere along the way, that support turned into noise. I see this too often: founders land a high-conviction backer, only to discover that conviction is volatile.\n\nOur first order of business was defining a fundraise size that made sense given the company\u2019s current state, market potential, and operational runway. We built a narrative around the product, tech maturity, and strategic roadmap, and layered on a financial model grounded in reality, the opportunity, and the ambition of the founding team.\n\nOur second goal was to figure out what this company was actually worth. Is pricing more a function of dilution given the risk profile? Or can we genuinely stand behind a revenue multiple? How much is the IP worth? What about customer relationships? What does the upside of success look like?\n\nOur third goal, once the narrative was in place, was to get this client in front of the right investors. I\u2019m always for a cards-on-the-table conversation with an investor. These cats are going to be sitting on your board for 5\u20137 years. You don\u2019t enter into a marriage like that with skeletons in the closet.\n\nOur seven-month collaboration, three months of prep, followed by four months of investor conversations and deal execution, resulted in a successful fundraise. Right size, fair price, the right investors. Everyone walked away happy. Some stories do have happy endings.\n\nIf you want to grab a coffee and command-F the hell out of your term sheet, feel free to reach out to me at simon@evolute.partners. \u2615\uFE0F",
    link: 'https://medium.com/@simon.demarmels/notes-from-the-sell-side-what-we-see-what-we-learn-and-why-it-matters-54974d8f3628',
  },
]

/* ─── NAV ─── */
const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'thoughts', label: 'Thoughts' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
];

/* ─── OVERLAY ─── */
function Overlay({ onClose, onPrev, onNext, scrollable, children }: {
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  scrollable?: boolean;
  children: React.ReactNode;
}) {
  const touchStart = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0 && onPrev) onPrev();
      if (dx < 0 && onNext) onNext();
    }
    touchStart.current = null;
    touchStartY.current = null;
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) { e.preventDefault(); onPrev(); }
      if (e.key === 'ArrowRight' && onNext) { e.preventDefault(); onNext(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      {onPrev && (
        <button className="ov-arrow left" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <span className="nav-arrow nav-arrow-left">↗</span>
        </button>
      )}
      {onNext && (
        <button className="ov-arrow right" onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <span className="nav-arrow nav-arrow-right">↗</span>
        </button>
      )}
      <div className={`overlay-card${scrollable ? ' scrollable' : ''}`}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="overlay-close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  const [selectedDeal, setSelectedDeal] = useState<number | null>(null);
  const [selectedThought, setSelectedThought] = useState<number | null>(null);
  const [projTab, setProjTab] = useState<'All' | 'Fundraising' | 'M&A' | 'Fractional' | 'Due Diligence'>('All');
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState('about');
  const [progress, setProgress] = useState(4);
  const [askOpen, setAskOpen] = useState(false);

  React.useEffect(() => {
    const open = selectedDeal !== null || selectedThought !== null;
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [selectedDeal, selectedThought]);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 130;
      let current = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y) current = n.id;
      }
      setActive(current);
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.max(4, Math.min(100, Number.isFinite(p) ? p : 4)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const projTabs: Array<'All' | 'Fundraising' | 'M&A' | 'Fractional' | 'Due Diligence'> = ['All', 'Fundraising', 'M&A', 'Fractional', 'Due Diligence'];
  const matchTab = (d: typeof deals[number]) =>
    projTab === 'All' ? true
      : projTab === 'Fundraising' ? d.type === 'Fundraising'
      : projTab === 'M&A' ? d.type === 'M&A Advisory'
      : projTab === 'Fractional' ? d.type === 'Fractional'
      : d.type.includes('Due Diligence');

  const marqueeLogos = (projectLogos as Array<{ title: string; logo?: string; domain: string }>).filter(c => c.logo);

  return (
    <>
      <header className="topbar">
        <div className="topbar-brand"><span className="mark" />SD<span className="brand-os">//OS</span></div>
        <div className="topbar-marquee" aria-hidden="true">
          <div className="marquee-track">
            <div className="marquee-group">
              {marqueeLogos.map(c => (
                <img key={`mq-a-${c.title}`} className="marquee-logo" data-logo={c.title} src={c.logo} alt="" title={c.title} loading="lazy" />
              ))}
            </div>
            <div className="marquee-group">
              {marqueeLogos.map(c => (
                <img key={`mq-b-${c.title}`} className="marquee-logo" data-logo={c.title} src={c.logo} alt="" title={c.title} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setNavOpen(o => !o)}>
          <span className="nav-toggle-bar" />
        </button>
      </header>

      <aside className={`sidebar${navOpen ? ' open' : ''}`}>
        <div className="sidebar-head">
          <div className="sidebar-title">Simon Demarmels<small>Builder, tech enthusiast, capital-markets romantic</small></div>
        </div>
        <nav>
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={() => setNavOpen(false)}>
              <span className="nr">{String(i).padStart(2, '0')}</span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="prog-line"><span style={{ width: `${progress}%` }} /></div>
          <button className="sidebar-ask" onClick={() => setAskOpen(true)}>
            <span className="sidebar-ask-dot" />
            Ask me anything
          </button>
        </div>
      </aside>

      <main>
        {/* 00 — ABOUT */}
        <section className="section" id="about">
          <div className="kicker">00 · About</div>
          <div className="about-grid">
            <div className="photo-panel">
              <img src="/simon.png" alt="Simon Demarmels" />
            </div>
            <div>
              <p className="lead">
                {"Over the past years, I've worked with scale-ups and SMEs on fundraising, M&A, commercial DD's, and various strategic projects. Over time, my focus has shifted from highly scalable software businesses to science-based and technically complex ones. These are companies built on substantial R&D, long development cycles, and complex commercialisation pathways. Translating their progress into something investors can value is not always straightforward."}
              </p>
              <p>
                {"This gap between real, tangible progress and something investors can confidently underwrite is what led to the creation of "}
                <a className="inline" href="https://evolute.partners" target="_blank" rel="noopener">Evolute</a>.
              </p>
              <p>
                In practice, that has meant working closely with teams to clarify what actually drives value in their business, and making the calls that follow. This includes positioning the company, sharpening go-to-market, deciding what to prioritise and what to abandon, scaling internal operations, grounding that in financial reality, and building an equity story and capital strategy that reflects the opportunity ahead.
              </p>
              <p>
                Building Evolute itself has been a version of the same exercise. Setting strategy, shaping operations, hiring, and executing commercially and in projects. Where all outcomes carry direct financial and reputational consequences.
              </p>
              <p>
                Most of the time, the work is less about applying a predefined playbook and more about structured experimentation, disciplined execution, and exercising judgment under uncertainty. That is where I tend to do my best work.
              </p>
            </div>
          </div>

          <div className="kpi-row">
            <div className="kpi"><div className="kpi-val">{'>60'}</div><div className="kpi-lbl">Engagements across fundraising, M&amp;A, investor relations, and strategic finance projects.</div></div>
            <div className="kpi"><div className="kpi-val">Seed–M&amp;A</div><div className="kpi-lbl">From first institutional round to exit.</div></div>
            <div className="kpi"><div className="kpi-val">Deep-tech</div><div className="kpi-lbl">Science-based and technically complex businesses.</div></div>
            <div className="kpi"><div className="kpi-val">20+</div><div className="kpi-lbl">Sectors, from photonics and robotics to fintech and biotech.</div></div>
          </div>

          <div className="tag-row">
            {['Strategy & Operations', 'GTM Strategy', 'Cross-functional Execution', 'Strategic Finance', 'M&A', 'Fundraising', 'Corporate Strategy', 'Capital Strategy', 'Management Advisory', 'Shareholder Alignment', 'Business Model Design', 'KPI Design', 'Scaling Operations'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="links-block">
            <div>
              <span className="section-label">Personal</span>
              <div className="link-row">
                <a href="https://www.linkedin.com/in/simon-demarmels/" target="_blank" rel="noopener">LinkedIn ↗</a>
                <a href="https://medium.com/@simon.demarmels" target="_blank" rel="noopener">Medium ↗</a>
              </div>
            </div>
            <div>
              <span className="section-label">Current &amp; previous</span>
              <div className="link-row">
                <a href="https://evolute.partners" target="_blank" rel="noopener">evolute.partners ↗</a>
                <a href="https://rocketx.group/" target="_blank" rel="noopener">rocketx.group ↗</a>
                <a href="https://ibsca.nl/en/" target="_blank" rel="noopener">ibsca.nl ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* 01 — PROJECTS */}
        <section className="section" id="projects">
          <div className="kicker">01 · Projects</div>
          <h2>Selected engagements.</h2>
          <p className="lead">A cross-section of projects. Select any for the full story.</p>
          <div className="tabs">
            <div className="tab-btns">
              {projTabs.map(t => (
                <button key={t} className={projTab === t ? 'active' : ''} onClick={() => setProjTab(t)}>{t}</button>
              ))}
            </div>
          </div>
          {projTab === 'Fractional' && (
            <div className="tab-intro">
              <p>Think of me as something between a CFO and COO.</p>
              <p>I help founders turn strategy into execution by defining the priorities, KPIs, operating rhythm, and financial logic needed to move the company forward. Then I help build and implement the tooling, infrastructure, and processes required to actually run it.</p>
              <p>Not another strategy deck. Practical operating discipline, financial clarity, and hands-on execution for the next stage of growth.</p>
            </div>
          )}
          <div className="proj-grid">
            {deals.map((deal, i) => ({ deal, i })).filter(({ deal }) => matchTab(deal)).map(({ deal, i }) => (
              <div key={i} className="card clickable" onClick={() => setSelectedDeal(i)}>
                <div className="card-name">{deal.title}</div>
                <div className="card-role">{deal.tagline}</div>
                <p className="card-desc">{deal.description.slice(0, 116)}…</p>
                <div className="tag-row">
                  <span className="tag">{deal.type}</span>
                  <span className="tag alt">{deal.sector}</span>
                </div>
                <div className="read-more">Read more ↗</div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 — THOUGHTS */}
        <section className="section" id="thoughts">
          <div className="kicker">02 · Thoughts</div>
          <h2>Streams of consciousness…</h2>
          <p className="lead">Notes I write to pressure-test my own thinking on fundraising, tech, economics, and whatever else won&apos;t leave me alone.</p>
          <div className="thought-list">
            {thoughts.map((thought, i) => (
              <div key={i} className="card clickable thought" onClick={() => setSelectedThought(i)}>
                <div className="thought-meta">
                  <span className="section-label">{thought.date}</span>
                  {thought.readTime && (
                    <>
                      <span className="dot">·</span>
                      <span className="section-label">{thought.readTime}</span>
                    </>
                  )}
                </div>
                <h3 className="card-name">{thought.title}</h3>
                <p className="card-desc">{thought.excerpt}</p>
                <div className="read-more">Read more ↗</div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 — TEACHING */}
        <section className="section" id="teaching">
          <div className="kicker">03 · Teaching</div>
          <h2>Guest lectures &amp; student projects.</h2>
          <p className="lead">
            I give guest lectures to the various student finance associations at Erasmus University Rotterdam, typically on real deals and how they actually unfold. The aim is to move past textbook framings and into the judgment calls, tradeoffs, and dynamics that shape outcomes in practice.
          </p>
          <p>
            Alongside the lectures, I run scoped projects with student teams through Evolute. Each project is built around a hypothetical company I design end-to-end, pushing students to conduct rigorous market research, work through competitive and pricing dynamics, and build toward a pitch deck, capital allocation plan, and valuation. The arc closes with a sell-side simulation, where the team pitches the company back to me.
          </p>
          <div className="tag-row">
            {['Guest Lectures', 'Student Projects', 'Market Research', 'Financial Modeling', 'Valuation', 'Sell-Side Simulation'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </section>

        {/* 04 — CLIENTS */}
        <section className="section" id="clients">
          <div className="kicker">04 · Clients</div>
          <h2>Some client logos…for good measure.</h2>
          <div className="logo-cloud-grid">
            {logoRows.map((row, rowIndex) => (
              <div
                key={`logo-row-${rowIndex}`}
                className="logo-cloud-row"
                style={{ '--logo-count': row.length } as React.CSSProperties}
              >
                {row.map(company => (
                  <a
                    key={`${company.title}-${company.domain}`}
                    className="logo-cloud-item"
                    href={`https://${company.domain}`}
                    target="_blank"
                    rel="noopener"
                    aria-label={company.title}
                    title={company.title}
                  >
                    {company.logo ? (
                      <img
                        className="logo-cloud-mark"
                        data-logo={company.title}
                        src={company.logo}
                        alt={company.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = 'inline';
                        }}
                      />
                    ) : null}
                    <span className="logo-cloud-fallback" style={{ display: company.logo ? undefined : 'inline' }}>{company.title}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* 05 — CONTACT */}
        <section className="section" id="contact">
          <div className="kicker">05 · Contact</div>
          <h2>Get in touch.</h2>
          <p className="lead">For fundraising, M&amp;A, strategic finance projects, a guest lecture, or just a good ole chat.</p>
          <form className="contact-form" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
            const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
            window.location.href = `mailto:simon.demarmels@gmail.com?subject=Website inquiry from ${name}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
          }}>
            <div className="row2">
              <input name="name" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Your email" required />
            </div>
            <textarea name="message" placeholder="Write your message…" rows={5} required />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn" type="submit">Send ↗</button>
            </div>
          </form>
          <div className="links-block">
            <div>
              <span className="section-label">Elsewhere</span>
              <div className="link-row">
                <a href="https://www.linkedin.com/in/simon-demarmels/" target="_blank" rel="noopener">LinkedIn ↗</a>
                <a href="https://medium.com/@simon.demarmels" target="_blank" rel="noopener">Medium ↗</a>
                <a href="https://evolute.partners" target="_blank" rel="noopener">evolute.partners ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Deal Overlay */}
      {selectedDeal !== null && (
        <Overlay
          onClose={() => setSelectedDeal(null)}
          onPrev={() => setSelectedDeal((selectedDeal - 1 + deals.length) % deals.length)}
          onNext={() => setSelectedDeal((selectedDeal + 1) % deals.length)}
        >
          <div className="tag-row" style={{ marginTop: 0, marginBottom: 20, paddingRight: 40 }}>
            <span className="tag">{deals[selectedDeal].type}</span>
            <span className="tag alt">{deals[selectedDeal].sector}</span>
          </div>
          <h2 className="ov-title">{deals[selectedDeal].title}</h2>
          <p className="ov-tagline">{deals[selectedDeal].tagline}</p>
          {deals[selectedDeal].website && (
            <a className="ov-link" href={deals[selectedDeal].website} target="_blank" rel="noopener">
              {deals[selectedDeal].website!.replace('https://', '')} ↗
            </a>
          )}
          {(deals[selectedDeal] as { announcement?: { label: string; url: string } }).announcement && (
            <a
              className="ov-announce"
              href={(deals[selectedDeal] as { announcement: { label: string; url: string } }).announcement.url}
              target="_blank"
              rel="noopener"
            >
              <span className="ov-announce-dot" />
              {(deals[selectedDeal] as { announcement: { label: string; url: string } }).announcement.label} ↗
            </a>
          )}
          {[
            { label: 'About', text: deals[selectedDeal].description },
            { label: 'The Challenge', text: deals[selectedDeal].challenge },
            { label: 'Outcome', text: deals[selectedDeal].outcome },
          ].map((section) => (
            <div key={section.label} className="ov-section">
              <h4 className="ov-h4">{section.label}</h4>
              <p className="ov-text">{section.text}</p>
            </div>
          ))}
        </Overlay>
      )}

      {/* Thought Overlay */}
      {selectedThought !== null && (
        <Overlay
          onClose={() => setSelectedThought(null)}
          onPrev={() => setSelectedThought((selectedThought - 1 + thoughts.length) % thoughts.length)}
          onNext={() => setSelectedThought((selectedThought + 1) % thoughts.length)}
          scrollable
        >
          <div className="ov-thought-head">
            <div className="thought-meta">
              <span className="section-label">{thoughts[selectedThought].date}</span>
              {thoughts[selectedThought].readTime && (
                <>
                  <span className="dot">·</span>
                  <span className="section-label">{thoughts[selectedThought].readTime}</span>
                </>
              )}
            </div>
            {thoughts[selectedThought].link && (
              <a className="ov-medium" href={thoughts[selectedThought].link} target="_blank" rel="noopener">Medium ↗</a>
            )}
          </div>
          <h2 className="ov-title" style={{ marginBottom: 24, lineHeight: 1.25 }}>{thoughts[selectedThought].title}</h2>
          <div className="ov-body">{thoughts[selectedThought].content}</div>
        </Overlay>
      )}

      <AskBot open={askOpen} onClose={() => setAskOpen(false)} />
    </>
  );
}
