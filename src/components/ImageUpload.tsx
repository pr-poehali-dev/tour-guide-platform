import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const UPLOAD_API_URL = 'https://functions.poehali.dev/24ac43d5-9aa8-4cc8-a478-eb18fd596c5a';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const ImageUpload = ({ value, onChange, folder = 'images', label = 'Изображение' }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 5 МБ',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        const response = await fetch(UPLOAD_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64String,
            folder
          })
        });

        if (!response.ok) {
          throw new Error('Ошибка загрузки');
        }

        const data = await response.json();
        setPreview(data.url);
        onChange(data.url);

        toast({
          title: 'Успешно',
          description: 'Изображение загружено'
        });
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить изображение',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="URL изображения"
            value={preview}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Icon name="Loader2" className="animate-spin mr-2" size={16} />
            ) : (
              <Icon name="Upload" className="mr-2" size={16} />
            )}
            {uploading ? 'Загрузка...' : 'Загрузить'}
          </Button>
        </div>
      </div>

      {preview && (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-[#F8F8F8]">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={() => setPreview('')}
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview('');
              onChange('');
            }}
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
