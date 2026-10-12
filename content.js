/* NMF medlemsside, demo. Copy + config. Plain browser JS, no build step.
   Placeholders filled at runtime: {kg} {amount} {now} {goal} {left} {dayKg},
   and {n} for the count in equivalence.*.one/many.
   Numbers use U+00A0 as thousands separator so they never wrap. */

window.NMF_CONFIG = {
  krPerKg: 10, membersNow: 4800, membersGoal: 5000,
  dayKg: 600, dayCostKr: 10000, fuelKr: 2000,
  tiers: [100, 500, 1000, 2000, 10000],
  // unit weights in kg for the equivalence sentence, from research/facts.md
  units: { bottle: 0.025, ropeMetre: 0.2, jerrycan: 1.0, sack: 10, epsBox: 0.6 }
};

window.NMF_LINKS = {
  hjem: "https://www.nmf.no/",
  saker: "https://www.nmf.no/saker/",
  kampanjer: "https://www.nmf.no/miljokampanjer/",
  omNmf: "https://www.nmf.no/om-nmf/",
  publikasjoner: "https://www.nmf.no/publikasjoner/",
  kontakt: "https://www.nmf.no/kontakt/",
  minSide: "https://www.nmf.no/minside/",
  vilkar: "https://nmf.no/vilkar-for-medlemskap/",
  doner: "#",      // this page
  bliMedlem: "#"   // this page
};

