import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ImageUploadProps = {
  label: string;
  name: string;
  register: any;
  error?: string;
  setValue: (value: File | null) => void;
  defaultImage?: string; // optional existing image preview
};

const ImageUpload = ({
  label,
  name,
  register,
  error,
  setValue,
  defaultImage,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  // ✅ Sync when defaultImage changes (e.g., edit form)
  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(defaultImage || null);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="file"
        {...register(name)}
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview && (
        <img
          src={
            typeof preview === 'string' && preview.startsWith('data:')
              ? preview // base64 string
              : typeof preview === 'string'
              ? import.meta.env.VITE_API_URL_PUBLIC + preview // server path string
              : undefined // fallback (avoid crash)
          }
          alt="Preview"
          className="mt-2 h-24 w-24 object-cover rounded-md border"
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default ImageUpload;
