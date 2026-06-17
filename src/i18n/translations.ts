/**
 * Site-wide translations for English (en) and Tamil (ta).
 *
 * Only user-facing *text* lives here. Structural data (icons, images, colours,
 * hrefs) stays in the components / `data/site.ts` and is zipped with these
 * strings by index, so adding a language never means duplicating layout data.
 */

export type Language = 'en' | 'ta'

export interface Translation {
  nav: {
    home: string
    about: string
    services: string
    contact: string
    getValuation: string
    call: string
    freeValuation: string
  }
  hero: {
    eyebrow: string
    headline: string
    dynamicWords: string[]
    subheading: string
    ticker: string[]
  }
  why: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    titleLine3: string
    subtitle: string
    cta: string
    stats: { value: string; label: string }[]
    features: { title: string; description: string }[]
  }
  about: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    description: string
    stats: { value: string; label: string }[]
  }
  process: {
    eyebrow: string
    title: string
    description: string
    steps: { title: string; description: string }[]
  }
  services: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    learnMore: string
    cards: { title: string; description: string }[]
  }
  trust: {
    eyebrow: string
    title: string
    description: string
    stats: { value: string; label: string }[]
    bisTitle: string
    bisDescription: string
    badges: string[]
  }
  testimonials: {
    eyebrow: string
    title: string
    description: string
    items: { name: string; profession: string; review: string }[]
  }
  faq: {
    eyebrow: string
    title: string
    description: string
    items: { question: string; answer: string }[]
  }
  consultation: {
    eyebrow: string
    title: string
    description: string
    whatsapp: string
    branch: string
    hours: string
    nameLabel: string
    mobileLabel: string
    areaLabel: string
    serviceLabel: string
    serviceOptions: string[]
    typeLabel: string
    callTimeLabel: string
    messageLabel: string
    submit: string
    submitting: string
    privacy: string
    successTitle: string
    successBody: string
    submitAnother: string
  }
  footer: {
    about: string
    quickLinks: string
    services: string
    legal: string
    rateTitle: string
    rateDescription: string
    emailPlaceholder: string
    subscribed: string
    rights: string
    quickLinkItems: string[]
    serviceItems: string[]
    legalItems: string[]
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      getValuation: 'Get Free Valuation',
      call: 'Call',
      freeValuation: 'Free Valuation',
    },
    hero: {
      eyebrow: 'Welcome to EastGold',
      headline: 'Turn Your Gold Into',
      dynamicWords: [
        'Value With Confidence',
        'Complete Transparency',
        'Trusted Hands',
        'Genuine Worth',
        'Peace of Mind',
      ],
      subheading:
        'At EastGold, we respect the memories behind your gold and provide a transparent valuation through a simple, comfortable process.',
      ticker: [
        'Fair, Market-Linked Rates',
        'Professional Gold Valuation',
        'Transparent Pricing',
        'Trusted by Families',
        'Prompt, Secure Settlement',
        'Experienced Valuers',
        'No Hidden Charges',
        'Secure Transactions',
      ],
    },
    why: {
      eyebrow: 'Why Choose EastGold',
      titleLine1: 'Turn Your Gold Into',
      titleLine2: 'Genuine Value With',
      titleLine3: 'Complete Trust',
      subtitle:
        'Fair valuation, verified purity, prompt payment and complete security — the EastGold promise.',
      cta: 'Get Free Gold Valuation',
      stats: [
        { value: '10K+', label: 'Customers Served' },
        { value: '15+', label: 'Years of Experience' },
        { value: '100%', label: 'Secure Process' },
      ],
      features: [
        {
          title: 'Trusted Service',
          description: 'Respectful and clear customer support at every step.',
        },
        {
          title: 'Simple Process',
          description: 'A straightforward process that is easy to understand.',
        },
        {
          title: 'Clear Information',
          description: 'The valuation and next steps are always explained openly.',
        },
        {
          title: 'Customer Privacy',
          description: 'Careful, confidential handling of your personal information.',
        },
        {
          title: 'Quick Customer Support',
          description: 'Easy support through phone and WhatsApp whenever you need it.',
        },
      ],
    },
    about: {
      eyebrow: 'About EastGold',
      titleLine1: 'Built on Trust,',
      titleLine2: 'Driven by Value',
      description:
        'At EastGold, every customer is treated with respect. We explain the valuation, service process and next steps clearly before proceeding.',
      stats: [
        { value: '10K+', label: 'Happy Customers' },
        { value: '15+', label: 'Years of Experience' },
        { value: '100%', label: 'Transparency' },
        { value: '100%', label: 'Customer Satisfaction' },
      ],
    },
    process: {
      eyebrow: 'Gold Exchange Process',
      title: 'Four Simple, Transparent Steps',
      description:
        'From your first message to a confident decision — a calm, professional experience from start to finish.',
      steps: [
        { title: 'Contact Us', description: 'Contact us through phone, WhatsApp, or the website enquiry form.' },
        { title: 'Gold Evaluation', description: 'Your gold is checked for weight and purity before valuation.' },
        { title: 'Know the Value', description: 'The valuation and service details are explained clearly.' },
        { title: 'Make Your Decision', description: 'You can make your decision comfortably after understanding the complete details.' },
      ],
    },
    services: {
      eyebrow: 'OUR SERVICES',
      titleLine1: 'Value Your Gold',
      titleLine2: 'With Confidence',
      learnMore: 'Learn More',
      cards: [
        { title: 'Sell Old Gold', description: 'Valuation and buying service for old, broken or unused gold jewellery.' },
        { title: 'Gold Exchange Support', description: 'Understand the value of your old gold and receive clear support for your next requirement.' },
        { title: 'Gold Valuation', description: 'Understand the weight, purity and valuation process in a simple way.' },
        { title: 'Release Pledged Gold', description: 'Guidance and support for customers looking to release pledged gold.' },
        { title: 'Gold Sale Support', description: 'Get the information and valuation support you need before selling your gold.' },
        { title: 'Secure Bank Transfer Support', description: 'Secure transaction support after the required verification and documentation process.' },
      ],
    },
    trust: {
      eyebrow: 'Trust & Security',
      title: 'Built on Two Decades of Integrity',
      description:
        'A modern, BIS-hallmarked operation trusted by thousands of families and businesses.',
      stats: [
        { value: '99.9%', label: 'Valuation Accuracy' },
        { value: '10,000+', label: 'Happy Customers' },
        { value: '20+', label: 'Years of Experience' },
        { value: '100%', label: 'Transparent Process' },
      ],
      bisTitle: 'BIS Hallmarked Standards',
      bisDescription:
        'Certified, verifiable and secure — every transaction is documented and auditable.',
      badges: ['BIS Certified', 'XRF Verified', 'Instant Transfer', 'Secure Transactions'],
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'Trusted by Families Like Yours',
      description:
        'Real stories from customers who valued, exchanged and released their gold with confidence.',
      items: [
        {
          name: 'Lakshmi Narayanan',
          profession: 'School Teacher, Saibaba Colony',
          review:
            'They tested my gold in front of me and explained every number. I received the full amount in my account within minutes. Truly transparent.',
        },
        {
          name: 'Karthik Raja',
          profession: 'Textile Business Owner, Tiruppur',
          review:
            'I exchanged old jewellery during a cash crunch. The valuation was the fairest I found and the process felt completely professional.',
        },
        {
          name: 'Priya Devi',
          profession: 'Software Engineer, Peelamedu',
          review:
            'They helped me release my pledged gold from the bank without any stress. Polite team, private rooms, and no hidden charges at all.',
        },
        {
          name: 'Mohammed Anwar',
          profession: 'Retired Bank Manager, RS Puram',
          review:
            'As a former banker I am hard to impress. EastGold’s documentation and XRF testing are genuinely institutional grade. Highly trustworthy.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions, Answered Transparently',
      description:
        'Everything you need to know before you visit. Still unsure? Our experts are a call away.',
      items: [
        {
          question: 'What documents are required to sell old gold?',
          answer:
            'Government-issued identification and basic details may be required. Our team will explain the exact requirements.',
        },
        {
          question: 'How is the gold valued?',
          answer:
            'The gold is checked for weight and purity, and the valuation details are explained clearly.',
        },
        {
          question: 'Is doorstep service available?',
          answer:
            'Doorstep service may be available by appointment in selected areas. Contact our team to confirm availability.',
        },
        {
          question: 'Is support available for releasing pledged gold?',
          answer:
            'Yes. Our team will explain the available support, process and applicable conditions.',
        },
        {
          question: 'Are there any hidden charges?',
          answer:
            'Service details and any applicable charges will be communicated clearly in advance.',
        },
        {
          question: 'Can the exact gold value be confirmed over the phone?',
          answer:
            'An exact value cannot be confirmed without physical verification. Contact us to schedule a valuation.',
        },
      ],
    },
    consultation: {
      eyebrow: 'Free Consultation',
      title: 'Ready to Know the Value of Your Gold?',
      description:
        'Get clear answers and valuation support without pressure — call us, message us on WhatsApp, or share a few details below.',
      whatsapp: 'Chat on WhatsApp',
      branch: 'Coimbatore Main Branch',
      hours: 'Mon – Sat · 10:00 AM – 8:00 PM',
      nameLabel: 'Name',
      mobileLabel: 'Mobile Number',
      areaLabel: 'Your Area',
      serviceLabel: 'Select Service',
      serviceOptions: [
        'Sell Old Gold',
        'Gold Valuation',
        'Release Pledged Gold',
        'Doorstep Service',
        'General Enquiry',
      ],
      typeLabel: 'Type of Gold',
      callTimeLabel: 'Preferred Call Time',
      messageLabel: 'Message',
      submit: 'Request Valuation',
      submitting: 'Sending…',
      privacy: 'Your information will be kept private and used only for service-related communication.',
      successTitle: 'Request Received',
      successBody:
        'Thank you. Our valuation expert will contact you shortly. For anything urgent, please call or WhatsApp us.',
      submitAnother: 'Submit another request',
    },
    footer: {
      about:
        'A trusted destination for transparent gold valuation, exchange and prompt payment — backed by BIS-certified processes and two decades of integrity.',
      quickLinks: 'Quick Links',
      services: 'Services',
      legal: 'Legal',
      rateTitle: 'Gold Rate Updates',
      rateDescription: 'Get daily gold rate updates in your inbox.',
      emailPlaceholder: 'Your email',
      subscribed: 'Thank you — you are subscribed.',
      rights: 'All rights reserved.',
      quickLinkItems: ['Home', 'About', 'Services'],
      serviceItems: [
        'Sell Old Gold',
        'Gold Exchange',
        'Gold Valuation',
        'Release Pledged Gold',
        'Gold Loan Settlement',
      ],
      legalItems: ['Privacy Policy', 'Terms of Service', 'BIS Compliance', 'Refund Policy'],
    },
  },

  ta: {
    nav: {
      home: 'முகப்பு',
      about: 'எங்களைப் பற்றி',
      services: 'சேவைகள்',
      contact: 'தொடர்பு',
      getValuation: 'இலவச மதிப்பீடு',
      call: 'அழைக்க',
      freeValuation: 'இலவச மதிப்பீடு',
    },
    hero: {
      eyebrow: 'EastGold-க்கு வரவேற்கிறோம்',
      headline: 'உங்கள் தங்கத்தின் மதிப்பை',
      dynamicWords: [
        'அறியுங்கள்',
        'பெறுங்கள்',
        'உணருங்கள்',
        'நம்புங்கள்',
        'காணுங்கள்',
      ],
      subheading:
        'உங்கள் குடும்பத்தின் நினைவுகளை மதித்து, உங்கள் தங்கத்திற்கு வெளிப்படையான மதிப்பீடு மற்றும் எளிமையான சேவையை EastGold வழங்குகிறது.',
      ticker: [
        'நியாயமான சந்தை விலை',
        'தொழில்முறை தங்க மதிப்பீடு',
        'வெளிப்படையான விலை',
        'குடும்பங்களின் நம்பிக்கை',
        'விரைவான, பாதுகாப்பான தீர்வு',
        'அனுபவமிக்க மதிப்பீட்டாளர்கள்',
        'மறைமுக கட்டணம் இல்லை',
        'பாதுகாப்பான பரிவர்த்தனைகள்',
      ],
    },
    why: {
      eyebrow: 'ஏன் EastGold',
      titleLine1: 'உங்கள் தங்கத்தை',
      titleLine2: 'உண்மையான மதிப்பாக மாற்றுங்கள்',
      titleLine3: 'முழு நம்பிக்கையுடன்',
      subtitle:
        'நியாயமான மதிப்பீடு, சரிபார்க்கப்பட்ட தூய்மை, விரைவான பணம் மற்றும் முழு பாதுகாப்பு — இதுவே EastGold-இன் உறுதிமொழி.',
      cta: 'இலவச தங்க மதிப்பீடு பெறுங்கள்',
      stats: [
        { value: '10K+', label: 'சேவை பெற்ற வாடிக்கையாளர்கள்' },
        { value: '15+', label: 'ஆண்டு அனுபவம்' },
        { value: '100%', label: 'பாதுகாப்பான முறை' },
      ],
      features: [
        {
          title: 'நம்பிக்கையான சேவை',
          description: 'ஒவ்வொரு கட்டத்திலும் மரியாதையான மற்றும் தெளிவான வாடிக்கையாளர் ஆதரவு.',
        },
        {
          title: 'எளிமையான செயல்முறை',
          description: 'புரிந்துகொள்ள எளிதான நேரடியான வழிமுறை.',
        },
        {
          title: 'வெளிப்படையான தகவல்',
          description: 'மதிப்பீடு மற்றும் அடுத்த படிகள் எப்போதும் வெளிப்படையாக விளக்கப்படும்.',
        },
        {
          title: 'தனியுரிமைக்கு முக்கியத்துவம்',
          description: 'உங்கள் தனிப்பட்ட விவரங்களை கவனமாக, ரகசியமாக கையாளுதல்.',
        },
        {
          title: 'விரைவான வாடிக்கையாளர் ஆதரவு',
          description: 'தேவைப்படும்போது அழைப்பு மற்றும் WhatsApp மூலம் எளிதான ஆதரவு.',
        },
      ],
    },
    about: {
      eyebrow: 'EastGold பற்றி',
      titleLine1: 'நம்பிக்கையால் உருவான சேவை,',
      titleLine2: 'மதிப்பால் தொடரும் உறவு',
      description:
        'EastGold-ல் ஒவ்வொரு வாடிக்கையாளரின் தேவையும் தனிப்பட்டதாக கருதப்படுகிறது. உங்கள் தங்கத்தின் மதிப்பீடு, சேவை முறை மற்றும் அடுத்த படிகள் அனைத்தும் தொடங்குவதற்கு முன் எளிமையாக விளக்கப்படும்.',
      stats: [
        { value: '10K+', label: 'மகிழ்ச்சியான வாடிக்கையாளர்கள்' },
        { value: '15+', label: 'ஆண்டு அனுபவம்' },
        { value: '100%', label: 'வெளிப்படைத்தன்மை' },
        { value: '100%', label: 'வாடிக்கையாளர் திருப்தி' },
      ],
    },
    process: {
      eyebrow: 'தங்க பரிமாற்ற முறை',
      title: 'நான்கு எளிய, வெளிப்படையான படிகள்',
      description:
        'உங்கள் முதல் செய்தி முதல் நம்பிக்கையான முடிவு வரை — தொடக்கம் முதல் முடிவு வரை அமைதியான, தொழில்முறை அனுபவம்.',
      steps: [
        { title: 'எங்களை தொடர்புகொள்ளுங்கள்', description: 'அழைப்பு, WhatsApp அல்லது இணையதள படிவம் மூலம் தொடர்புகொள்ளுங்கள்.' },
        { title: 'தங்க மதிப்பீடு', description: 'தங்கத்தின் எடை மற்றும் தரம் சரிபார்க்கப்பட்டு மதிப்பீடு செய்யப்படும்.' },
        { title: 'மதிப்பை அறிந்துகொள்ளுங்கள்', description: 'மதிப்பீடு மற்றும் சேவை விவரங்கள் தெளிவாக விளக்கப்படும்.' },
        { title: 'உங்கள் முடிவை எடுத்துக்கொள்ளுங்கள்', description: 'முழு தகவலையும் அறிந்த பிறகு உங்கள் வசதிக்கேற்ப முடிவு செய்யலாம்.' },
      ],
    },
    services: {
      eyebrow: 'எங்கள் சேவைகள்',
      titleLine1: 'உங்கள் தங்கத்தை மதிப்பிடுங்கள்',
      titleLine2: 'நம்பிக்கையுடன்',
      learnMore: 'மேலும் அறிக',
      cards: [
        { title: 'பழைய தங்கம் வாங்குதல்', description: 'பழைய, உடைந்த அல்லது பயன்படுத்தாத தங்க நகைகளுக்கான மதிப்பீடு மற்றும் வாங்கும் சேவை.' },
        { title: 'தங்க மாற்று உதவி', description: 'உங்கள் பழைய தங்கத்தின் மதிப்பை அறிந்து அடுத்த தேவைக்கான தெளிவான உதவி பெறுங்கள்.' },
        { title: 'தங்க மதிப்பீட்டு சேவை', description: 'தங்கத்தின் எடை, தரம் மற்றும் மதிப்பீட்டு முறையை எளிமையாக அறிந்துகொள்ளுங்கள்.' },
        { title: 'அடமான தங்கம் மீட்பு உதவி', description: 'அடமானத்தில் இருக்கும் தங்கத்தை மீட்க தேவையான தகவல் மற்றும் வழிகாட்டல்.' },
        { title: 'தங்க விற்பனை உதவி', description: 'தங்கத்தை விற்கும் முன் தேவையான தகவல் மற்றும் மதிப்பீட்டு உதவி.' },
        { title: 'பாதுகாப்பான வங்கி பரிமாற்ற உதவி', description: 'தேவையான சரிபார்ப்பு மற்றும் ஆவண செயல்முறைக்கு பின் பாதுகாப்பான பரிவர்த்தனை ஆதரவு.' },
      ],
    },
    trust: {
      eyebrow: 'நம்பிக்கை & பாதுகாப்பு',
      title: 'இரண்டு தசாப்த நேர்மையில் கட்டப்பட்டது',
      description:
        'ஆயிரக்கணக்கான குடும்பங்கள் மற்றும் வணிகங்களின் நம்பிக்கையைப் பெற்ற நவீன, BIS-முத்திரை செயல்பாடு.',
      stats: [
        { value: '99.9%', label: 'மதிப்பீட்டு துல்லியம்' },
        { value: '10,000+', label: 'மகிழ்ச்சியான வாடிக்கையாளர்கள்' },
        { value: '20+', label: 'ஆண்டு அனுபவம்' },
        { value: '100%', label: 'வெளிப்படையான முறை' },
      ],
      bisTitle: 'BIS முத்திரை தரநிலைகள்',
      bisDescription:
        'சான்றளிக்கப்பட்ட, சரிபார்க்கக்கூடிய மற்றும் பாதுகாப்பான — ஒவ்வொரு பரிவர்த்தனையும் ஆவணப்படுத்தப்பட்டு தணிக்கை செய்யக்கூடியது.',
      badges: ['BIS சான்றளிக்கப்பட்டது', 'XRF சரிபார்க்கப்பட்டது', 'உடனடி பரிமாற்றம்', 'பாதுகாப்பான பரிவர்த்தனைகள்'],
    },
    testimonials: {
      eyebrow: 'வாடிக்கையாளர் கருத்துகள்',
      title: 'உங்களைப் போன்ற குடும்பங்களின் நம்பிக்கை',
      description:
        'தங்களின் தங்கத்தை நம்பிக்கையுடன் மதிப்பிட்டு, பரிமாற்றம் செய்து, மீட்ட வாடிக்கையாளர்களின் உண்மையான கதைகள்.',
      items: [
        {
          name: 'லட்சுமி நாராயணன்',
          profession: 'பள்ளி ஆசிரியர், சாய்பாபா காலனி',
          review:
            'என் தங்கத்தை என் முன்னிலையில் சோதித்து ஒவ்வொரு எண்ணையும் விளக்கினார்கள். சில நிமிடங்களில் முழுத் தொகையை என் கணக்கில் பெற்றேன். உண்மையிலேயே வெளிப்படையானது.',
        },
        {
          name: 'கார்த்திக் ராஜா',
          profession: 'ஜவுளி வணிகர், திருப்பூர்',
          review:
            'பணப் பற்றாக்குறை நேரத்தில் பழைய நகைகளை பரிமாற்றம் செய்தேன். நான் கண்ட மிக நியாயமான மதிப்பீடு இதுவே, செயல்முறை முழுக்க தொழில்முறையாக இருந்தது.',
        },
        {
          name: 'பிரியா தேவி',
          profession: 'மென்பொருள் பொறியாளர், பீளமேடு',
          review:
            'வங்கியில் அடகு வைத்த என் தங்கத்தை எந்த சிரமமும் இல்லாமல் மீட்க உதவினார்கள். மரியாதையான குழு, தனிப்பட்ட அறைகள், மறைமுக கட்டணம் எதுவும் இல்லை.',
        },
        {
          name: 'முகமது அன்வர்',
          profession: 'ஓய்வுபெற்ற வங்கி மேலாளர், ஆர்.எஸ். புரம்',
          review:
            'முன்னாள் வங்கியாளராக என்னை நம்ப வைப்பது கடினம். EastGold-இன் ஆவணப்படுத்தல் மற்றும் XRF சோதனை உண்மையிலேயே நிறுவன தரம். மிகவும் நம்பகமானது.',
        },
      ],
    },
    faq: {
      eyebrow: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      title: 'கேள்விகள், வெளிப்படையாக பதிலளிக்கப்பட்டது',
      description:
        'நீங்கள் வருவதற்கு முன் தெரிந்து கொள்ள வேண்டிய அனைத்தும். இன்னும் சந்தேகமா? எங்கள் நிபுணர்கள் ஒரு அழைப்பு தூரத்தில்.',
      items: [
        {
          question: 'பழைய தங்கத்தை விற்க என்ன ஆவணங்கள் தேவை?',
          answer:
            'அரசால் வழங்கப்பட்ட அடையாள ஆவணம் மற்றும் தேவையான அடிப்படை விவரங்கள் கேட்கப்படலாம். சரியான தேவையை எங்கள் குழு விளக்கும்.',
        },
        {
          question: 'தங்க மதிப்பீடு எவ்வாறு செய்யப்படுகிறது?',
          answer:
            'தங்கத்தின் எடை மற்றும் தரம் சரிபார்க்கப்பட்டு, மதிப்பீட்டு விவரங்கள் தெளிவாக விளக்கப்படும்.',
        },
        {
          question: 'வீடு தேடி சேவை உள்ளதா?',
          answer:
            'தேர்ந்தெடுக்கப்பட்ட பகுதிகளில் முன்பதிவு அடிப்படையில் வீடு தேடி சேவை கிடைக்கலாம். சேவை கிடைப்பதை உறுதி செய்ய எங்களை தொடர்புகொள்ளுங்கள்.',
        },
        {
          question: 'அடமான தங்கத்தை மீட்க உதவி கிடைக்குமா?',
          answer:
            'ஆம். கிடைக்கும் சேவை, தேவையான நடைமுறை மற்றும் பொருந்தக்கூடிய நிபந்தனைகள் பற்றி எங்கள் குழு விளக்கும்.',
        },
        {
          question: 'மறைமுக கட்டணங்கள் உள்ளதா?',
          answer:
            'சேவை தொடர்பான விவரங்கள் மற்றும் பொருந்தக்கூடிய கட்டணங்கள் ஏதேனும் இருந்தால் முன்கூட்டியே தெரிவிக்கப்படும்.',
        },
        {
          question: 'தங்கத்தின் மதிப்பை தொலைபேசியில் சொல்ல முடியுமா?',
          answer:
            'தங்கத்தை நேரடியாக சரிபார்க்காமல் துல்லியமான மதிப்பை உறுதி செய்ய முடியாது. முதலில் எங்களை தொடர்புகொண்டு மதிப்பீட்டு நேரத்தை பதிவு செய்யலாம்.',
        },
      ],
    },
    consultation: {
      eyebrow: 'இலவச ஆலோசனை',
      title: 'உங்கள் தங்கத்தின் மதிப்பை அறிய தயாரா?',
      description:
        'எந்த அழுத்தமும் இல்லாமல், உங்கள் கேள்விகளுக்கு தெளிவான பதில்களுடன் மதிப்பீட்டு உதவி பெறுங்கள் — அழைக்கவும், WhatsApp-ல் பேசவும், அல்லது கீழே சில விவரங்களைப் பகிரவும்.',
      whatsapp: 'WhatsApp-ல் பேசுங்கள்',
      branch: 'கோயம்புத்தூர் முதன்மை கிளை',
      hours: 'திங்கள் – சனி · காலை 10:00 – இரவு 8:00',
      nameLabel: 'பெயர்',
      mobileLabel: 'மொபைல் எண்',
      areaLabel: 'உங்கள் பகுதி',
      serviceLabel: 'சேவை தேர்வு',
      serviceOptions: [
        'பழைய தங்கம் விற்பனை',
        'தங்க மதிப்பீடு',
        'அடமான தங்கம் மீட்பு',
        'வீடு தேடி சேவை',
        'பொது விசாரணை',
      ],
      typeLabel: 'தங்கத்தின் வகை',
      callTimeLabel: 'விருப்பமான தொடர்பு நேரம்',
      messageLabel: 'குறிப்பு',
      submit: 'மதிப்பீடு கோருங்கள்',
      submitting: 'அனுப்புகிறது…',
      privacy: 'உங்கள் தகவல்கள் பாதுகாப்பாக வைக்கப்படும் மற்றும் சேவை தொடர்புக்கு மட்டுமே பயன்படுத்தப்படும்.',
      successTitle: 'கோரிக்கை பெறப்பட்டது',
      successBody:
        'நன்றி. எங்கள் மதிப்பீட்டு நிபுணர் விரைவில் உங்களைத் தொடர்பு கொள்வார். அவசரத்திற்கு, தயவுசெய்து அழைக்கவும் அல்லது WhatsApp செய்யவும்.',
      submitAnother: 'மற்றொரு கோரிக்கையை சமர்ப்பிக்கவும்',
    },
    footer: {
      about:
        'வெளிப்படையான தங்க மதிப்பீடு, பரிமாற்றம் மற்றும் விரைவான பணத்திற்கான நம்பகமான இடம் — BIS-சான்றளிக்கப்பட்ட முறைகள் மற்றும் இரண்டு தசாப்த நேர்மையால் ஆதரிக்கப்படுகிறது.',
      quickLinks: 'விரைவு இணைப்புகள்',
      services: 'சேவைகள்',
      legal: 'சட்டம்',
      rateTitle: 'தங்க விலை புதுப்பிப்புகள்',
      rateDescription: 'தினசரி தங்க விலை புதுப்பிப்புகளை உங்கள் மின்னஞ்சலில் பெறுங்கள்.',
      emailPlaceholder: 'உங்கள் மின்னஞ்சல்',
      subscribed: 'நன்றி — நீங்கள் சந்தா செலுத்திவிட்டீர்கள்.',
      rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      quickLinkItems: ['முகப்பு', 'எங்களைப் பற்றி', 'சேவைகள்'],
      serviceItems: [
        'பழைய தங்கம் விற்க',
        'தங்க பரிமாற்றம்',
        'தங்க மதிப்பீடு',
        'அடகு தங்கம் மீட்பு',
        'தங்க கடன் தீர்வு',
      ],
      legalItems: ['தனியுரிமைக் கொள்கை', 'சேவை விதிமுறைகள்', 'BIS இணக்கம்', 'பணத்திரும்பக் கொள்கை'],
    },
  },
}
