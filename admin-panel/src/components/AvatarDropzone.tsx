import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function AvatarDropzone({
  initialAvatar,
  userInitials,
}: {
  initialAvatar: string;
  userInitials: string;
}) {
  const [preview, setPreview] = useState<string | null>(initialAvatar);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        toast.success('Avatar ready to upload!');
        // Optional: send file to backend here
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center gap-4 w-full cursor-pointer"
    >
      <input {...getInputProps()} />
      <Avatar
        className={`h-24 w-24 border-2 ${
          isDragActive ? 'border-blue-500' : 'border-muted'
        }`}
      >
        <AvatarImage src={preview ?? undefined} />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
      <Button variant="outline" className="w-full">
        {isDragActive ? 'Drop to upload' : 'Drag & drop or click to change'}
      </Button>
    </div>
  );
}
