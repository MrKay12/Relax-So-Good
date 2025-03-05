"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleVerification = (verified: boolean) => {
    if (verified) {
      setIsVerified(true);
      router.push("/home");
    } else {
      alert("You must be of legal age to enter this site.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Age Verification</h1>
      <p className="mb-8">Are you 18 years or older?</p>
      <div className="flex gap-4">
        <Button onClick={() => handleVerification(true)}>Yes</Button>
        <Button onClick={() => handleVerification(false)}>No</Button>
      </div>
    </div>
  );
}