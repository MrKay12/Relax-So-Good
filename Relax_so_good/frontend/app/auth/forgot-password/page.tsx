"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import AgeVerification from "@/components/age-verification"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if user has previously verified their age
    const isVerified = localStorage.getItem("age-verified") === "true"
    setVerified(isVerified)
    setLoading(false)
  }, [])

  const handleVerification = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("age-verified", "true")
      setVerified(true)
    } else {
      window.location.href = "https://www.google.com"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send a password reset email
    console.log("Password reset requested for:", email)
    setSubmitted(true)
  }

  // Show nothing during initial load to prevent flash of content
  if (loading) {
    return null
  }

  // If not verified, show only the age verification modal
  if (!verified) {
    return <AgeVerification onVerify={handleVerification} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container max-w-md mx-auto px-4 py-12">
          <Link href="/auth/login" className="flex items-center text-sm mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à la connexion
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Mot de passe oublié</h1>
            <p className="text-gray-500 mt-2">Entrez votre adresse email pour réinitialiser votre mot de passe</p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
              <h2 className="text-xl font-semibold text-green-700 mb-2">Email envoyé !</h2>
              <p className="text-green-600 mb-4">
                Si un compte existe avec l'adresse {email}, vous recevrez un email avec les instructions pour
                réinitialiser votre mot de passe.
              </p>
              <p className="text-sm text-gray-500">
                N'oubliez pas de vérifier votre dossier de spam si vous ne trouvez pas l'email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                Réinitialiser le mot de passe
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

