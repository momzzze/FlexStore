import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useEffect } from 'react';

const mockClients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Emily Johnson',
    email: 'emily@example.com',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'William Davis',
    email: 'william@example.com',
    status: 'Active',
  },
];

export default function ClientDetailsPage() {
  const { id } = useParams();
  const client = mockClients.find((c) => c.id === Number(id));
  const { setPaths } = useBreadcrumb();

  useEffect(() => {
    if (client) {
      setPaths([
        { label: 'Home', href: '/' },
        { label: 'Clients', href: '/clients' },
        { label: client.name },
      ]);
    }
  }, [client, setPaths]);
  if (!client) return <div className="p-6 text-lg">Client not found.</div>;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Client: {client.name}</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>Email:</strong> {client.email}
              </p>
              <p>
                <strong>Status:</strong> {client.status}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="p-4">
              <p>More detailed client data goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="p-4">
              <p>Recent activity and history could go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
