// 'use client';

// import { useState } from 'react';
// import { X, CreditCard, User, Mail, Phone, Loader2 } from 'lucide-react';

// interface PaymentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   ticket: {
//     id: string;
//     name: string;
//     price: number;
//     type: 'individual' | 'family';
//   } | null;
//   onPaymentSuccess: (paymentData: any) => void;
// }

// export default function PaymentModal({ isOpen, onClose, ticket, onPaymentSuccess }: PaymentModalProps) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     quantity: 1
//   });
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState('');

//   if (!isOpen || !ticket) return null;

//   const totalPrice = ticket.price * formData.quantity;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.fullName || !formData.email || !formData.phone) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     setProcessing(true);

//     try {
//       // Here you would integrate with your payment gateway (Paystack, Flutterwave, etc.)
//       // For demo purposes, we'll simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // On successful payment, call the callback
//       onPaymentSuccess({
//         ticketId: ticket.id,
//         ticketName: ticket.name,
//         amount: totalPrice,
//         quantity: formData.quantity,
//         customer: formData
//       });

//       onClose();
//       alert(`Payment successful! You have purchased ${formData.quantity} ${ticket.name} ticket(s).`);
//     } catch (err) {
//       setError('Payment processing failed. Please try again.');
//       console.error('Payment error:', err);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h3>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//               <h4 className="font-semibold text-gray-900 mb-2">{ticket.name}</h4>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Price per ticket:</span>
//                 <span className="font-semibold">₦{ticket.price.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-sm mt-2">
//                 <span className="text-gray-600">Quantity:</span>
//                 <span className="font-semibold">{formData.quantity}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-green-300">
//                 <span className="text-gray-900">Total:</span>
//                 <span className="text-green-600">₦{totalPrice.toLocaleString()}</span>
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
//                 <p className="text-red-800 text-sm">{error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="tel"
//                     required
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="08012345678"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Quantity
//                 </label>
//                 <select
//                   value={formData.quantity}
//                   onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 >
//                   <option value={1}>1</option>
//                   <option value={2}>2</option>
//                   <option value={3}>3</option>
//                   <option value={4}>4</option>
//                   <option value={5}>5</option>
//                 </select>
//               </div>

//               <div className="flex space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={processing}
//                   className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
//                 >
//                   {processing ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <CreditCard className="w-5 h-5" />
//                       <span>Pay ₦{totalPrice.toLocaleString()}</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-4 text-xs text-gray-500 text-center">
//               <p>Payment will be processed securely through our payment gateway</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { X, CreditCard, User, Mail, Phone, Loader2 } from 'lucide-react';
// import PaystackPop from "@paystack/inline-js";

// interface PaymentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   ticket: {
//     id: string;
//     name: string;
//     price: number;
//     type: 'individual' | 'family';
//   } | null;
//   onPaymentSuccess: (paymentData: any) => void;
// }

// export default function PaymentModal({ isOpen, onClose, ticket, onPaymentSuccess }: PaymentModalProps) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     quantity: 1
//   });

//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState('');

//   if (!isOpen || !ticket) return null;

//   const totalPrice = ticket.price * formData.quantity;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.fullName || !formData.email || !formData.phone) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     setProcessing(true);

//     try {
//       //  PAYSTACK INLINE PAYMENT
//       const paystack = new PaystackPop();

//       paystack.newTransaction({
//         key: process.env.NEXT_PAYSTACK_PUBLIC_KEY,
//         email: formData.email,
//         amount: totalPrice * 100, // Paystack uses kobo
//         metadata: {
//           fullName: formData.fullName,
//           phone: formData.phone,
//           ticketId: ticket.id,
//           ticketName: ticket.name,
//           quantity: formData.quantity
//         },
//         onSuccess: (transaction: any) => {
//           onPaymentSuccess({
//             reference: transaction.reference,
//             ticketId: ticket.id,
//             ticketName: ticket.name,
//             amount: totalPrice,
//             quantity: formData.quantity,
//             customer: formData
//           });

//           setProcessing(false);
//           onClose();

//           alert(`Payment successful! Ref: ${transaction.reference}`);
//         },
//         onCancel: () => {
//           setProcessing(false);
//           alert("Payment cancelled.");
//         }
//       });

//     } catch (err) {
//       console.error("Payment error:", err);
//       setError('Payment processing failed. Please try again.');
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h3>
//               <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//               <h4 className="font-semibold text-gray-900 mb-2">{ticket.name}</h4>

//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Price per ticket:</span>
//                 <span className="font-semibold">₦{ticket.price.toLocaleString()}</span>
//               </div>

//               <div className="flex justify-between text-sm mt-2">
//                 <span className="text-gray-600">Quantity:</span>
//                 <span className="font-semibold">{formData.quantity}</span>
//               </div>

//               <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-green-300">
//                 <span className="text-gray-900">Total:</span>
//                 <span className="text-green-600">₦{totalPrice.toLocaleString()}</span>
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
//                 <p className="text-red-800 text-sm">{error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* FULL NAME */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </div>

//               {/* EMAIL */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </div>

//               {/* PHONE */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="tel"
//                     required
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="08012345678"
//                   />
//                 </div>
//               </div>

//               {/* QUANTITY */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
//                 <select
//                   value={formData.quantity}
//                   onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 >
//                   <option value={1}>1</option>
//                   <option value={2}>2</option>
//                   <option value={3}>3</option>
//                   <option value={4}>4</option>
//                   <option value={5}>5</option>
//                 </select>
//               </div>

//               {/* BUTTONS */}
//               <div className="flex space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={processing}
//                   className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
//                 >
//                   {processing ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <CreditCard className="w-5 h-5" />
//                       <span>Pay ₦{totalPrice.toLocaleString()}</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-4 text-xs text-gray-500 text-center">
//               <p>Payment will be processed securely through Paystack.</p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { X, CreditCard, User, Mail, Phone, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    name: string;
    price: number;
    type: 'individual' | 'family';
  } | null;
  onPaymentSuccess: (paymentData: any) => void;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaymentModal({ isOpen, onClose, ticket, onPaymentSuccess }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    quantity: 1
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Load Paystack script dynamically
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      }
    }
  }, []);

  if (!isOpen || !ticket) return null;

  const totalPrice = ticket.price * formData.quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setProcessing(true);

    try {
      const paystack = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // from .env.local
        email: formData.email,
        amount: totalPrice * 100, // Paystack expects kobo
        metadata: {
          fullName: formData.fullName,
          phone: formData.phone,
          ticketId: ticket.id,
          ticketName: ticket.name,
          quantity: formData.quantity
        },
        callback: (response: any) => {
          onPaymentSuccess({
            reference: response.reference,
            ticketId: ticket.id,
            ticketName: ticket.name,
            amount: totalPrice,
            quantity: formData.quantity,
            customer: formData
          });

          setProcessing(false);
          onClose();
          alert(`Payment successful! Ref: ${response.reference}`);
        },
        onClose: () => {
          setProcessing(false);
          alert('Payment cancelled.');
        }
      });

      paystack.openIframe();

    } catch (err) {
      console.error(err);
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{ticket.name}</h4>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per ticket:</span>
                <span className="font-semibold">₦{ticket.price.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{formData.quantity}</span>
              </div>

              <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-green-300">
                <span className="text-gray-900">Total:</span>
                <span className="text-green-600">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FULL NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="08012345678"
                  />
                </div>
              </div>

              {/* QUANTITY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay ₦{totalPrice.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Payment will be processed securely through Paystack.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

