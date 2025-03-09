"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AgeVerification from "@/components/age-verification"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from "lucide-react"

type OrderSummary = {
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  subtotal: number
  discount: number
  shipping: number
  total: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [verified, setVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null)
  const [step, setStep] = useState<"shipping" | "payment">("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    shippingMethod: "colissimo",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    savePaymentInfo: false,
    acceptTerms: false,
  })

  useEffect(() => {
    // Check if user has previously verified their age
    const isVerified = localStorage.getItem("age-verified") === "true"
    setVerified(isVerified)

    // Get order summary from localStorage
    const summary = localStorage.getItem("order-summary")
    if (summary) {
      try {
        setOrderSummary(JSON.parse(summary))
      } catch (e) {
        console.error("Failed to parse order summary", e)
        router.push("/cart")
      }
    } else {
      // If no order summary, redirect to cart
      router.push("/cart")
    }

    setLoading(false)
  }, [router])

  const handleVerification = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem("age-verified", "true")
      setVerified(true)
    } else {
      window.location.href = "https://www.google.com"
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would process the payment and create an order
    // For this demo, we'll just show a success message and clear the cart
    localStorage.removeItem("cart-items")
    localStorage.removeItem("order-summary")

    // Redirect to a thank you page
    router.push("/checkout/thank-you")
  }

  // Show nothing during initial load to prevent flash of content
  if (loading) {
    return null
  }

  // If not verified, show only the age verification modal
  if (!verified) {
    return <AgeVerification onVerify={handleVerification} />
  }

  // If no order summary, show nothing (will redirect to cart)
  if (!orderSummary) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => (step === "payment" ? setStep("shipping") : router.push("/cart"))}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {step === "payment" ? "Retour aux informations" : "Retour au panier"}
            </Button>
            <h1 className="text-3xl font-bold">Paiement</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "shipping" ? "bg-black text-white" : "bg-gray-200"}`}
                  >
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Informations de livraison</h2>
                </div>

                {step === "shipping" ? (
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Mode de livraison</Label>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) => handleRadioChange("shippingMethod", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="colissimo" id="colissimo" />
                          <Label htmlFor="colissimo" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Colissimo</p>
                                <p className="text-sm text-gray-500">Livraison en 2-3 jours ouvrés</p>
                              </div>
                              <p className="font-medium">4.90 €</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="chronopost" id="chronopost" />
                          <Label htmlFor="chronopost" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Chronopost</p>
                                <p className="text-sm text-gray-500">Livraison en 24h</p>
                              </div>
                              <p className="font-medium">9.90 €</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="relais" id="relais" />
                          <Label htmlFor="relais" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Point Relais</p>
                                <p className="text-sm text-gray-500">Livraison en 3-5 jours ouvrés</p>
                              </div>
                              <p className="font-medium">3.90 €</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                      Continuer vers le paiement
                    </Button>
                  </form>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{formData.address}</p>
                        <p className="text-sm text-gray-500">
                          {formData.postalCode} {formData.city}, {formData.country}
                        </p>
                        <p className="text-sm text-gray-500">{formData.email}</p>
                        <p className="text-sm text-gray-500">{formData.phone}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setStep("shipping")}>
                        Modifier
                      </Button>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <p className="font-medium">
                        {formData.shippingMethod === "colissimo" && "Colissimo (2-3 jours)"}
                        {formData.shippingMethod === "chronopost" && "Chronopost (24h)"}
                        {formData.shippingMethod === "relais" && "Point Relais (3-5 jours)"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step === "payment" ? "bg-black text-white" : "bg-gray-200"}`}
                  >
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Paiement</h2>
                </div>

                {step === "payment" && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Label>Méthode de paiement</Label>
                      <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="card" onClick={() => handleRadioChange("paymentMethod", "card")}>
                            Carte bancaire
                          </TabsTrigger>
                          <TabsTrigger value="paypal" onClick={() => handleRadioChange("paymentMethod", "paypal")}>
                            PayPal
                          </TabsTrigger>
                          <TabsTrigger value="apple" onClick={() => handleRadioChange("paymentMethod", "apple")}>
                            Apple Pay
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Numéro de carte</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nom sur la carte</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="J. DUPONT"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Date d'expiration</Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                placeholder="MM/AA"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvc">CVC</Label>
                              <Input
                                id="cardCvc"
                                name="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="savePaymentInfo"
                              checked={formData.savePaymentInfo}
                              onCheckedChange={(checked) => handleCheckboxChange("savePaymentInfo", checked as boolean)}
                            />
                            <Label htmlFor="savePaymentInfo" className="text-sm">
                              Sauvegarder ces informations pour mes prochains achats
                            </Label>
                          </div>
                        </TabsContent>
                        <TabsContent value="paypal" className="p-4 text-center">
                          <p className="mb-4">Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                          <Image
                            src="/placeholder.svg?height=60&width=200"
                            alt="PayPal"
                            width={200}
                            height={60}
                            className="mx-auto"
                          />
                        </TabsContent>
                        <TabsContent value="apple" className="p-4 text-center">
                          <p className="mb-4">Vous serez redirigé vers Apple Pay pour finaliser votre paiement.</p>
                          <Image
                            src="/placeholder.svg?height=60&width=200"
                            alt="Apple Pay"
                            width={200}
                            height={60}
                            className="mx-auto"
                          />
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleCheckboxChange("acceptTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        J'accepte les{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          conditions générales de vente
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      disabled={!formData.acceptTerms}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payer {orderSummary.total.toFixed(2)} €
                    </Button>

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-4">
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        Paiement sécurisé
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-1" />
                        Livraison rapide
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>

                <div className="space-y-4 mb-4">
                  {orderSummary.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Qté: {item.quantity}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{orderSummary.subtotal.toFixed(2)} €</span>
                  </div>

                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Remise</span>
                      <span>-{orderSummary.discount.toFixed(2)} €</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span>{orderSummary.shipping === 0 ? "Gratuit" : `${orderSummary.shipping.toFixed(2)} €`}</span>
                  </div>

                  <div className="flex justify-between font-bold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>{orderSummary.total.toFixed(2)} €</span>
                  </div>
                  <p className="text-xs text-gray-500">TVA incluse</p>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p className="flex items-center mb-2">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                    Transactions sécurisées par cryptage SSL
                  </p>
                  <div className="flex justify-between mt-4">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

