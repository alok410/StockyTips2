
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: any;
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export const useRazorpay = () => {
  const { toast } = useToast();

  const initiatePayment = (options: Partial<RazorpayOptions>) => {
    if (!window.Razorpay) {
      toast({
        title: "Payment Error",
        description: "Razorpay SDK not loaded. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    const defaultOptions: RazorpayOptions = {
      key: "rzp_test_JDSroeOCegScaN", // Your actual Razorpay key
      amount: 9900, // Amount in paise (₹99 = 9900 paise)
      currency: "INR",
      name: "StockyTips",
      description: "Trading Masterclass - July 12, 2025",
      image: "/favicon.ico",
      handler: (response: any) => {
        console.log("Payment successful:", response);
        toast({
          title: "Payment Successful!",
          description: "Welcome to the StockyTips Trading Masterclass",
        });
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#f59e0b", // Orange color matching your design
      },
      modal: {
        ondismiss: () => {
          console.log("Payment cancelled");
          toast({
            title: "Payment Cancelled",
            description: "You can try again anytime",
            variant: "destructive",
          });
        },
      },
    };

    const razorpayOptions = { ...defaultOptions, ...options };
    const rzp = new window.Razorpay(razorpayOptions);
    rzp.open();
  };

  return { initiatePayment };
};
