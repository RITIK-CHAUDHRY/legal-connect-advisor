
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Users, Share2, Gift, Copy, Mail, MessageSquare, Twitter, Facebook } from 'lucide-react';

const CustomerReferral = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const referralCode = 'REF-JOHN123';
  const referralLink = `https://lawyerconnect.com/signup?ref=${referralCode}`;

  const [referralStats] = useState({
    totalReferred: 8,
    successfulSignups: 5,
    totalEarned: 2500,
    pendingEarnings: 500
  });

  const [referralHistory] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      status: 'completed',
      reward: 500,
      date: '2024-01-10'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com', 
      status: 'pending',
      reward: 500,
      date: '2024-01-12'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@example.com',
      status: 'completed',
      reward: 500,
      date: '2024-01-08'
    }
  ]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const handleSendEmail = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invitation Sent!",
      description: `Referral invitation sent to ${email}`,
    });
    setEmail('');
  };

  const shareViaWhatsApp = () => {
    const message = `Join LawyerConnect and get instant access to verified lawyers! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaTwitter = () => {
    const message = `Get expert legal advice from verified lawyers on LawyerConnect! ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferred}</p>
              <p className="text-sm text-muted-foreground">Total Referred</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{referralStats.successfulSignups}</p>
              <p className="text-sm text-muted-foreground">Successful Signups</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">₹{referralStats.totalEarned}</p>
              <p className="text-sm text-muted-foreground">Total Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">₹{referralStats.pendingEarnings}</p>
              <p className="text-sm text-muted-foreground">Pending Earnings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            Refer & Earn
          </CardTitle>
          <CardDescription>
            Earn ₹500 for every successful referral! Your friend gets ₹200 bonus too.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-medium mb-2">Your Referral Code</h4>
            <div className="flex items-center space-x-2">
              <code className="bg-white px-3 py-2 rounded border flex-1">{referralCode}</code>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Share Your Referral Link</h4>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                value={referralLink}
                readOnly
                className="bg-muted"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={shareViaWhatsApp}>
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={shareViaTwitter}>
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" onClick={shareViaFacebook}>
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Send Direct Invitation</h4>
            <div className="flex space-x-2">
              <Input
                placeholder="friend@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Referral History
          </CardTitle>
          <CardDescription>Track your referral progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralHistory.map((referral, index) => (
              <div key={referral.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">{referral.name}</h5>
                    <p className="text-sm text-muted-foreground">{referral.email}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                      {referral.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">₹{referral.reward}</p>
                    <p className="text-xs text-muted-foreground">{referral.date}</p>
                  </div>
                </div>
                {index < referralHistory.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReferral;
