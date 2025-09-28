import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[400px] text-center shadow-lg">
        <CardHeader>
          <CardTitle>404</CardTitle>
          <CardDescription>
            Oops! The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-x-4">
          <Button onClick={() => navigate(-1)} className="cursor-pointer">
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/admin')}
            className="cursor-pointer"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
