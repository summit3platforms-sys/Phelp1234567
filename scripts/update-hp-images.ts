import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updates = [
  {
    slug: 'hp-sprocket-luna-pearl-setup-guide',
    featuredImage: '/images/articles/hp-sprocket-luna-pearl-setup-guide.jpg',
    featuredImageAlt: 'HP Sprocket Luna Pearl pocket photo printer unboxing with retail box and glossy photo print',
    featuredImageTitle: 'HP Sprocket Luna Pearl Setup and Unboxing Guide',
  },
  {
    slug: 'hp-sprocket-wont-connect-bluetooth-fix',
    featuredImage: '/images/articles/hp-sprocket-wont-connect-bluetooth-fix.jpg',
    featuredImageAlt: 'Smartphone searching for Bluetooth connection next to compact HP Sprocket pocket printer',
    featuredImageTitle: 'HP Sprocket Bluetooth Pairing and Connection Troubleshooting',
  },
  {
    slug: 'hp-sprocket-app-not-printing-fix',
    featuredImage: '/images/articles/hp-sprocket-app-not-printing-fix.jpg',
    featuredImageAlt: 'iPhone displaying HP Sprocket mobile app print queue next to portable photo printer',
    featuredImageTitle: 'HP Sprocket App Print Queue and Connection Fix',
  },
  {
    slug: 'hp-sprocket-cartridge-not-recognized-fix',
    featuredImage: '/images/articles/hp-sprocket-cartridge-not-recognized-fix.jpg',
    featuredImageAlt: 'Hands loading ZINK paper pack with blue barcode calibration smart sheet into portable photo printer',
    featuredImageTitle: 'HP Sprocket ZINK Smart Sheet Calibration and Paper Error Fix',
  },
  {
    slug: 'hp-sprocket-vs-instax-mini-link-comparison',
    featuredImage: '/images/articles/hp-sprocket-vs-instax-mini-link-comparison.jpg',
    featuredImageAlt: 'HP Sprocket pocket printer side-by-side with Fujifilm Instax Mini Link 2 on table with prints',
    featuredImageTitle: 'HP Sprocket vs Fujifilm Instax Mini Link Comparison',
  },
  {
    slug: 'hp-sprocket-prints-blank-fix',
    featuredImage: '/images/articles/hp-sprocket-prints-blank-fix.jpg',
    featuredImageAlt: 'HP Sprocket pocket photo printer ejecting blank white paper with amber error light',
    featuredImageTitle: 'HP Sprocket Blank Print Error and ZINK Orientation Fix',
  },
  {
    slug: 'hp-sprocket-select-vs-sprocket-200-difference',
    featuredImage: '/images/articles/hp-sprocket-select-vs-sprocket-200-difference.jpg',
    featuredImageAlt: 'HP Sprocket Select large format printer next to standard HP Sprocket 200 on desk',
    featuredImageTitle: 'HP Sprocket Select vs Sprocket 200 Comparison',
  },
  {
    slug: 'print-multiple-gmail-emails-at-once-guide',
    featuredImage: '/images/articles/print-multiple-gmail-emails-at-once-guide.jpg',
    featuredImageAlt: 'Laptop displaying Gmail web interface with multiple selected emails and batch print dialogue',
    featuredImageTitle: 'Batch Print Multiple Gmail Emails Guide',
  },
  {
    slug: 'print-entire-email-thread-gmail-outlook-guide',
    featuredImage: '/images/articles/print-entire-email-thread-gmail-outlook-guide.jpg',
    featuredImageAlt: 'Computer monitor displaying expanded email thread print preview formatted cleanly',
    featuredImageTitle: 'Print Entire Email Conversation Thread in Gmail and Outlook',
  },
  {
    slug: 'print-emails-without-headers-footers-ads-guide',
    featuredImage: '/images/articles/print-emails-without-headers-footers-ads-guide.jpg',
    featuredImageAlt: 'Clean printed email document on executive desk with no browser headers or ad banners',
    featuredImageTitle: 'Print Clean Emails Without Headers Footers or Ads',
  },
  {
    slug: 'batch-print-email-pdf-attachments-guide',
    featuredImage: '/images/articles/batch-print-email-pdf-attachments-guide.jpg',
    featuredImageAlt: 'Office workstation displaying batch PDF attachment print queue sending jobs to printer',
    featuredImageTitle: 'Batch Print Email PDF Attachments Without Opening',
  },
  {
    slug: 'print-emails-from-iphone-android-wireless-printer-guide',
    featuredImage: '/images/articles/print-emails-from-iphone-android-wireless-printer-guide.jpg',
    featuredImageAlt: 'Smartphone holding wireless print dialog printing email to office desktop printer',
    featuredImageTitle: 'Print Emails from iPhone and Android to Wireless Printer',
  },
  {
    slug: 'hp-printer-linux-driver-install-ubuntu',
    featuredImage: '/images/articles/hp-printer-linux-driver-install-ubuntu.jpg',
    featuredImageAlt: 'Ubuntu Linux desktop workstation with terminal executing hp-setup for HP printer',
    featuredImageTitle: 'Install HP Printer Drivers on Ubuntu Linux with HPLIP',
  },
  {
    slug: 'hplip-not-detecting-printer-fix',
    featuredImage: '/images/articles/hplip-not-detecting-printer-fix.jpg',
    featuredImageAlt: 'Linux monitor displaying HPLIP Device Manager searching for USB and network printers',
    featuredImageTitle: 'HPLIP Not Detecting HP Printer Discovery and USB Fix',
  },
  {
    slug: 'hp-printer-scanning-not-working-linux-fix',
    featuredImage: '/images/articles/hp-printer-scanning-not-working-linux-fix.jpg',
    featuredImageAlt: 'HP all-in-one printer scanning document alongside Linux laptop running Simple Scan SANE',
    featuredImageTitle: 'HP Printer Scanning Not Working on Linux SANE and HPLIP Fix',
  },
  {
    slug: 'hp-printer-fedora-setup-guide',
    featuredImage: '/images/articles/hp-printer-fedora-setup-guide.jpg',
    featuredImageAlt: 'Fedora Linux desktop terminal running DNF package installation for HP CUPS printer',
    featuredImageTitle: 'Fedora Linux HP Printer Setup and CUPS Configuration',
  },
  {
    slug: 'hp-pagewide-banding-fix',
    featuredImage: '/images/articles/hp-pagewide-banding-fix.jpg',
    featuredImageAlt: 'Technician examining color test printout from HP PageWide enterprise printer with banding lines',
    featuredImageTitle: 'HP PageWide Printhead Recovery and Banding Streaks Fix',
  },
  {
    slug: 'hp-pagewide-vs-regular-inkjet-difference',
    featuredImage: '/images/articles/hp-pagewide-vs-regular-inkjet-difference.jpg',
    featuredImageAlt: 'Technical comparison of HP PageWide stationary printhead array vs moving inkjet carriage',
    featuredImageTitle: 'HP PageWide vs Regular Moving Inkjet Carriage Technology Comparison',
  },
  {
    slug: 'hp-officejet-pro-x-series-printhead-error-fix',
    featuredImage: '/images/articles/hp-officejet-pro-x-series-printhead-error-fix.jpg',
    featuredImageAlt: 'Service technician working on internal gear assembly and printhead carriage of HP OfficeJet Pro X',
    featuredImageTitle: 'HP OfficeJet Pro X Printhead Lift Mechanism and Error Fix',
  },
  {
    slug: 'hp-designjet-paper-roll-wont-load-fix',
    featuredImage: '/images/articles/hp-designjet-paper-roll-wont-load-fix.jpg',
    featuredImageAlt: 'Architect loading 36-inch paper roll onto blue spindle into rear bay of HP DesignJet plotter',
    featuredImageTitle: 'HP DesignJet Plotter Paper Roll Loading and Spindle Alignment',
  },
  {
    slug: 'hp-designjet-banding-on-long-prints-fix',
    featuredImage: '/images/articles/hp-designjet-banding-on-long-prints-fix.jpg',
    featuredImageAlt: 'Large architectural CAD blueprint output from HP DesignJet plotter showing banding lines',
    featuredImageTitle: 'HP DesignJet Long Print Banding and Paper Advance Calibration',
  },
  {
    slug: 'hp-designjet-printhead-alignment-failed-fix',
    featuredImage: '/images/articles/hp-designjet-printhead-alignment-failed-fix.jpg',
    featuredImageAlt: 'Technician inspecting carriage bay optical line sensor and test pattern on HP DesignJet plotter',
    featuredImageTitle: 'HP DesignJet Printhead Alignment Diagnostic and Sensor Fix',
  },
  {
    slug: 'hp-designjet-t-series-vs-z-series-difference',
    featuredImage: '/images/articles/hp-designjet-t-series-vs-z-series-difference.jpg',
    featuredImageAlt: 'HP DesignJet T-Series CAD plotter and Z-Series photo graphics plotter side-by-side in studio',
    featuredImageTitle: 'HP DesignJet T-Series Technical vs Z-Series Graphics Comparison',
  },
  {
    slug: 'hp-designjet-cutter-not-cutting-cleanly-fix',
    featuredImage: '/images/articles/hp-designjet-cutter-not-cutting-cleanly-fix.jpg',
    featuredImageAlt: 'Close-up of wide-format plotter rotary cutter assembly and carriage track with paper clearance',
    featuredImageTitle: 'HP DesignJet Rotary Cutter Blade Jam and Track Maintenance',
  },
];

async function main() {
  console.log(`Starting update for ${updates.length} HP articles...`);

  for (const item of updates) {
    const updated = await prisma.article.updateMany({
      where: { slug: item.slug },
      data: {
        featuredImage: item.featuredImage,
        featuredImageAlt: item.featuredImageAlt,
        featuredImageTitle: item.featuredImageTitle,
      },
    });

    console.log(`Updated ${item.slug}: ${updated.count} record(s) modified.`);
  }

  console.log('Finished updating HP articles!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
