'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const onUpload = useCallback((result: any) => {
        if (result.info && result.info.secure_url) {
            onChange(result.info.secure_url);
        }
    }, [onChange]);

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && (
                    <div className="relative w-full h-[200px] rounded-xl overflow-hidden border border-white/10">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => onRemove(value)}
                                className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition shadow-lg"
                            >
                                <Trash className="h-4 w-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                )}
            </div>
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset="Buddha"
                options={{
                    maxFiles: 1
                }}
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={onClick}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 border-dashed rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 hover:border-amber-500/50 transition-all flex flex-col items-center justify-center gap-2"
                        >
                            <ImagePlus className="h-6 w-6" />
                            <span className="text-sm">{value ? 'Change Image' : 'Upload Image'}</span>
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload;
