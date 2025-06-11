
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Scale, Upload } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [userType, setUserType] = useState<'customer' | 'lawyer'>('customer');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Auth submitted');
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {authMode === 'login' ? 'Welcome Back' : 'Join LawyerConnect'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              {/* Role Selection */}
              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">I am a:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Card 
                    className={`cursor-pointer transition-all ${userType === 'customer' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setUserType('customer')}
                  >
                    <CardContent className="p-4 text-center">
                      <User className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Customer</p>
                      <p className="text-sm text-muted-foreground">Seeking legal help</p>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${userType === 'lawyer' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setUserType('lawyer')}
                  >
                    <CardContent className="p-4 text-center">
                      <Scale className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Lawyer</p>
                      <p className="text-sm text-muted-foreground">Providing legal services</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Picture */}
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile preview" className="h-16 w-16 rounded-full mx-auto mb-2 object-cover" />
                      ) : (
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      )}
                      <p className="text-sm text-muted-foreground">Click to upload photo</p>
                    </label>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="First name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email address" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" type="tel" placeholder="Mobile number" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create password" required />
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Maharashtra</SelectItem>
                        <SelectItem value="bangalore">Karnataka</SelectItem>
                        <SelectItem value="chennai">Tamil Nadu</SelectItem>
                        <SelectItem value="kolkata">West Bengal</SelectItem>
                        <SelectItem value="hyderabad">Telangana</SelectItem>
                        <SelectItem value="pune">Maharashtra</SelectItem>
                        <SelectItem value="ahmedabad">Gujarat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" required />
                  </div>
                </div>

                {/* Lawyer-specific fields */}
                {userType === 'lawyer' && (
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium text-primary">Professional Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience (Years)</Label>
                        <Input id="experience" type="number" placeholder="Years" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="enrollment">Enrollment No.</Label>
                        <Input id="enrollment" placeholder="Bar Council No." required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="criminal">Criminal Law</SelectItem>
                          <SelectItem value="civil">Civil Law</SelectItem>
                          <SelectItem value="corporate">Corporate Law</SelectItem>
                          <SelectItem value="family">Family Law</SelectItem>
                          <SelectItem value="property">Property Law</SelectItem>
                          <SelectItem value="tax">Tax Law</SelectItem>
                          <SelectItem value="labour">Labour Law</SelectItem>
                          <SelectItem value="intellectual">Intellectual Property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consultationFee">Consultation Fee (₹/minute)</Label>
                      <Input id="consultationFee" type="number" placeholder="Fee per minute" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Conversation Language</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                            <SelectItem value="bengali">Bengali</SelectItem>
                            <SelectItem value="marathi">Marathi</SelectItem>
                            <SelectItem value="gujarati">Gujarati</SelectItem>
                            <SelectItem value="kannada">Kannada</SelectItem>
                            <SelectItem value="telugu">Telugu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Court Language</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="tamil">Tamil</SelectItem>
                            <SelectItem value="bengali">Bengali</SelectItem>
                            <SelectItem value="marathi">Marathi</SelectItem>
                            <SelectItem value="gujarati">Gujarati</SelectItem>
                            <SelectItem value="kannada">Kannada</SelectItem>
                            <SelectItem value="telugu">Telugu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
