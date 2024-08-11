import Image from 'next/image';
import React, { ChangeEvent } from 'react';

interface ImageUploaderProps {
    image: string | null;
    setImage: (image: string | null) => void;
    setFile: (file: File | null) => void;
}

export default function ImageUploader({ image, setImage, setFile }: ImageUploaderProps) {
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImage(imageUrl);
            setFile(selectedFile);
        }
    };

    const handleRemoveImage = () => {
        if (image) {
            URL.revokeObjectURL(image);
        }
        setImage(null);
        setFile(null);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {image && (
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src={image}
                        alt="Selected"
                        className="w-24 h-24 object-cover rounded-lg"
                        width={50} height={50}
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
}

