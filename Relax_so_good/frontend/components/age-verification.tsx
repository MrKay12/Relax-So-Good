"use client"

import { Button } from "@/components/ui/button"

interface AgeVerificationProps {
  onVerify: (isAdult: boolean) => void
}

export default function AgeVerification({ onVerify }: AgeVerificationProps) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-between z-50">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <h1 className="text-2xl font-bold mb-4">Confirmez votre âge</h1>
          <p className="mb-8">Avez-vous 18 ans ou plus ?</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="px-8 py-2 border-gray-300 hover:bg-gray-100"
              onClick={() => onVerify(false)}
            >
              NON
            </Button>
            <Button className="px-8 py-2 bg-gray-900 text-white hover:bg-gray-800" onClick={() => onVerify(true)}>
              OUI
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