window.NMF_CONTENT = {
  no: {
    meta: {
      title: "Bli medlem | Norges Miljøvernforbund",
      demoBanner: "Demo / forslag: skisse til ny medlemsside. Ingen betaling skjer her.",
      langToggle: "English"
    },
    nav: {
      hjem: "Hjem", saker: "Saker", kampanjer: "Kampanjer", omNmf: "Om NMF",
      publikasjoner: "Publikasjoner", kontakt: "Kontakt", doner: "Doner",
      minSide: "Min side", bliMedlem: "Bli medlem"
    },
    hero: {
      eyebrow: "Medlemskap",
      title: "Havet rydder seg ikke selv.",
      lead: "Frivillige fra Norges Miljøvernforbund går i båtene og henter garn, tau, isopor og kanner ut av fjæra, tonn etter tonn. Som medlem holder du båtene i drift. Og du teller med når vi søker statlig grunnstøtte.",
      counterLabel: "{now} av {goal} medlemmer",
      counterLeft: "{left} igjen",
      counterNote: "Med minst 5 000 betalende medlemmer kan NMF søke statlig grunnstøtte til miljøorganisasjoner. Ligger vi under grensen, blir søknaden ikke vurdert.",
      counterSource: "Forskrift FOR-2021-06-11-1928 § 2; NMF årsmelding 2020",
      counterSourceUrl: "https://lovdata.no/dokument/SF/forskrift/2021-06-11-1928",
      exampleTag: "eksempeltall"
    },
    step1: {
      heading: "1. Velg medlemskap",
      intro: "To medlemskap, like rettigheter. Begge teller likt når vi søker statsstøtte. Prisen er det eneste som skiller dem.",
      chooseLabel: "Velg ett",
      ordinary: {
        name: "Ordinært medlem",
        price: "200 kr",
        per: "per år",
        desc: "For alle som vil være med. Fullt medlemskap med stemmerett og 10 % rabatt i gjenbruksbutikken vår i Bergen."
      },
      student: {
        name: "Student",
        price: "50 kr",
        per: "per år",
        desc: "Samme medlemskap, lavere pris. Du teller like mye."
      },
      countsAsMember: "Telles som medlem",
      gift: {
        title: "Velkomstgave: NMF-krus",
        desc: "Alle nye medlemmer får et krus i posten. Bruk det, og fortell gjerne hvor det kommer fra.",
        proposalTag: "Forslag"
      }
    },
    step2: {
      heading: "2. Gi et ekstra bidrag",
      intro: "Valgfritt. Et ekstra bidrag går til ryddedagene: drivstoff, utstyr og levering av avfallet vi finner. Velg et beløp og se omtrent hvor mange kilo det tilsvarer.",
      tierNotes: {
        "100": "Ca. 10 kg, én full søppelsekk",
        "500": "Ca. 50 kg, fem fulle sekker",
        "1000": "Ca. 100 kg, ti sekker opp i båten",
        "2000": "Drivstoff til én ryddedag med to båter",
        "10000": "Én hel ryddedag: 10 frivillige, 2 båter, ca. 600 kg"
      },
      customLabel: "Eget beløp",
      customPlaceholder: "Beløp i kr",
      kgHeadline: "ca. {kg} kg",
      kgSub: "For {amount} kr henter vi omtrent så mye søppel ut av havet.",
      referenceLine: "Én ryddedag = {dayKg} kg",
      rateFootnote: "Avrundet regnestykke: 10 kr ≈ 1 kg, basert på én ryddedag med 10 frivillige og to båter (eksempeltall). Den fulle kostnaden ligger nærmere 20 kr per kilo.",
      dayCard: {
        title: "Én ryddedag",
        line1: "10 frivillige og 2 båter",
        line2: "Ca. 600 kg garn, tau, isopor og kanner",
        line3: "Ca. 10 000 kr til drivstoff, utstyr og levering",
        tag: "Eksempel: en god ryddedag"
      },
      equivalence: {
        intro: "Omtrent det samme som",
        bottle: { one: "{n} tom plastflaske", many: "{n} tomme plastflasker" },
        ropeMetre: { one: "{n} meter tykt tau", many: "{n} meter tykt tau" },
        jerrycan: { one: "{n} tom kanne", many: "{n} tomme kanner" },
        sack: { one: "{n} full søppelsekk", many: "{n} fulle søppelsekker" },
        epsBox: { one: "{n} isoporkasse", many: "{n} isoporkasser" },
        joiner: " eller ",
        gridCaption: "I praksis er det en blanding: garn, tau, isopor og noen kanner. Det er det de frivillige faktisk finner."
      }
    },
    facts: {
      heading: "Dette vet vi",
      items: [
        {
          number: "36 000 kg",
          text: "avfall fjernet NMF fra norsk natur i 2025.",
          source: "NMF, Miljømagasinet 2026",
          url: "https://nmf.no/wp-content/uploads/2026/03/Miljomagasinet-2026-10-compressed.pdf",
          example: false
        },
        {
          number: "6 av 10",
          text: "sporbare gjenstander er norske eller nordiske. Søppelet er vårt eget.",
          source: "Handelens Miljøfond / SALT, 2024",
          url: "https://kommunikasjon.ntb.no/pressemelding/18644226/norges-verste-strandsoppel-er-menneskeskapt-med-kniv?lang=no",
          example: false
        },
        {
          number: "70-tallet",
          text: "Vi finner fortsatt plast fra 70- og 80-tallet i fjæra.",
          source: "NRK 2017; SALT 2022",
          url: "https://www.nrk.no/nordland/_--en-halv-meter-ned-i-sanden_-finner-vi-40-50-ar-gammel-plast-1.13668956",
          example: false
        },
        {
          number: "Tau",
          text: "er det vanligste vi finner. Fiskeri, havbruk og skipsfart er den største kilden målt i vekt.",
          source: "Handelens Miljøfond / SALT, 2024",
          url: "https://kommunikasjon.ntb.no/pressemelding/18644226/norges-verste-strandsoppel-er-menneskeskapt-med-kniv?lang=no",
          example: false
        }
      ]
    },
    cta: {
      button: "Gå videre til betaling",
      note: "Demo: ingen betaling skjer. Medlemskapet gjelder for kalenderåret og fornyes årlig. Se vilkår for medlemskap."
    },
    thanks: {
      title: "Takk. Du er med.",
      body: "Bidraget ditt tilsvarer omtrent {kg} kg søppel ut av havet.",
      closer: "Og vi er ett medlem nærmere 5 000.",
      button: "Tilbake til nmf.no"
    },
    footer: {
      org: "Norges Miljøvernforbund",
      address: "Skuteviksbodene 24, 5035 Bergen",
      orgnr: "Org.nr. 871 351 082",
      phone: "55 30 67 00",
      email: "nmf@nmf.no",
      tagline: "En av Norges mest aktive frivillige organisasjoner innen miljøvern",
      demoNote: "Demo / forslag til ny medlemsside. Ingen betaling, ingenting lagres. Tall merket «eksempeltall» er ikke hentet fra NMFs regnskap."
    }
  },

  en: {
    meta: {
      title: "Become a member | Norges Miljøvernforbund",
      demoBanner: "Demo / proposal: a sketch for a new membership page. No payment is taken here.",
      langToggle: "Norsk"
    },
    nav: {
      hjem: "Home", saker: "Issues", kampanjer: "Campaigns", omNmf: "About NMF",
      publikasjoner: "Publications", kontakt: "Contact", doner: "Donate",
      minSide: "My page", bliMedlem: "Become a member"
    },
    hero: {
      eyebrow: "Membership",
      title: "The sea does not clean itself.",
      lead: "Volunteers from Norges Miljøvernforbund take the boats out and haul nets, rope, styrofoam and jerrycans off the shore, tonne after tonne. As a member you keep the boats running. And you count when we apply for state core funding.",
      counterLabel: "{now} of {goal} members",
      counterLeft: "{left} to go",
      counterNote: "With at least 5 000 paying members NMF can apply for state core funding for environmental organisations. Below that threshold the application is not considered.",
      counterSource: "Regulation FOR-2021-06-11-1928 § 2; NMF annual report 2020",
      counterSourceUrl: "https://lovdata.no/dokument/SF/forskrift/2021-06-11-1928",
      exampleTag: "example figure"
    },
    step1: {
      heading: "1. Choose your membership",
      intro: "Two memberships, the same rights. Both count the same when we apply for state funding. The price is the only difference.",
      chooseLabel: "Pick one",
      ordinary: {
        name: "Ordinary member",
        price: "200 kr",
        per: "per year",
        desc: "For everyone who wants in. Full membership with voting rights and 10 % off in our second-hand shop in Bergen."
      },
      student: {
        name: "Student",
        price: "50 kr",
        per: "per year",
        desc: "Same membership, lower price. You count just as much."
      },
      countsAsMember: "Counts as a member",
      gift: {
        title: "Welcome gift: NMF mug",
        desc: "Every new member gets a mug in the post. Use it, and tell people where it came from.",
        proposalTag: "Proposal"
      }
    },
    step2: {
      heading: "2. Add a one-off contribution",
      intro: "Optional. An extra contribution goes to the clean-up days: fuel, equipment and disposal of what we find. Pick an amount and see roughly what it means in kilos.",
      tierNotes: {
        "100": "About 10 kg, one full litter sack",
        "500": "About 50 kg, five full sacks",
        "1000": "About 100 kg, ten sacks into the boat",
        "2000": "Fuel for one clean-up day with two boats",
        "10000": "One full clean-up day: 10 volunteers, 2 boats, about 600 kg"
      },
      customLabel: "Own amount",
      customPlaceholder: "Amount in kr",
      kgHeadline: "about {kg} kg",
      kgSub: "Roughly how much litter we take out of the sea for {amount} kr.",
      referenceLine: "One clean-up day = {dayKg} kg",
      rateFootnote: "Rounded figure: 10 kr ≈ 1 kg, based on one clean-up day with 10 volunteers and two boats (example figure). The full cost is closer to 20 kr per kilo.",
      dayCard: {
        title: "One clean-up day",
        line1: "10 volunteers and 2 boats",
        line2: "About 600 kg of nets, rope, styrofoam and jerrycans",
        line3: "About 10 000 kr for fuel, equipment and disposal",
        tag: "Example: a good clean-up day"
      },
      equivalence: {
        intro: "About the same as",
        bottle: { one: "{n} empty plastic bottle", many: "{n} empty plastic bottles" },
        ropeMetre: { one: "{n} metre of thick rope", many: "{n} metres of thick rope" },
        jerrycan: { one: "{n} empty jerrycan", many: "{n} empty jerrycans" },
        sack: { one: "{n} full litter sack", many: "{n} full litter sacks" },
        epsBox: { one: "{n} styrofoam fish box", many: "{n} styrofoam fish boxes" },
        joiner: " or ",
        gridCaption: "In practice it is a mix: nets, rope, styrofoam and a few jerrycans. That is what the volunteers actually find."
      }
    },
    facts: {
      heading: "What we know",
      items: [
        {
          number: "36 000 kg",
          text: "of litter removed by NMF from Norwegian nature in 2025.",
          source: "NMF, Miljømagasinet 2026",
          url: "https://nmf.no/wp-content/uploads/2026/03/Miljomagasinet-2026-10-compressed.pdf",
          example: false
        },
        {
          number: "6 in 10",
          text: "traceable items are Norwegian or Nordic. The litter is our own.",
          source: "Handelens Miljøfond / SALT, 2024",
          url: "https://kommunikasjon.ntb.no/pressemelding/18644226/norges-verste-strandsoppel-er-menneskeskapt-med-kniv?lang=no",
          example: false
        },
        {
          number: "1970s",
          text: "We still find plastic from the 1970s and 80s on the shore.",
          source: "NRK 2017; SALT 2022",
          url: "https://www.nrk.no/nordland/_--en-halv-meter-ned-i-sanden_-finner-vi-40-50-ar-gammel-plast-1.13668956",
          example: false
        },
        {
          number: "Rope",
          text: "offcuts are our most common find. Fishing, aquaculture and shipping are the biggest source by weight.",
          source: "Handelens Miljøfond / SALT, 2024",
          url: "https://kommunikasjon.ntb.no/pressemelding/18644226/norges-verste-strandsoppel-er-menneskeskapt-med-kniv?lang=no",
          example: false
        }
      ]
    },
    cta: {
      button: "Continue to payment",
      note: "Demo: no payment is taken. Membership runs per calendar year and renews annually. See the membership terms."
    },
    thanks: {
      title: "Thank you. You are in.",
      body: "Your contribution is worth about {kg} kg of litter out of the sea.",
      closer: "And we are one member closer to 5 000.",
      button: "Back to nmf.no"
    },
    footer: {
      org: "Norges Miljøvernforbund",
      address: "Skuteviksbodene 24, 5035 Bergen",
      orgnr: "Org. no. 871 351 082",
      phone: "55 30 67 00",
      email: "nmf@nmf.no",
      tagline: "One of Norway's most active volunteer environmental organisations",
      demoNote: "Demo / proposal for a new membership page. No payment, nothing is stored. Figures marked 'example figure' are not taken from NMF's accounts."
    }
  }
};
