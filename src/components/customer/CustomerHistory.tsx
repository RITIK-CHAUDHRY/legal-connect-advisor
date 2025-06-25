
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { History, Search, Calendar, FileText, Phone, Video } from 'lucide-react';

const CustomerHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const history = [
    {
      id: 1,
      type: 'consultation',
      title: 'Criminal Law Consultation',
      lawyer: 'Adv. Priya Sharma',
      date: '2024-01-14',
      duration: '45 min',
      cost: 250,
      status: 'completed',
      mode: 'video'
    },
    {
      id: 2,
      type: 'case',
      title: 'Property Dispute Filed',
      lawyer: 'Adv. Rajesh Kumar',
      date: '2024-01-10',
      cost: 5000,
      status: 'active',
      mode: 'in-person'
    },
    {
      id: 3,
      type: 'consultation',
      title: 'Family Law Consultation',
      lawyer: 'Adv. Meera Gupta',
      date: '2024-01-08',
      duration: '30 min',
      cost: 200,
      status: 'completed',
      mode: 'phone'
    },
    {
      id: 4,
      type: 'document',
      title: 'Legal Document Review',
      lawyer: 'Adv. Suresh Patel',
      date: '2024-01-05',
      cost: 150,
      status: 'completed',
      mode: 'online'
    },
    {
      id: 5,
      type: 'case',
      title: 'Employment Case Completed',
      lawyer: 'Adv. Priya Sharma',
      date: '2023-12-20',
      cost: 8000,
      status: 'completed',
      mode: 'in-person'
    }
  ];

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.lawyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return Phone;
      case 'case': return FileText;
      case 'document': return FileText;
      default: return Calendar;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return Video;
      case 'phone': return Phone;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSpent = history.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">₹{totalSpent}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{history.filter(h => h.type === 'consultation').length}</p>
              <p className="text-sm text-muted-foreground">Consultations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{history.filter(h => h.type === 'case').length}</p>
              <p className="text-sm text-muted-foreground">Cases</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Activity History
          </CardTitle>
          <CardDescription>Your complete legal service history</CardDescription>
          
          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="consultation">Consultations</SelectItem>
                <SelectItem value="case">Cases</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              const ModeIcon = getModeIcon(item.mode);
              
              return (
                <div key={item.id}>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-muted rounded-full">
                      <TypeIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <span className="text-sm font-medium">₹{item.cost}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{item.lawyer}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                        {item.duration && (
                          <>
                            <span>•</span>
                            <span>{item.duration}</span>
                          </>
                        )}
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <ModeIcon className="h-3 w-3" />
                          <span className="capitalize">{item.mode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < filteredHistory.length - 1 && <Separator className="mt-4" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerHistory;
