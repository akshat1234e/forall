import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, TrendingUp, FileText, MessageSquare, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useAuth } from '../AuthProvider';
import { supabase } from '../../utils/supabase/client';
import { testimonialsApi, blogApi } from '../../utils/supabase/backend';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  created_at: string;
}

interface Order {
  id: string;
  user_email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  totalBlogs: number;
  totalTestimonials: number;
  activePages: number;
}

interface Testimonial {
  id: string;
  name: string;
  age?: number;
  location?: string;
  rating: number;
  text: string;
  image?: string;
  product?: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: string;
  category?: string;
  featured_image?: string;
  is_published: boolean;
  created_at: string;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    totalBlogs: 0,
    totalTestimonials: 0,
    activePages: 5
  });
  const [, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'blogs' | 'testimonials'>('overview');
  const [showAddForm, setShowAddForm] = useState<'blog' | 'testimonial' | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Use Promise.allSettled for better error handling
      const results = await Promise.allSettled([
        supabase.from('products').select('id, name, price, category, stock, status, created_at').order('created_at', { ascending: false }),
        supabase.from('orders').select('id, user_email, total, status, created_at').order('created_at', { ascending: false }),
        testimonialsApi.getAll(),
        blogApi.getAll()
      ]);

      // Handle each result safely
      const [productsResult, ordersResult, testimonialsResult, blogsResult] = results;

      if (productsResult.status === 'fulfilled' && productsResult.value.data) {
        setProducts(productsResult.value.data);
      }
      if (ordersResult.status === 'fulfilled' && ordersResult.value.data) {
        setOrders(ordersResult.value.data);
      }
      if (testimonialsResult.status === 'fulfilled') {
        setTestimonials(testimonialsResult.value || []);
      }
      if (blogsResult.status === 'fulfilled') {
        setBlogs(blogsResult.value || []);
      }

      // Calculate stats safely
      const totalRevenue = ordersResult.status === 'fulfilled' && ordersResult.value.data 
        ? ordersResult.value.data.reduce((sum: number, order: any) => sum + (order.total || 0), 0) 
        : 0;

      setStats({
        totalProducts: productsResult.status === 'fulfilled' ? (productsResult.value.data?.length || 0) : 0,
        totalOrders: ordersResult.status === 'fulfilled' ? (ordersResult.value.data?.length || 0) : 0,
        totalRevenue,
        activeUsers: 0,
        totalBlogs: blogsResult.status === 'fulfilled' ? (blogsResult.value?.length || 0) : 0,
        totalTestimonials: testimonialsResult.status === 'fulfilled' ? (testimonialsResult.value?.length || 0) : 0,
        activePages: 5
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set default stats on error
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        activeUsers: 0,
        totalBlogs: 0,
        totalTestimonials: 0,
        activePages: 5
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      // Validate status input to prevent injection
      const validStatuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];
      if (!validStatuses.includes(status as Order['status'])) {
        console.error('Invalid order status:', status);
        return;
      }
      
      // Validate ID format (UUID)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        console.error('Invalid order ID format:', id);
        return;
      }

      await supabase.from('orders').update({ status: status as Order['status'] }).eq('id', id);
      setOrders(orders.map(o => o.id === id ? { ...o, status: status as Order['status'] } : o));
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
      setBlogs(blogs.filter(b => b.id !== id));
      setStats(prev => ({ ...prev, totalBlogs: Math.max(0, prev.totalBlogs - 1) }));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await supabase.from('testimonials').delete().eq('id', id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      setStats(prev => ({ ...prev, totalTestimonials: Math.max(0, prev.totalTestimonials - 1) }));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        alert('Title is required');
        return;
      }
      if (!formData.author?.trim()) {
        alert('Author is required');
        return;
      }
      if (!formData.content?.trim()) {
        alert('Content is required');
        return;
      }

      const newBlog = await blogApi.create({
        title: formData.title.trim(),
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        content: formData.content.trim(),
        author: formData.author.trim(),
        excerpt: formData.excerpt?.trim(),
        category: formData.category?.trim(),
        featured_image: formData.featured_image?.trim()
      });
      
      if (newBlog) {
        setBlogs([newBlog, ...blogs]);
        setStats(prev => ({ ...prev, totalBlogs: prev.totalBlogs + 1 }));
        setShowAddForm(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      alert(error instanceof Error ? error.message : 'Failed to add blog post');
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.name?.trim()) {
        alert('Name is required');
        return;
      }
      if (!formData.text?.trim()) {
        alert('Testimonial text is required');
        return;
      }
      if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
        alert('Rating must be between 1 and 5');
        return;
      }

      const newTestimonial = await testimonialsApi.create({
        name: formData.name.trim(),
        age: formData.age ? parseInt(formData.age) : undefined,
        location: formData.location?.trim(),
        rating: parseInt(formData.rating),
        text: formData.text.trim(),
        image: formData.image?.trim(),
        product: formData.product?.trim()
      });
      
      if (newTestimonial) {
        setTestimonials([newTestimonial, ...testimonials]);
        setStats(prev => ({ ...prev, totalTestimonials: prev.totalTestimonials + 1 }));
        setShowAddForm(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert(error instanceof Error ? error.message : 'Failed to add testimonial');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">Please log in to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your ForAll Herbals store</p>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'blogs', label: 'Blogs', icon: FileText },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Pages</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activePages}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBlogs}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTestimonials}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Products</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="p-4 font-medium">{product.name}</td>
                          <td className="p-4">{product.category}</td>
                          <td className="p-4">${product.price.toFixed(2)}</td>
                          <td className="p-4">{product.stock}</td>
                          <td className="p-4">
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Orders</h2>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Order ID</th>
                        <th className="text-left p-4">Customer</th>
                        <th className="text-left p-4">Total</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                          <td className="p-4">{order.user_email}</td>
                          <td className="p-4">${order.total.toFixed(2)}</td>
                          <td className="p-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="px-2 py-1 border rounded"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Blog Posts</h2>
              <Button onClick={() => setShowAddForm('blog')}>
                <Plus className="w-4 h-4 mr-2" />
                Add Blog Post
              </Button>
            </div>

            {showAddForm === 'blog' && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddBlog} className="space-y-4">
                    <Input
                      placeholder="Blog Title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Author"
                      value={formData.author || ''}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Category"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    />
                    <Input
                      placeholder="Featured Image URL"
                      value={formData.featured_image || ''}
                      onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
                    />
                    <Textarea
                      placeholder="Excerpt"
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    />
                    <Textarea
                      placeholder="Content (HTML allowed)"
                      value={formData.content || ''}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      rows={6}
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit">Add Blog</Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(null)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Author</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map(blog => (
                        <tr key={blog.id} className="border-b">
                          <td className="p-4 font-medium">{blog.title}</td>
                          <td className="p-4">{blog.author}</td>
                          <td className="p-4">{blog.category}</td>
                          <td className="p-4">
                            <Badge variant={blog.is_published ? 'default' : 'secondary'}>
                              {blog.is_published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td className="p-4">{new Date(blog.created_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteBlog(blog.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Testimonials</h2>
              <Button onClick={() => setShowAddForm('testimonial')}>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            {showAddForm === 'testimonial' && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Testimonial</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddTestimonial} className="space-y-4">
                    <Input
                      placeholder="Customer Name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Age"
                        type="number"
                        value={formData.age || ''}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                      />
                      <Input
                        placeholder="Rating (1-5)"
                        type="number"
                        min="1"
                        max="5"
                        value={formData.rating || ''}
                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                        required
                      />
                    </div>
                    <Input
                      placeholder="Location"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                    <Input
                      placeholder="Product Used"
                      value={formData.product || ''}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                    />
                    <Input
                      placeholder="Image URL"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                    <Textarea
                      placeholder="Testimonial Text"
                      value={formData.text || ''}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                      rows={4}
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit">Add Testimonial</Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(null)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Rating</th>
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Location</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map(testimonial => (
                        <tr key={testimonial.id} className="border-b">
                          <td className="p-4 font-medium">{testimonial.name}</td>
                          <td className="p-4">{testimonial.rating}★</td>
                          <td className="p-4">{testimonial.product}</td>
                          <td className="p-4">{testimonial.location}</td>
                          <td className="p-4">{new Date(testimonial.created_at).toLocaleDateString()}</td>
                          <td className="p-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteTestimonial(testimonial.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}