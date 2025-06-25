
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { FileText, User, Calendar, Clock, Download, Upload, Eye } from 'lucide-react';

const CustomerCases = () => {
  const [cases] = useState([
    {
      id: 1,
      title: 'Property Dispute Case',
      caseNumber: 'PROP/2024/001',
      lawyer: {
        name: 'Adv. Rajesh Kumar',
        image: '/placeholder.svg'
      },
      status: 'active',
      progress: 65,
      startDate: '2024-01-10',
      nextHearing: '2024-02-15',
      description: 'Boundary dispute with neighbor regarding property line',
      documents: 8,
      estimatedDuration: '6-8 months'
    },
    {
      id: 2,
      title: 'Employment Termination Case',
      caseNumber: 'EMP/2024/002',
      lawyer: {
        name: 'Adv. Priya Sharma',
        image: '/placeholder.svg'
      },
      status: 'review',
      progress: 30,
      startDate: '2024-01-05',
      nextHearing: '2024-01-25',
      description: 'Wrongful termination claim against previous employer',
      documents: 12,
      estimatedDuration: '4-6 months'
    },
    {
      id: 3,
      title: 'Contract Breach Case',
      caseNumber: 'CONT/2023/045',
      lawyer: {
        name: 'Adv. Meera Gupta',
        image: '/placeholder.svg'
      },
      status: 'completed',
      progress: 100,
      startDate: '2023-08-15',
      completedDate: '2024-01-10',
      description: 'Breach of service contract with vendor',
      documents: 15,
      outcome: 'Settled in favor of client'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Your Cases
          </CardTitle>
          <CardDescription>Track the progress of your legal cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cases.map((caseItem, index) => (
              <div key={caseItem.id}>
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{caseItem.title}</h4>
                          <p className="text-sm text-muted-foreground">Case No: {caseItem.caseNumber}</p>
                        </div>
                        <Badge className={getStatusColor(caseItem.status)}>
                          {caseItem.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={caseItem.lawyer.image} />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{caseItem.lawyer.name}</span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {caseItem.description}
                      </p>

                      {caseItem.status !== 'completed' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{caseItem.progress}%</span>
                          </div>
                          <Progress value={caseItem.progress} className="h-2" />
                        </div>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Started</p>
                            <p>{caseItem.startDate}</p>
                          </div>
                        </div>
                        
                        {caseItem.nextHearing && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Next Hearing</p>
                              <p>{caseItem.nextHearing}</p>
                            </div>
                          </div>
                        )}

                        {caseItem.completedDate && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Completed</p>
                              <p>{caseItem.completedDate}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Documents</p>
                            <p>{caseItem.documents} files</p>
                          </div>
                        </div>

                        {caseItem.estimatedDuration && (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p>{caseItem.estimatedDuration}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {caseItem.outcome && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Outcome</p>
                          <p className="text-sm text-green-700">{caseItem.outcome}</p>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Documents
                        </Button>
                        {caseItem.status !== 'completed' && (
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Files
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < cases.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerCases;
