import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '../ui/tabs';
import { Controller, type Control } from 'react-hook-form';
import { supportedLanguages } from '@/utils/languages';
import { Button } from '../ui/button';
import { translate } from '@/actions/translate';
import { toast } from 'sonner';
import { useRef, useState } from 'react';
import { Loader2 as Loader } from 'lucide-react';
import { TinyMCEEditor } from './TiptapEditor';

interface MultiLanguageFieldProps {
  control: Control<any>;
  fieldName?: string;
  label?: string;
  type?: 'input' | 'textarea';
}

const MultiLanguageField = ({
  control,
  fieldName = 'name',
  label = 'Name',
  type = 'input',
}: MultiLanguageFieldProps) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const onChangeMapRef = useRef<Record<string, any>>({});

  const handleTranslate = async (fieldValue: string) => {
    setIsTranslating(true);
    try {
      if (!fieldValue) return;
      const result = await translate(fieldValue);

      Object.entries(result.data).forEach(([lang, text]: any) => {
        const handler = onChangeMapRef.current[lang];
        if (handler) {
          handler(text);
        }
      });
      toast.success('Translation successful');
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">{label}</Label>
      <Tabs className="w-full" defaultValue={supportedLanguages[0].code}>
        {/* Tabs + Translate */}
        <div className="flex items-center justify-between">
          <TabsList className="flex">
            {supportedLanguages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code}>
                {lang.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Controller
            control={control}
            name={`${fieldName}.${supportedLanguages[0].code}`}
            render={({ field }) => (
              <Button
                disabled={isTranslating}
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  field.value == ''
                    ? toast.error('Please enter text to translate')
                    : handleTranslate(field.value);
                }}
              >
                <Loader
                  className={`animate-spin ${
                    isTranslating ? 'block' : 'hidden'
                  }`}
                />
                Translate
              </Button>
            )}
          />
        </div>

        {supportedLanguages.map((lang) => (
          <TabsContent
            forceMount
            key={lang.code}
            value={lang.code}
            className="space-y-2 mt-4 hidden data-[state=active]:block"
          >
            <Controller
              control={control}
              name={`${fieldName}.${lang.code}`}
              render={({ field }) => {
                onChangeMapRef.current[lang.code] = field.onChange;
                return type === 'textarea' ? (
                  <TinyMCEEditor
                    control={control}
                    name={`${fieldName}.${lang.code}`}
                    placeholder={`Enter ${label.toLowerCase()} in ${
                      lang.label
                    }`}
                  />
                ) : (
                  <Input
                    placeholder={`Enter ${label.toLowerCase()} in ${
                      lang.label
                    }`}
                    {...field}
                  />
                );
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MultiLanguageField;
