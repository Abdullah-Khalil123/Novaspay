import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

export function TinyMCEEditor({
  control,
  name,
  placeholder,
}: {
  control: any;
  name: string;
  placeholder?: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={value}
          onEditorChange={onChange}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic underline forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            placeholder,
          }}
        />
      )}
    />
  );
}
