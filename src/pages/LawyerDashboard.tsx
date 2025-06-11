
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText, Clock, Plus, Settings, LogOut } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const LawyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVerified, setIsVerified] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', title: 'Dashboard', icon: Users },
    { id: 'cases', title: 'My Cases', icon: FileText },
    { id: 'appointments', title: 'Manage Appointments', icon: Calendar },
    { id: 'settings', title: 'Settings', icon: Settings },
  ];

  const stats = {
    activeConsultations: 3,
    pendingConsultations: 5,
    activeCases: 12,
    pendingCases: 8
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Account Under Verification</CardTitle>
            <CardDescription>
              Your details are being verified in the next 24 hours. Please wait and complete your onboarding.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              We are reviewing your credentials and will notify you once approved.
            </p>
            <Button onClick={() => setIsVerified(true)} variant="outline">
              Complete Onboarding (Demo)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Lawyer Portal</SidebarGroupLabel>
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
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <header className="bg-background border-b shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'cases' && 'My Cases'}
                  {activeTab === 'appointments' && 'Manage Appointments'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
              </div>
              <Badge variant="secondary">Verified Lawyer</Badge>
            </div>
          </header>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Active Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeConsultations}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pending Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.pendingConsultations}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeCases}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.pendingCases}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Calendar View */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Consultation - Mr. Amit Kumar</p>
                          <p className="text-sm text-muted-foreground">Criminal Law Query</p>
                        </div>
                        <Badge>10:00 AM</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Case Review - Property Dispute</p>
                          <p className="text-sm text-muted-foreground">Mrs. Priya Sharma</p>
                        </div>
                        <Badge variant="outline">2:00 PM</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Case Management</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Case
                  </Button>
                </div>

                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Property Dispute Case</CardTitle>
                          <CardDescription>Land ownership conflict</CardDescription>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Client:</span> Mr. Rajesh Kumar
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> 6 months
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> In Progress
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Criminal Defense</CardTitle>
                          <CardDescription>Theft charges defense</CardDescription>
                        </div>
                        <Badge variant="secondary">Won</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Client:</span> Ms. Anita Singh
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> 3 months
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> Completed
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Appointment Requests</h2>
                
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Consultation Request</CardTitle>
                          <CardDescription>Criminal law consultation</CardDescription>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Client:</span> Mr. Vikash Gupta
                          </div>
                          <div>
                            <span className="font-medium">Requested Time:</span> Tomorrow 3:00 PM
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Need consultation regarding false criminal charges filed against me.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm">Accept</Button>
                          <Button size="sm" variant="outline">Decline</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Case Booking Request</CardTitle>
                          <CardDescription>Family law case</CardDescription>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Client:</span> Mrs. Sunita Devi
                          </div>
                          <div>
                            <span className="font-medium">Case Type:</span> Divorce proceedings
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Need legal representation for divorce case with child custody issues.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm">Accept & Quote</Button>
                          <Button size="sm" variant="outline">Decline</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Update Your Information</CardTitle>
                    <CardDescription>Keep your profile information up to date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Settings panel would go here...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LawyerDashboard;
