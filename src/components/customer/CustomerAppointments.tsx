
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Video, Phone, User, MapPin } from 'lucide-react';

const CustomerAppointments = () => {
  const { toast } = useToast();
  const [appointments] = useState([
    {
      id: 1,
      lawyer: {
        name: 'Adv. Priya Sharma',
        image: '/placeholder.svg',
        specialization: 'Criminal Law'
      },
      type: 'consultation',
      date: '2024-01-16',
      time: '2:00 PM - 3:00 PM',
      status: 'confirmed',
      mode: 'video',
      fee: 250,
      description: 'Criminal case consultation regarding theft charges'
    },
    {
      id: 2,
      lawyer: {
        name: 'Adv. Rajesh Kumar',
        image: '/placeholder.svg',
        specialization: 'Corporate Law'
      },
      type: 'case_discussion',
      date: '2024-01-18',
      time: '10:00 AM - 11:30 AM',
      status: 'pending',
      mode: 'phone',
      fee: 500,
      description: 'Business contract review and legal advice'
    },
    {
      id: 3,
      lawyer: {
        name: 'Adv. Meera Gupta',
        image: '/placeholder.svg',
        specialization: 'Family Law'
      },
      type: 'consultation',
      date: '2024-01-12',
      time: '4:00 PM - 4:30 PM',
      status: 'completed',
      mode: 'video',
      fee: 200,
      description: 'Divorce proceedings consultation'
    }
  ]);

  const handleJoinCall = (appointmentId: number) => {
    toast({
      title: "Joining Call",
      description: "Connecting you to the consultation...",
    });
  };

  const handleReschedule = (appointmentId: number) => {
    toast({
      title: "Reschedule Request",
      description: "Reschedule request sent to lawyer. You'll be notified once confirmed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Your Appointments
          </CardTitle>
          <CardDescription>Manage your legal consultations and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {appointments.map((appointment, index) => (
              <div key={appointment.id}>
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={appointment.lawyer.image} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{appointment.lawyer.name}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.lawyer.specialization}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointment.mode === 'video' ? 
                          <Video className="h-4 w-4 text-muted-foreground" /> : 
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        }
                        <span className="capitalize">{appointment.mode}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">₹{appointment.fee}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {appointment.description}
                    </p>

                    <div className="flex space-x-2">
                      {appointment.status === 'confirmed' && (
                        <Button size="sm" onClick={() => handleJoinCall(appointment.id)}>
                          {appointment.mode === 'video' ? 
                            <><Video className="h-4 w-4 mr-2" />Join Video Call</> :
                            <><Phone className="h-4 w-4 mr-2" />Join Call</>
                          }
                        </Button>
                      )}
                      {appointment.status !== 'completed' && (
                        <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {index < appointments.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAppointments;
