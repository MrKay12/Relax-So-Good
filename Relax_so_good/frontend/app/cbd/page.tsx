"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AgeVerification from "@/components/age-verification"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Filter } from "lucide-react"
import Image from "next/image"

// Sample CBD products
const products = [
  {
    id: 1,
    name: "CBD Flower Premium",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fleurs",
    thc: "<0.2%",
    cbd: "18%",
  },
  {
    id: 2,
    name: "CBD Oil 10%",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Huiles",
    thc: "<0.2%",
    cbd: "10%",
  },
  {
    id: 3,
    name: "CBD Gummies",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Edibles",
    thc: "<0.2%",
    cbd: "5%",
  },
  {
    id: 4,
    name: "CBD Capsules",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Capsules",
    thc: "<0.2%",
    cbd: "15%",
  },
  {
    id: 5,
    name: "CBD Cream",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cosmétiques",
    thc: "<0.2%",
    cbd: "3%",
  },
  {
    id: 6,
    name: "CBD Tea",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Infusions",
    thc: "<0.2%",
    cbd: "2%",
  },
]

export default function CBDPage() {
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

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
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Produits CBD</h1>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative pt-[100%]">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                    {product.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="font-bold mb-2">{product.price.toFixed(2)} €</p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded">THC: {product.thc}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">CBD: {product.cbd}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

