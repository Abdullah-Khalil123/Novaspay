import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../custom/BreadCrumbs';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="mb-2 h-14 flex items-center">
      <div className="flex items-center gap-2">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Go back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Breadcrumbs */}
        {/*
         <nav className="h-full flex items-center text-sm text-muted-foreground">
          <span className="cursor-pointer hover:underline">Home</span>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="cursor-pointer hover:underline">Dashboard</span>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground font-medium">Settings</span>
        </nav> */}

        <div className="flex-1 flex items-center">
          <CustomBreadcrumbs />
        </div>
      </div>
    </header>
  );
}
