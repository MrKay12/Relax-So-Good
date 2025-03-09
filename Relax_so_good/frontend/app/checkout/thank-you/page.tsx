"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import AgeVerification from "@/components/age-verification"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react"
import Footer from "@/components/footer"

export default function ThankYouPage() {
  const router = useRouter()
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [orderNumber, setOrderNumber] = useState<string>("")

  useEffect(() => {
    // Check if user has previously verified their age
    const isVerified = localStorage.getItem("age-verified") === "true"
    setVerified(isVerified)

    // Generate a random order number
    setOrderNumber(`RSG-${Math.floor(100000 + Math.random() * 900000)}`)

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
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
            <p className="text-xl mb-2">Votre commande a été confirmée.</p>
            <p className="text-gray-500 mb-8">
              Vous recevrez un email de confirmation à l'adresse email que vous avez fournie.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold mb-2">Numéro de commande: {orderNumber}</h2>
              <p className="text-gray-500">
                Vous pouvez suivre l'état de votre commande dans votre compte.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="flex items-center">
                <Link href="/account/orders">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Suivre ma commande
                </Link>
              </Button>
              <Button asChild className="bg-black hover:bg-gray-800 text-white">
                <Link href="/">
                  Continuer mes achats
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

