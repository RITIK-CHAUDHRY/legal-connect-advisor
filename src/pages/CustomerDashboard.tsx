import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Languages, Search, Filter, Bell, Moon, Sun, User, Wallet, History, Users as Refer, Settings, LogOut } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';
import CustomerProfile from '@/components/customer/CustomerProfile';
import CustomerWallet from '@/components/customer/CustomerWallet';
import CustomerNotifications from '@/components/customer/CustomerNotifications';
import CustomerAppointments from '@/components/customer/CustomerAppointments';
import CustomerCases from '@/components/customer/CustomerCases';
import CustomerSettings from '@/components/CustomerSettings';
import CustomerHistory from '@/components/customer/CustomerHistory';
import CustomerReferral from '@/components/customer/CustomerReferral';

const CustomerDashboard = () => {
  const [searchFilters, setSearchFilters] = useState({
    problemType: '',
    language: '',
    location: '',
    experience: '',
    lawyerName: ''
  });
  const [showLawyers, setShowLawyers] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { theme, toggleTheme } = useTheme();

  const sidebarItems = [
    { id: 'dashboard', title: 'Find Lawyers', icon: Search },
    { id: 'profile', title: 'Profile', icon: User },
    { id: 'wallet', title: 'Wallet Money', icon: Wallet },
    { id: 'notifications', title: 'Notifications', icon: Bell },
    { id: 'appointments', title: 'Your Appointments', icon: Clock },
    { id: 'cases', title: 'Your Cases', icon: Filter },
    { id: 'settings', title: 'Settings', icon: Settings },
    { id: 'history', title: 'History', icon: History },
    { id: 'refer', title: 'Refer a Friend', icon: Refer },
  ];

  // Mock lawyer data with availability status
  const lawyers = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      experience: 8,
      specialization: "Criminal Law",
      enrollmentNumber: "DL/12345/2015",
      location: "New Delhi",
      conversationLanguage: "Hindi, English",
      courtLanguage: "Hindi",
      consultationFee: 50,
      rating: 4.8,
      image: "/placeholder.svg",
      verified: true,
      available: true,
      availableTime: "9:00 AM - 6:00 PM",
      currentStatus: "available" // available, busy, offline
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      experience: 12,
      specialization: "Corporate Law",
      enrollmentNumber: "MH/67890/2011",
      location: "Mumbai",
      conversationLanguage: "English, Marathi",
      courtLanguage: "English",
      consultationFee: 75,
      rating: 4.9,
      image: "/placeholder.svg",
      verified: true,
      available: true,
      availableTime: "10:00 AM - 4:00 PM",
      currentStatus: "busy"
    }
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesName = !searchFilters.lawyerName || 
                       lawyer.name.toLowerCase().includes(searchFilters.lawyerName.toLowerCase());
    const matchesProblem = !searchFilters.problemType || 
                          lawyer.specialization.toLowerCase().includes(searchFilters.problemType.toLowerCase());
    const matchesLocation = !searchFilters.location || 
                           lawyer.location.toLowerCase().includes(searchFilters.location.toLowerCase());
    const matchesLanguage = !searchFilters.language ||
                           lawyer.conversationLanguage.toLowerCase().includes(searchFilters.language.toLowerCase());
    
    return matchesName && matchesProblem && matchesLocation && matchesLanguage;
  });

  const handleSearch = () => {
    console.log('Searching with filters:', searchFilters);
    setShowLawyers(true);
    toast.success(`Found ${filteredLawyers.length} lawyers matching your criteria.`);
  };

  const handleBookConsultation = (lawyerId: number, lawyerName: string) => {
    toast.success(`Consultation request sent to ${lawyerName}. You will be notified once accepted.`);
  };

  const handleBookCase = (lawyerId: number, lawyerName: string) => {
    toast.success(`Case booking request sent to ${lawyerName}. You will be notified once accepted.`);
  };

  const handleRechargeWallet = () => {
    toast.info('Redirecting to payment gateway...');
    setTimeout(() => {
      toast.success('Payment gateway integration would be implemented here.');
    }, 1000);
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'available':
        return <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Available" />;
      case 'busy':
        return <div className="w-3 h-3 bg-red-500 rounded-full" title="Busy" />;
      case 'offline':
        return <div className="w-3 h-3 bg-gray-400 rounded-full" title="Offline" />;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <CustomerProfile />;
      case 'wallet':
        return <CustomerWallet />;
      case 'notifications':
        return <CustomerNotifications />;
      case 'appointments':
        return <CustomerAppointments />;
      case 'cases':
        return <CustomerCases />;
      case 'settings':
        return <CustomerSettings />;
      case 'history':
        return <CustomerHistory />;
      case 'refer':
        return <CustomerReferral />;
      default:
        return (
          <div className="space-y-8">
            {/* Search Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Find Lawyers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-6 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Lawyer Name (Optional)</Label>
                    <Input 
                      placeholder="Search by name" 
                      value={searchFilters.lawyerName}
                      onChange={(e) => setSearchFilters({...searchFilters, lawyerName: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Problem Type</Label>
                    <Select value={searchFilters.problemType} onValueChange={(value) => setSearchFilters({...searchFilters, problemType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select problem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="criminal">Criminal Law</SelectItem>
                        <SelectItem value="civil">Civil Law</SelectItem>
                        <SelectItem value="corporate">Corporate Law</SelectItem>
                        <SelectItem value="family">Family Law</SelectItem>
                        <SelectItem value="property">Property Law</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={searchFilters.language} onValueChange={(value) => setSearchFilters({...searchFilters, language: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      placeholder="City/State" 
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Experience</Label>
                    <Select value={searchFilters.experience} onValueChange={(value) => setSearchFilters({...searchFilters, experience: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Min years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="15+">15+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button onClick={handleSearch} className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lawyer Results - Only show after search */}
            {showLawyers && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLawyers.map((lawyer) => (
                  <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <img src={lawyer.image} alt={lawyer.name} className="object-cover" />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{lawyer.name}</h3>
                            {lawyer.verified && <Badge variant="secondary">Verified</Badge>}
                            {getStatusIndicator(lawyer.currentStatus)}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{lawyer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Experience:</span> {lawyer.experience} years
                        </div>
                        <div>
                          <span className="font-medium">Specialization:</span> {lawyer.specialization}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Enrollment:</span> {lawyer.enrollmentNumber}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{lawyer.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Languages className="h-4 w-4" />
                        <span>{lawyer.conversationLanguage}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>₹{lawyer.consultationFee}/min</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Available: {lawyer.availableTime}</span>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          disabled={lawyer.currentStatus === 'busy' || lawyer.currentStatus === 'offline'}
                          onClick={() => handleBookConsultation(lawyer.id, lawyer.name)}
                        >
                          Book Consultation
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleBookCase(lawyer.id, lawyer.name)}
                        >
                          Book Case
                        </Button>
                      </div>

                      {lawyer.currentStatus === 'busy' && (
                        <p className="text-sm text-red-600 text-center">Currently on call</p>
                      )}
                      {lawyer.currentStatus === 'offline' && (
                        <p className="text-sm text-gray-600 text-center">Currently offline</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!showLawyers && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Search for Lawyers</h3>
                  <p className="text-muted-foreground">
                    Use the filters above to find lawyers that match your requirements.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>LawyerConnect</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab(item.id)}
                        className={activeTab === item.id ? 'bg-primary text-primary-foreground' : ''}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-auto p-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          {/* Header */}
          <header className="bg-background border-b shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-foreground">
                  {activeTab === 'dashboard' && 'Find Your Legal Advisor'}
                  {activeTab === 'profile' && 'Profile'}
                  {activeTab === 'wallet' && 'Wallet'}
                  {activeTab === 'notifications' && 'Notifications'}
                  {activeTab === 'appointments' && 'Your Appointments'}
                  {activeTab === 'cases' && 'Your Cases'}
                  {activeTab === 'settings' && 'Settings'}
                  {activeTab === 'history' && 'History'}
                  {activeTab === 'refer' && 'Refer a Friend'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">Wallet Balance: ₹500</span>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <Button variant="outline" onClick={handleRechargeWallet}>Recharge Wallet</Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
