
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Wallet, CreditCard, History, Plus } from 'lucide-react';

const CustomerWallet = () => {
  const { toast } = useToast();
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [balance] = useState(500);

  const transactions = [
    { id: 1, type: 'credit', amount: 1000, description: 'Wallet Recharge', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'debit', amount: 250, description: 'Consultation - Adv. Priya Sharma', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'debit', amount: 300, description: 'Case Booking - Adv. Rajesh Kumar', date: '2024-01-12', status: 'completed' },
    { id: 4, type: 'credit', amount: 500, description: 'Wallet Recharge', date: '2024-01-10', status: 'completed' },
  ];

  const handleRecharge = () => {
    if (!rechargeAmount || parseInt(rechargeAmount) < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum recharge amount is ₹100",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Redirecting to Payment Gateway",
      description: `Recharging wallet with ₹${rechargeAmount}`,
    });

    // Simulate payment gateway redirect
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `₹${rechargeAmount} added to your wallet`,
      });
      setRechargeAmount('');
    }, 2000);
  };

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="h-5 w-5 mr-2" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">₹{balance}</p>
              <p className="text-sm text-muted-foreground mt-2">Available Balance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Recharge Wallet
            </CardTitle>
            <CardDescription>Add money to your wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Quick Select</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setRechargeAmount(amount.toString())}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleRecharge} className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Recharge Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Transaction History
          </CardTitle>
          <CardDescription>Your recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={transaction.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
                {index < transactions.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerWallet;
