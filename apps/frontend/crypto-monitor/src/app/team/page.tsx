"use client";

import { TeamHeader } from "@/components/team/team-header";
import { TeamMemberCard } from "@/components/team/team-member-card";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      description: "Blockchain technology expert with 10+ years of experience",
      image: "/team/john-doe.jpg",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      description: "Full-stack developer specializing in cryptocurrency systems",
      image: "/team/jane-smith.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Lead Developer",
      description: "Expert in smart contracts and DeFi applications",
      image: "/team/mike-johnson.jpg",
    },
    {
      name: "Sarah Wilson",
      role: "Product Manager",
      description: "Experienced in crypto market analysis and product strategy",
      image: "/team/sarah-wilson.jpg",
    },
    {
      name: "David Lee",
      role: "Security Expert",
      description: "Specialized in blockchain security and cryptography",
      image: "/team/david-lee.jpg",
    },
    {
      name: "Emily Brown",
      role: "UX Designer",
      description: "Creating intuitive interfaces for crypto applications",
      image: "/team/emily-brown.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-8 py-16">
      <TeamHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}
