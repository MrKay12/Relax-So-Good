"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AgeVerification from "@/components/age-verification"
import ProductReviewForm from "@/components/product-review-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, ArrowRight, Star } from "lucide-react"

// This would normally come from a database or API
const product = {
  id: 1,
  name: "CBD Flower Premium",
  price: 29.99,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  category: "Fleurs",
  thc: "<0.2%",
  cbd: "18%",
  description:
    "Notre fleur de CBD Premium est cultivée avec soin pour offrir une expérience exceptionnelle. Riche en cannabinoïdes et en terpènes, elle offre tous les bienfaits du cannabis sans les effets psychoactifs du THC.",
  details: {
    origin: "Suisse",
    cultivation: "Indoor",
    flavor: "Earthy, Pine, Citrus",
    effects: "Relaxing, Calming",
  },
  reviews: [
    {
      id: 1,
      author: "Jean D.",
      rating: 5,
      comment: "Excellente qualité, je recommande vivement !",
      date: "12/02/2023",
    },
    {
      id: 2,
      author: "Marie L.",
      rating: 4,
      comment: "Très bon produit, livraison rapide.",
      date: "05/01/2023",
    },
  ],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [reviews, setReviews] = useState(product.reviews)

  useEffect(() => {
    // Check if user has previously verified their age
    const isVerified = localStorage.getItem("age-verified") === "true"
    setVerified(isVerified)

    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("user-logged-in") === "true"
    setIsLoggedIn(userLoggedIn)

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

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleSubmitReview = (review: { rating: number; comment: string; productId: number }) => {
    const newReview = {
      id: reviews.length + 1,
      author: "Vous", // In a real app, this would be the user's name
      rating: review.rating,
      comment: review.comment,
      date: new Date().toLocaleDateString(),
    }

    setReviews([...reviews, newReview])
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full"
                  onClick={prevImage}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full"
                  onClick={nextImage}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 border rounded ${
                      index === currentImageIndex ? "border-black" : "border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>CBD</span>
                  <span>•</span>
                  <span>{product.category}</span>
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold mt-2">{product.price.toFixed(2)} €</p>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="bg-gray-100 px-3 py-1 rounded-full">THC: {product.thc}</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">CBD: {product.cbd}</span>
              </div>

              <p className="text-gray-600">{product.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={decrementQuantity}>
                    -
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={incrementQuantity}>
                    +
                  </Button>
                </div>
                <Button className="flex-1 bg-black hover:bg-gray-800 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={isFavorite ? "text-red-500" : ""}
                  onClick={toggleFavorite}
                >
                  <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Livraison gratuite</p>
                    <p className="text-sm text-gray-500">À partir de 50€</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Paiement sécurisé</p>
                    <p className="text-sm text-gray-500">CB, PayPal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="details" className="mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping">Livraison</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Caractéristiques</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Origine:</span>
                      <span>{product.details.origin}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Culture:</span>
                      <span>{product.details.cultivation}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Saveur:</span>
                      <span>{product.details.flavor}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Effets:</span>
                      <span>{product.details.effects}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Informations légales</h3>
                  <p className="text-sm text-gray-600">
                    Nos produits contiennent moins de 0,2% de THC conformément à la législation européenne. Ils sont
                    destinés aux personnes majeures et ne sont pas recommandés pendant la grossesse ou l'allaitement.
                    Ces produits ne sont pas des médicaments et ne peuvent se substituer à un traitement médical.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
              <div className="space-y-6">
                {isLoggedIn && <ProductReviewForm productId={product.id} onSubmitReview={handleSubmitReview} />}

                {!isLoggedIn && (
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <p className="text-center mb-2">Connectez-vous pour laisser un avis</p>
                    <div className="flex justify-center">
                      <Button asChild className="bg-black hover:bg-gray-800 text-white">
                        <Link href="/auth/login">Se connecter</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <div className="flex items-center gap-1 text-yellow-400 mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="w-4 h-4" fill={i < review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="mt-2">{review.comment}</p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Aucun avis pour le moment. Soyez le premier à donner votre avis !
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Modes de livraison</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">Colissimo</p>
                        <p className="text-sm text-gray-500">Livraison en 2-3 jours ouvrés</p>
                      </div>
                      <p className="font-medium">4.90 €</p>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">Chronopost</p>
                        <p className="text-sm text-gray-500">Livraison en 24h</p>
                      </div>
                      <p className="font-medium">9.90 €</p>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium">Point Relais</p>
                        <p className="text-sm text-gray-500">Livraison en 3-5 jours ouvrés</p>
                      </div>
                      <p className="font-medium">3.90 €</p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Informations importantes</h3>
                  <p className="text-sm text-gray-600">
                    Livraison gratuite à partir de 50€ d'achat. Les commandes passées avant 14h sont expédiées le jour
                    même (hors week-end et jours fériés). Nous livrons uniquement en France métropolitaine et en Europe.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

