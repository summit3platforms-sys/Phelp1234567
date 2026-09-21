import { prisma } from './src/lib/prisma';

async function main() {
  const updatedMarcus = await prisma.author.update({
    where: { slug: 'marcus-vance' },
    data: {
      bio: "Marcus Vance is a former HP-certified Senior Hardware Technician with over 15 years of hands-on experience repairing both enterprise copiers and consumer printers. He holds a degree in Electrical Engineering from Purdue University and multiple vendor-specific hardware certifications from Canon, Zebra, and Epson. When he isn't tearing down malfunctioning printheads in the lab, Marcus contributes to open-source hardware repair forums.",
      role: "Senior Hardware Technician",
      experienceYears: 15,
    }
  });
  console.log("Updated Marcus:", updatedMarcus);
}

main().catch(console.error).finally(() => prisma.$disconnect());
