
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Languages, Search, Filter } from 'lucide-react';

const CustomerDashboard = () => {
  const [searchFilters, setSearchFilters] = useState({
    problemType: '',
    language: '',
    location: '',
    experience: '',
    specialization: ''
  });

  // Mock lawyer data
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
      available: true
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
      available: false
    }
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', searchFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Find Your Legal Advisor</h1>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Wallet Balance: ₹500</span>
            <Button variant="outline">Recharge Wallet</Button>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Find Lawyers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4 mb-4">
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

        {/* Lawyer Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
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

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    disabled={!lawyer.available}
                  >
                    Book Consultation
                  </Button>
                  <Button size="sm" className="flex-1">
                    Book Case
                  </Button>
                </div>

                {!lawyer.available && (
                  <p className="text-sm text-muted-foreground text-center">Currently unavailable</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
