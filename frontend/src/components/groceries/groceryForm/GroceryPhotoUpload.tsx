import { ImagePlus, Upload, X } from "lucide-react";
import { useState } from "react";

function GroceryPhotoUpload() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (file: File) => {
        setSelectedImage(file);

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(null);
        setError(null);
    };

    const validateImage = (file: File): string | null => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            return "Please upload a JPEG, PNG, or WEBP image.";
        }

        const maxSize = 10 * 1024 * 1024;

        if (file.size > maxSize) {
            return "Image size must be smaller than 10 MB.";
        }

        return null;
    };

    return (
        <div className="grocery-photo-upload">

            {!selectedImage ? (
                <label className="photo-upload-area">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) {
                                return;
                            }

                            const validationError = validateImage(file);

                            if (validationError) {
                                setError(validationError);
                                return;
                            }

                            setError(null);
                            handleImageChange(file);
                        }}
                    />

                    <div className="photo-upload-icon">
                        <ImagePlus size={28} />
                    </div>

                    <h3>Upload a grocery photo</h3>

                    <p>Take a photo of your groceries and let FreshTrack identify the items for you.</p>

                    {error && (
                        <span className="photo-upload-error">
                            {error}
                        </span>
                    )}

                    <span className="photo-upload-button">
                        <Upload size={16} />
                        Choose Photo
                    </span>

                    <span className="photo-upload-hint">JPG, PNG or WEBP (max 10MB)</span>
                </label>
            ) : (
                <div className="photo-preview">

                    <div className="photo-preview-image">
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Selected grocery"
                            />
                        )}
                    </div>

                    <div className="photo-preview-info">
                        <p>{selectedImage.name}</p>

                        <button
                            type="button"
                            className="remove-photo-btn"
                            onClick={handleRemoveImage}
                        >
                            <X size={16} />
                            Remove Photo
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}

export default GroceryPhotoUpload;