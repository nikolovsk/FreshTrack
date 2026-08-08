import { ImagePlus, Sparkles, Upload, X } from "lucide-react";
import { useState } from "react";
import type { DetectedGrocery, GroceryFormData } from "../../../types/grocery.ts";
import DetectedGroceryList from "./DetectedGroceryList.tsx";
import { createInitialFormData } from "../../../utils/createInitialFormData.ts";
import type { Category } from "../../../types/category.ts";
import GroceryFormModal from "./GroceryFormModal.tsx";

type Props = {
    categories: Category[];
};

function GroceryPhotoUpload({ categories }: Props) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [analyzing, setAnalyzing] = useState(false);
    const [detectedGroceries, setDetectedGroceries] = useState<DetectedGrocery[]>([]);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    const [editingGrocery, setEditingGrocery] = useState<DetectedGrocery | null>(null);
    const [editFormData, setEditFormData] = useState<GroceryFormData>(createInitialFormData());
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

        setEditingGrocery(null);
        setEditingIndex(null);
        setEditFormData(createInitialFormData());
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

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setAnalyzing(true);
        setAnalysisComplete(false);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setDetectedGroceries([
            {
                name: "Milk",
                quantity: 1,
                categoryId: 5,
                price: "",
                purchaseDate: "",
                expirationDate: "",
            },
            {
                name: "Tomatoes",
                quantity: 5,
                categoryId: "",
                price: "",
                purchaseDate: "",
                expirationDate: "",
            },
        ]);

        setAnalyzing(false);
        setAnalysisComplete(true);
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

                    {!analysisComplete && (
                        <button
                            type="button"
                            className="analyze-photo-btn"
                            onClick={handleAnalyze}
                            disabled={analyzing}
                        >
                            <Sparkles size={16} />
                            <span>{analyzing ? "Analyzing your photo..." : "Analyze Photo"}</span>
                        </button>
                    )}

                    {analysisComplete && (
                        <DetectedGroceryList
                            groceries={detectedGroceries}
                            onRemove={(index) => {
                                setDetectedGroceries((prev) =>
                                    prev.filter((_, itemIndex) => itemIndex !== index)
                                );
                            }}
                            onEdit={(grocery, index) => {
                                setEditingGrocery(grocery);
                                setEditingIndex(index);

                                setEditFormData({
                                    name: grocery.name,
                                    quantity: grocery.quantity,
                                    price: grocery.price,
                                    purchaseDate: grocery.purchaseDate,
                                    expirationDate: grocery.expirationDate,
                                    categoryId: grocery.categoryId,
                                });
                            }}
                        />
                    )}

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

            <GroceryFormModal
                open={editingGrocery !== null}
                onClose={() => setEditingGrocery(null)}
                onSave={async (data) => {
                    if (editingIndex === null) {
                        return;
                    }

                    setDetectedGroceries((prev) =>
                        prev.map((grocery, index) =>
                            index === editingIndex
                                ? {
                                    name: data.name,
                                    quantity: data.quantity,
                                    price: data.price,
                                    purchaseDate: data.purchaseDate,
                                    expirationDate: data.expirationDate,
                                    categoryId: data.categoryId,
                                }
                                : grocery
                        )
                    );

                    setEditingGrocery(null);
                    setEditingIndex(null);
                }}
                categories={categories}
                grocery={undefined}
                formData={editFormData}
                setFormData={setEditFormData}
            />

        </div>
    );
}

export default GroceryPhotoUpload;