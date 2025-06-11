
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Scale, Trash2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <Button variant="outline">Sign Out</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingLawyers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified Lawyers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedLawyers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length + verifiedLawyers.length + pendingLawyers.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Lawyers</TabsTrigger>
            <TabsTrigger value="lawyers">Verified Lawyers</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  Lawyer Verification Requests
                </CardTitle>
                <CardDescription>
                  Review and approve lawyer registration requests
                </CardDescription>
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
                    {pendingLawyers.map((lawyer) => (
                      <TableRow key={lawyer.id}>
                        <TableCell className="font-medium">{lawyer.name}</TableCell>
                        <TableCell>{lawyer.email}</TableCell>
                        <TableCell>{lawyer.enrollmentNumber}</TableCell>
                        <TableCell>{lawyer.specialization}</TableCell>
                        <TableCell>{lawyer.experience} years</TableCell>
                        <TableCell>{lawyer.city}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleVerifyLawyer(lawyer.id, 'approve')}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleVerifyLawyer(lawyer.id, 'reject')}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {pendingLawyers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending verification requests
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lawyers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Verified Lawyers
                </CardTitle>
                <CardDescription>
                  Manage verified lawyer accounts
                </CardDescription>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiedLawyers.map((lawyer) => (
                      <TableRow key={lawyer.id}>
                        <TableCell className="font-medium">{lawyer.name}</TableCell>
                        <TableCell>{lawyer.email}</TableCell>
                        <TableCell>{lawyer.enrollmentNumber}</TableCell>
                        <TableCell>{lawyer.specialization}</TableCell>
                        <TableCell>{lawyer.experience} years</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Verified</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(lawyer.id, 'lawyer')}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Customer Accounts
                </CardTitle>
                <CardDescription>
                  Manage customer accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.city}</TableCell>
                        <TableCell>{customer.joinDate}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(customer.id, 'customer')}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
