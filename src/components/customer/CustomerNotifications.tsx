
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, Check, CheckCheck, User, Calendar, FileText } from 'lucide-react';

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'consultation_accepted',
      title: 'Consultation Request Accepted',
      message: 'Adv. Priya Sharma has accepted your consultation request for Criminal Law',
      time: '2 hours ago',
      read: false,
      icon: User
    },
    {
      id: 2,
      type: 'appointment_reminder',
      title: 'Upcoming Appointment',
      message: 'You have a consultation with Adv. Rajesh Kumar tomorrow at 2:00 PM',
      time: '1 day ago',
      read: false,
      icon: Calendar
    },
    {
      id: 3,
      type: 'case_update',
      title: 'Case Status Updated',
      message: 'Your property dispute case has been updated with new documents',
      time: '3 days ago',
      read: true,
      icon: FileText
    },
    {
      id: 4,
      type: 'payment_success',
      title: 'Payment Successful',
      message: 'Your wallet has been recharged with ₹1000',
      time: '1 week ago',
      read: true,
      icon: Bell
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount} unread</Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
          <CardDescription>Stay updated with your legal matters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                  notification.read ? 'bg-background' : 'bg-muted/50'
                }`}>
                  <div className={`p-2 rounded-full ${
                    notification.read ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    <notification.icon className={`h-4 w-4 ${
                      notification.read ? 'text-muted-foreground' : 'text-primary'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${
                      notification.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerNotifications;
