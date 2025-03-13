"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogClose } from "@radix-ui/react-dialog";

type BillingPeriod = "monthly" | "yearly";

type PricingFeature = {
  text: string;
  included: boolean;
};

type PricingTier = {
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  priceDetail: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
  popular?: boolean;
};

type ComparisonFeature = {
  name: string;
  description?: string;
  tiers: {
    free: string | boolean;
    personal: string | boolean;
    enterprise: string | boolean;
  };
};

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      description: "Basic features for personal use",
      monthlyPrice: "0₫",
      yearlyPrice: "0₫",
      priceDetail: "free forever",
      features: [
        { text: "1 chat per day", included: true },
        { text: "Basic AI capabilities", included: true },
        { text: "Standard response time", included: true },
        { text: "Community support", included: true },
        { text: "Access to basic templates", included: true },
        { text: "Priority support", included: false },
        { text: "Advanced AI features", included: false },
        { text: "Custom templates", included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      name: "Personal",
      description: "Perfect for individual professionals",
      monthlyPrice: "$20",
      yearlyPrice: "$200",
      priceDetail: billingPeriod === "monthly" ? "per month" : "per year",
      features: [
        { text: "Unlimited chats", included: true },
        { text: "Advanced AI capabilities", included: true },
        { text: "Faster response time", included: true },
        { text: "Priority email support", included: true },
        { text: "Access to all templates", included: true },
        { text: "Custom templates", included: true },
        { text: "API access", included: false },
        { text: "Dedicated account manager", included: false },
      ],
      buttonText: "Upgrade Now",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Team",
      description: "For teams",
      monthlyPrice: "$25",
      yearlyPrice: "$250",
      priceDetail: billingPeriod === "monthly" ? "per month" : "per year",
      features: [
        { text: "Unlimited chats", included: true },
        { text: "Premium AI capabilities", included: true },
        { text: "Fastest response time", included: true },
        { text: "24/7 phone & email support", included: true },
        { text: "Access to all templates", included: true },
        { text: "Custom templates", included: true },
        { text: "Full API access", included: true },
        { text: "Dedicated account manager", included: true },
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary",
    },
  ];

  const comparisonFeatures: ComparisonFeature[] = [
    {
      name: "Chat Limits",
      description: "Number of chats you can create",
      tiers: {
        free: "1 per day",
        personal: "Unlimited",
        enterprise: "Unlimited",
      },
    },
    {
      name: "AI Model",
      description: "The AI model used for responses",
      tiers: {
        free: "Basic",
        personal: "Advanced",
        enterprise: "Premium",
      },
    },
    {
      name: "Response Time",
      description: "How quickly the AI responds",
      tiers: {
        free: "Standard",
        personal: "Fast",
        enterprise: "Fastest",
      },
    },
    {
      name: "Support",
      description: "Available support channels",
      tiers: {
        free: "Community",
        personal: "Priority Email",
        enterprise: "24/7 Phone & Email",
      },
    },
    {
      name: "Templates",
      description: "Pre-made templates for common tasks",
      tiers: {
        free: "Basic only",
        personal: "All templates",
        enterprise: "All + Custom",
      },
    },
    {
      name: "API Access",
      description: "Integrate with your own applications",
      tiers: {
        free: false,
        personal: false,
        enterprise: true,
      },
    },
    {
      name: "Team Members",
      description: "Number of team members allowed",
      tiers: {
        free: "1",
        personal: "1",
        enterprise: "Unlimited",
      },
    },
    {
      name: "Custom Branding",
      description: "Add your own branding",
      tiers: {
        free: false,
        personal: false,
        enterprise: true,
      },
    },
    {
      name: "Analytics",
      description: "Track usage and performance",
      tiers: {
        free: "Basic",
        personal: "Advanced",
        enterprise: "Enterprise",
      },
    },
    {
      name: "Dedicated Account Manager",
      description: "Personal support contact",
      tiers: {
        free: false,
        personal: false,
        enterprise: true,
      },
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 14 days of your purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. For Vietnamese customers, we also support local payment methods like MoMo and VNPay.",
    },
    {
      question: "Is there a contract or commitment?",
      answer:
        "No, all plans are month-to-month with no long-term contracts. Enterprise plans can be customized with different billing cycles if needed.",
    },
    {
      question: "Can I try before I buy?",
      answer:
        "Yes! Our Free plan lets you experience the basic features. Additionally, all paid plans come with a 14-day free trial, no credit card required.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full h-screen p-0 overflow-auto">
        <DialogClose>
          <button
            // onClick={() => onOpenChange(false)}
            className="cursor-pointer absolute right-4 top-4 z-10 rounded-full p-2 bg-black/20 hover:bg-black/40 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogClose>

        <div className="py-12 px-4 md:px-8 lg:px-12 relative">
          <div className="w-full space-y-12 max-w-7xl mx-auto">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                Simple, Transparent Pricing
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that's right for you. All plans include a 14-day
                free trial.
              </p>

              {/* Billing Period Toggle */}
              <div className="flex items-center justify-center mt-8">
                <div className="bg-secondary rounded-full p-1 flex items-center">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      billingPeriod === "monthly"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
                      billingPeriod === "yearly"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Yearly
                    {billingPeriod === "yearly" && (
                      <span className="absolute -top-3 -right-16 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded">
                        Save 16%
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`flex flex-col ${tier.popular ? "border-primary shadow-md relative" : ""}`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">
                        {billingPeriod === "monthly"
                          ? tier.monthlyPrice
                          : tier.yearlyPrice}
                      </span>
                      {tier.monthlyPrice !== "Contact us" && (
                        <span className="text-muted-foreground ml-2">
                          {tier.priceDetail}
                        </span>
                      )}
                    </div>
                    {billingPeriod === "yearly" && tier.name === "Personal" && (
                      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                        Save 388.000₫ compared to monthly
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                          )}
                          <span
                            className={
                              feature.included ? "" : "text-muted-foreground"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={tier.buttonVariant}
                      className="w-full"
                      onClick={() => onOpenChange(false)}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Plan Comparison Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Plan Comparison
              </h2>
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Feature</TableHead>
                      <TableHead className="text-center">Free</TableHead>
                      <TableHead className="text-center">Personal</TableHead>
                      <TableHead className="text-center">Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonFeatures.map((feature) => (
                      <TableRow key={feature.name}>
                        <TableCell className="font-medium">
                          {feature.name}
                          {feature.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {feature.description}
                            </p>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {typeof feature.tiers.free === "boolean" ? (
                            feature.tiers.free ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            feature.tiers.free
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {typeof feature.tiers.personal === "boolean" ? (
                            feature.tiers.personal ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            feature.tiers.personal
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {typeof feature.tiers.enterprise === "boolean" ? (
                            feature.tiers.enterprise ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            )
                          ) : (
                            feature.tiers.enterprise
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mt-16 text-center bg-secondary/50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                Need a custom solution?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We offer tailored solutions for larger teams and specific
                requirements. Contact our sales team to discuss your needs.
              </p>
              <Button onClick={() => onOpenChange(false)}>Contact Sales</Button>
            </div>

            {/* FAQ Section with Accordion */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Frequently Asked Questions
              </h3>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
