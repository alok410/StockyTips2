import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users, Award, CheckCircle, Star, Calendar, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [showWhatsAppRedirect, setShowWhatsAppRedirect] = useState(false);
  const { initiatePayment } = useRazorpay();
  const { toast } = useToast();

  // Countdown to July 12, 2025 6:30 PM IST
  const targetDate = new Date('2025-07-05T18:30:00+05:30');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePayment = () => {
    console.log('Initiating Razorpay payment...');
    
    initiatePayment({
      key: "rzp_live_QxWMEYJBmq2amj", // Your actual Razorpay key ID
      amount: 9900, // ₹99 in paise
      name: "StockyTips Trading Masterclass",
      description: "Master the Art of Stock Trading - July 05, 2025",
      handler: (response: any) => {
        console.log("Payment Success:", response);
        toast({
          title: "Payment Successful! 🎉",
          description: "Redirecting you to WhatsApp group...",
        });
        
        // Redirect to WhatsApp after successful payment
        setTimeout(() => {
          setShowWhatsAppRedirect(true);
        }, 2000);
      },
      prefill: {
        name: "Trading Student",
        email: "",
        contact: "",
      },
      modal: {
        ondismiss: () => {
          toast({
            title: "Payment Cancelled",
            description: "You can complete payment anytime before the masterclass",
            variant: "destructive",
          });
        },
      },
    });
  };

  const handleWhatsAppJoin = () => {
    // Replace with your actual WhatsApp group link
    window.open('https://chat.whatsapp.com/L1wscyRM5Qj5FGAbOoH2Af', '_blank');
  };

  if (showWhatsAppRedirect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 bg-white/95 backdrop-blur-sm">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Welcome to the StockyTips Trading Masterclass</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Join our exclusive WhatsApp group to receive:
            </p>
            <ul className="text-sm text-left space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Live session updates</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Course materials</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Direct access to instructor</li>
            </ul>
            
            <Button 
              onClick={handleWhatsAppJoin}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              Join WhatsApp Group
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2">
              StockyTips Exclusive
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Masterclass - With 1 week  Assistaceship</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Master the Art of Stock Trading with Proven Strategies
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>July 05, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>6:30 PM - 9:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Masterclass Starts In:</h2>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-300">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* About Instructor */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Meet Your Instructor</h2>
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-12 w-12 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nikunj Patel</h3>
                  <div className="flex justify-center items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-300 ml-2">(4.9/5 Rating)</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">5+ Years</div>
                    <div className="text-gray-300">Trading Experience</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">10K+</div>
                    <div className="text-gray-300">Students Trained</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">85%</div>
                    <div className="text-gray-300">Success Rate</div>
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-gray-300">
                  <p className="text-center">
                    "I've been successfully trading in the Indian stock market for over 5 years, 
                    helping thousands of students achieve financial freedom through smart trading strategies."
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">Technical Analysis Expert</Badge>
                    <Badge variant="secondary">Risk Management Specialist</Badge>
                    <Badge variant="secondary">Intraday Trading Pro</Badge>
                    <Badge variant="secondary">Options Trading</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Learn */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">What You'll Master</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Technical Analysis Fundamentals",
                "Chart Pattern Recognition",
                "Risk Management Strategies",
                "Entry & Exit Timing",
                "Money Management Rules",
                "Psychology of Trading",
                "Live Market Analysis",
                "Portfolio Building Techniques"
              ].map((item, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-black mb-4">Limited Time Offer</h3>
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <IndianRupee className="h-8 w-8 text-black" />
                    <span className="text-4xl font-bold text-black">99</span>
                  </div>
                  <div className="text-black/70 line-through">₹999 Regular Price</div>
                  <div className="text-black font-semibold">90% OFF - Today Only!</div>
                </div>
                
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold mb-4"
                >
                  Join Masterclass - Pay ₹99
                </Button>
                
                <div className="text-sm text-black/70">
                  Secure payment via Razorpay • Instant access after payment
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">
              Follow us on Instagram and Telegram for daily trading tips -
              <span>  </span>  
            <Badge variant="outline" className="border-white/30 text-white">
              <a href="https://www.instagram.com/stockytips/?igsh=ZTg2ODlmYW1rMzBk">@stockytipsInstagram</a> 
            </Badge>
            <span> </span>
            <span>& </span>
            <span> </span>
            <Badge variant="outline" className="border-white/30 text-white">
              <a href="https://t.me/stockytips">@stockytipsTelegram</a> 
            </Badge>
            </p>
            
            <p className="text-gray-300 mb-4">
              For any query message on WhatsApp :
              <span>  </span>  
            <Badge variant="outline" className="border-white/30 text-white">
              <a href=""> +91 78742 60154</a> 
            </Badge>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;