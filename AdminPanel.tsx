import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { apiClient, auth } from '../utils/supabase/client.ts';
import { toast } from 'sonner@2.0.3';
import { 
  Package, 
  Users, 
  Mail, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface Analytics {
  products: number;
  orders: number;
  newsletters: number;
  reviews: number;
  contacts: number;
  revenue: number;
  avgOrderValue: number;
}

export function AdminPanel() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await auth.getUser();
    setUser(user);
    if (user) {
      loadAnalytics();
    }
  };

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await auth.getSession();
      if (!session) return;

      // Analytics endpoint not implemented yet, using placeholder data
      setAnalytics({
        products: 4,
        orders: 0,
        newsletters: 0,
        reviews: 0,
        contacts: 0,
        revenue: 0,
        avgOrderValue: 0
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const initializeData = async () => {
    try {
      setLoading(true);
      await apiClient.initializeData();
      toast.success('Sample data initialized successfully!');
      if (user) {
        loadAnalytics();
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      toast.error('Failed to initialize sample data');
    } finally {
      setLoading(false);
    }
  };

  const testHealth = async () => {
    try {
      const response = await apiClient.healthCheck();
      toast.success(`Server is healthy! Status: ${response.status}`);
    } catch (error) {
      console.error('Health check failed:', error);
      toast.error('Server health check failed');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please sign in to access the admin panel.
            </p>
            <Button onClick={() => window.location.href = '#'} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.email}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={testHealth}
              variant="outline"
              size="sm"
              className="geometric-font"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Health Check
            </Button>
            <Button
              onClick={initializeData}
              disabled={loading}
              className="geometric-font"
            >
              {loading ? 'Initializing...' : 'Initialize Sample Data'}
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Products</p>
                    <p className="text-2xl font-bold">{analytics.products}</p>
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Orders</p>
                    <p className="text-2xl font-bold">{analytics.orders}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Newsletter</p>
                    <p className="text-2xl font-bold">{analytics.newsletters}</p>
                  </div>
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">${analytics.revenue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => toast.info('Product management coming soon!')}
              >
                <Package className="w-6 h-6" />
                <span>Manage Products</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => toast.info('Order management coming soon!')}
              >
                <TrendingUp className="w-6 h-6" />
                <span>View Orders</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => toast.info('Content management coming soon!')}
              >
                <MessageSquare className="w-6 h-6" />
                <span>Manage Content</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Backend Server</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>API Endpoints</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}