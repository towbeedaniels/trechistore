"use client";

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How do I place an order?",
        answer: "Simply browse our collection, add your desired fragrances to the cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your order."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 24 hours of placing it. After that, the order enters our fulfillment process and cannot be changed. Contact us immediately at support@trechistore.com for assistance."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Please note that customs duties and taxes may apply."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's site."
      },
      {
        question: "What if my package is lost or stolen?",
        answer: "If your tracking shows delivered but you haven't received your package, please contact us within 48 hours. We'll investigate with the carrier and work to resolve the issue."
      }
    ]
  },
  {
    category: "Products",
    questions: [
      {
        question: "Are your products authentic?",
        answer: "Absolutely! All our fragrances are 100% authentic and sourced directly from authorized distributors and renowned perfumers. We guarantee the genuineness of every product."
      },
      {
        question: "What's the difference between Eau de Parfum and Eau de Toilette?",
        answer: "Eau de Parfum (EDP) contains 15-20% fragrance oil and lasts 6-8 hours. Eau de Toilette (EDT) has 5-15% fragrance oil and lasts 3-5 hours. EDP is more concentrated and longer-lasting."
      },
      {
        question: "How should I store my fragrances?",
        answer: "Store perfumes in a cool, dry place away from direct sunlight and heat. Keep bottles tightly closed when not in use. Avoid storing in bathrooms due to humidity fluctuations."
      },
      {
        question: "What is the shelf life of perfumes?",
        answer: "Unopened perfumes can last 3-5 years when stored properly. Once opened, they typically remain good for 1-3 years. Changes in scent, color, or consistency indicate the fragrance has expired."
      },
      {
        question: "Do you offer sample sizes?",
        answer: "Yes! We offer sample sizes for select fragrances. Look for the 'Sample Available' badge on product pages. Samples are a great way to try before committing to a full bottle."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unused, unopened items in original packaging. Simply contact our customer service team to initiate a return."
      },
      {
        question: "Who pays for return shipping?",
        answer: "For regular returns, customers are responsible for return shipping. However, if the item is defective or we sent the wrong product, we cover all shipping costs."
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Once we receive your return, allow 5-7 business days for inspection and processing. Your bank may take an additional 3-5 days to post the refund to your account."
      },
      {
        question: "Can I exchange an item?",
        answer: "Yes, we offer exchanges for different sizes or fragrances. Exchanges are subject to availability. Contact us to start the exchange process."
      }
    ]
  },
  {
    category: "Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers."
      },
      {
        question: "Do you offer installment payments?",
        answer: "Yes, through our partnership with Klarna and Afterpay, you can split your purchase into interest-free installments. Select your preferred option at checkout."
      },
      {
        question: "Why was my payment declined?",
        answer: "Common reasons include insufficient funds, incorrect card details, expired cards, or fraud protection triggers. Try again with correct information or contact your bank."
      }
    ]
  },
  {
    category: "Account",
    questions: [
      {
        question: "Do I need an account to shop?",
        answer: "No, you can checkout as a guest. However, creating an account lets you track orders, save favorites, and enjoy faster checkout."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email. We'll send you a link to create a new password."
      },
      {
        question: "Can I change my email or password?",
        answer: "Yes, log into your account and go to Account Settings. You can update your email, password, and other personal information there."
      }
    ]
  },
  {
    category: "Gift Cards",
    questions: [
      {
        question: "Do you sell gift cards?",
        answer: "Yes! Our digital gift cards are available in various denominations and are delivered instantly via email. Perfect for any occasion."
      },
      {
        question: "Do gift cards expire?",
        answer: "No, our gift cards never expire and can be used for any purchase on our website."
      },
      {
        question: "Can I use multiple gift cards?",
        answer: "Yes, you can use multiple gift cards on a single order. Enter each code at checkout."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Find answers to common questions about our products and services.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqs.map((category, categoryIndex) => (
          <div key={category.category} className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              {category.category}
            </h2>
            
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => (
                <div
                  key={questionIndex}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform flex-shrink-0 ${
                        openIndex === `${categoryIndex}-${questionIndex}` ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openIndex === `${categoryIndex}-${questionIndex}` && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still Need Help */}
        <div className="bg-primary-900 rounded-2xl p-8 text-center text-white mt-16">
          <h2 className="text-2xl font-serif font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-gold-500 hover:bg-gold-600">
              Contact Us
            </Link>
            <a href="mailto:support@trechistore.com" className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-primary-900 font-medium rounded-lg transition-colors">
              Email Support
            </a>
          </div>
          <div className="mt-6 text-gray-400 text-sm">
            <p>Or call us at (555) 123-4567</p>
            <p>Mon-Fri, 9am-6pm EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
