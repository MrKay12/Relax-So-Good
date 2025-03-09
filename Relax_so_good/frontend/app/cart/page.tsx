"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AgeVerification from "@/components/age-verification"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react"

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "CBD Flower Premium",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "CBD Oil 10%",
    price: 49.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CartPage() {
  const router = useRouter()
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    // Check if user has previously verified their age
    const isVerified = localStorage.getItem("age-verified") === "true"
    setVerified(isVerified)
    setLoading(false)

    // In a real app, we would fetch cart items from localStorage or an API
    const savedCart = localStorage.getItem("cart-items")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart items", e)
      }
    }
  }, [])

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem("cart-items", JSON.stringify(cartItems))
  }, [cartItems])

  const handleVerification = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("age-verified", "true")
      setVerified(true)
    } else {
      window.location.href = "https://www.google.com"
    }
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    // Simple promo code logic - in a real app this would validate against a database
    if (promoCode.toUpperCase() === "WELCOME10") {
      setDiscount(10)
      setPromoApplied(true)
    } else if (promoCode.toUpperCase() === "SUMMER20") {
      setDiscount(20)
      setPromoApplied(true)
    } else {
      alert("Code promo invalide")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discount) / 100
  const afterDiscount = subtotal - discountAmount
  const shipping = afterDiscount >= 50 ? 0 : 4.9
  const total = afterDiscount + shipping

  const proceedToCheckout = () => {
    // Save order summary to localStorage for the checkout page
    localStorage.setItem(
      "order-summary",
      JSON.stringify({
        items: cartItems,
        subtotal,
        discount: discountAmount,
        shipping,
        total,
      }),
    )

    router.push("/checkout")
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
          <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Votre panier est vide</h2>
              <p className="text-gray-500 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Button asChild>
                <Link href="/">Continuer mes achats</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <h3 className="font-medium">Produit</h3>
                      </div>
                      <div className="col-span-2 text-center">
                        <h3 className="font-medium">Prix</h3>
                      </div>
                      <div className="col-span-2 text-center">
                        <h3 className="font-medium">Quantité</h3>
                      </div>
                      <div className="col-span-2 text-right">
                        <h3 className="font-medium">Total</h3>
                      </div>
                    </div>
                  </div>

                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b last:border-b-0">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-0 text-red-500"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <p>{item.price.toFixed(2)} €</p>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <div className="h-8 w-10 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-right">
                          <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/">Continuer mes achats</Link>
                  </Button>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full sm:w-40"
                      disabled={promoApplied}
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={promoApplied || !promoCode}>
                      Appliquer
                    </Button>
                  </div>
                </div>

                {promoApplied && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                    Code promo <span className="font-semibold">{promoCode.toUpperCase()}</span> appliqué ! Vous
                    économisez {discount}% sur votre commande.
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="border rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Remise ({discount}%)</span>
                        <span>-{discountAmount.toFixed(2)} €</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison</span>
                      <span>{shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} €`}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">TVA incluse</p>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800 text-white" onClick={proceedToCheckout}>
                    Passer à la caisse
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>Paiement 100% sécurisé</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

