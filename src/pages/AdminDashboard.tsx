import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Shield, Users, Scale, Trash2, Check, X, Search, Ban, BarChart3, UserCheck, UserX, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { useTheme } from '@/contexts/ThemeContext';

const AdminDashboard = () => {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [pendingLawyers, setPendingLawyers] = useState([
    {
      id: 1,
      name: "Adv. Priya Sharma",
      email: "priya.sharma@email.com",
      enrollmentNumber: "DL/12345/2015",
      specialization: "Criminal Law",
      experience: 8,
      city: "New Delhi",
      status: "pending"
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar", 
      email: "rajesh.kumar@email.com",
      enrollmentNumber: "MH/67890/2011",
      specialization: "Corporate Law",
      experience: 12,
      city: "Mumbai",
      status: "pending"
    }
  ]);

  const [customers] = useState([
    {
      id: 1,
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      city: "Delhi",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Sunita Devi",
      email: "sunita.devi@email.com", 
      city: "Mumbai",
      joinDate: "2024-02-01"
    }
  ]);

  const [verifiedLawyers] = useState([
    {
      id: 3,
      name: "Adv. Mohan Singh",
      email: "mohan.singh@email.com",
      enrollmentNumber: "UP/11111/2010",
      specialization: "Family Law",
      experience: 15,
      city: "Lucknow",
      status: "verified"
    }
  ]);

  const [appAnalytics] = useState({
    newLawyers: 45,
    newCustomers: 234,
    departedLawyers: 3,
    departedCustomers: 12,
    inactiveLawyers: 15,
    activeSessions: 87,
    totalCases: 1250,
    resolvedCases: 980,
    pendingCases: 270,
    totalConsultations: 2340,
    avgConsultationTime: 45
  });

  const handleVerifyLawyer = (lawyerId: number, action: 'approve' | 'reject') => {
    setPendingLawyers(prev => prev.filter(lawyer => lawyer.id !== lawyerId));
    
    toast({
      title: action === 'approve' ? "Lawyer Approved" : "Lawyer Rejected",
      description: `The lawyer has been ${action === 'approve' ? 'verified and approved' : 'rejected'}.`,
    });
  };

  const handleDeleteUser = (userId: number, userType: 'customer' | 'lawyer') => {
    toast({
      title: "User Deleted",
      description: `${userType} has been removed from the platform.`,
      variant: "destructive"
    });
  };

  const handleBanUser = (userId: number, userType: 'customer' | 'lawyer') => {
    toast({
      title: "User Banned",
      description: `${userType} has been permanently banned from the platform.`,
      variant: "destructive"
    });
  };

  const sidebarItems = [
    { title: "Dashboard", icon: BarChart3, view: "dashboard" },
    { title: "Pending Lawyers", icon: UserCheck, view: "pending" },
    { title: "Verified Lawyers", icon: Scale, view: "lawyers" },
    { title: "Customers", icon: Users, view: "customers" },
    { title: "Analytics", icon: TrendingUp, view: "analytics" }
  ];

  const filteredPendingLawyers = pendingLawyers
    .filter(lawyer => 
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVerifiedLawyers = verifiedLawyers.filter(lawyer =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DashboardCards = () => (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setActiveView('pending')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <UserCheck className="h-4 w-4 mr-2" />
            Pending Verifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingLawyers.length}</div>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setActiveView('lawyers')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Scale className="h-4 w-4 mr-2" />
            Verified Lawyers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{verifiedLawyers.length}</div>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setActiveView('customers')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Total Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customers.length}</div>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setActiveView('analytics')}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appAnalytics.activeSessions}</div>
        </CardContent>
      </Card>
    </div>
  );

  const AppSidebar = () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 p-2">
          <Shield className="h-8 w-8 text-primary" />
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 space-y-2">
          <Button onClick={toggleTheme} variant="outline" className="w-full">
            {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
          <Button variant="outline" className="w-full">Sign Out</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'pending':
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2" />
                    Pending Lawyer Verifications
                  </CardTitle>
                  <CardDescription>Review and approve lawyer registration requests</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search lawyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Enrollment Number</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendingLawyers.map((lawyer) => (
                    <TableRow key={lawyer.id}>
                      <TableCell className="font-medium">{lawyer.name}</TableCell>
                      <TableCell>{lawyer.email}</TableCell>
                      <TableCell>{lawyer.enrollmentNumber}</TableCell>
                      <TableCell>{lawyer.specialization}</TableCell>
                      <TableCell>{lawyer.experience} years</TableCell>
                      <TableCell>{lawyer.city}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleVerifyLawyer(lawyer.id, 'approve')}>
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleVerifyLawyer(lawyer.id, 'reject')}>
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      
      case 'lawyers':
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Scale className="h-5 w-5 mr-2" />
                    Verified Lawyers
                  </CardTitle>
                  <CardDescription>Manage verified lawyer accounts and view analytics</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search lawyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Cases Solved</TableHead>
                    <TableHead>Consultations</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVerifiedLawyers.map((lawyer) => (
                    <TableRow key={lawyer.id}>
                      <TableCell className="font-medium cursor-pointer text-blue-600 hover:underline">
                        {lawyer.name}
                      </TableCell>
                      <TableCell>{lawyer.specialization}</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>123</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="destructive" onClick={() => handleBanUser(lawyer.id, 'lawyer')}>
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'customers':
        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Customer Management
                  </CardTitle>
                  <CardDescription>Manage customer accounts</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.city}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="destructive" onClick={() => handleBanUser(customer.id, 'customer')}>
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Platform Analytics
                </CardTitle>
                <CardDescription>Overview of platform performance and user statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">New Arrivals</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">{appAnalytics.newLawyers} Lawyers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold">{appAnalytics.newCustomers} Customers</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Departures</p>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="font-semibold">{appAnalytics.departedLawyers} Lawyers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="font-semibold">{appAnalytics.departedCustomers} Customers</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">System Health</p>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{appAnalytics.inactiveLawyers} Inactive Lawyers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="font-semibold">{appAnalytics.activeSessions} Active Sessions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Case Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Cases</span>
                      <span className="font-semibold">{appAnalytics.totalCases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolved Cases</span>
                      <span className="font-semibold text-green-600">{appAnalytics.resolvedCases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Cases</span>
                      <span className="font-semibold text-yellow-600">{appAnalytics.pendingCases}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consultation Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Consultations</span>
                      <span className="font-semibold">{appAnalytics.totalConsultations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Duration</span>
                      <span className="font-semibold">{appAnalytics.avgConsultationTime} min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <DashboardCards />
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">• New lawyer registration: Adv. Priya Sharma</p>
                    <p className="text-sm">• Customer complaint resolved: Case #1234</p>
                    <p className="text-sm">• Payment gateway updated</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full" onClick={() => setActiveView('pending')}>
                      Review Pending Lawyers
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setActiveView('analytics')}>
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="bg-background border-b shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
