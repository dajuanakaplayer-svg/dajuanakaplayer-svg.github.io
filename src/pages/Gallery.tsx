import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2, Upload, Trash2, X, Download } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { ImageLightbox } from "@/components/ImageLightbox";

export default function Gallery() {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: images, isLoading } = trpc.gallery.list.useQuery();
  const utils = trpc.useUtils();

  const uploadMutation = trpc.gallery.upload.useMutation({
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
      setUploadDialogOpen(false);
      resetUploadForm();
      utils.gallery.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully!");
      utils.gallery.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const importFromDiscordMutation = trpc.gallery.importFromDiscord.useMutation({
    onSuccess: (data) => {
      toast.success(`Successfully imported ${data.imported} images from Discord! (${data.skipped} skipped)`);
      utils.gallery.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Import failed: ${error.message}`);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, WebP, and GIF images are allowed");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !previewUrl) {
      toast.error("Please select an image");
      return;
    }

    uploadMutation.mutate({
      imageData: previewUrl,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      mimeType: selectedFile.type,
      fileSize: selectedFile.size,
      width: imageDimensions?.width,
      height: imageDimensions?.height,
    });
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setTitle("");
    setDescription("");
    setImageDimensions(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Community Gallery</h1>
          
          <div className="flex gap-3">
            {isAdmin && (
              <Button 
                variant="outline" 
                onClick={() => importFromDiscordMutation.mutate({ limit: 100 })}
                disabled={importFromDiscordMutation.isPending}
              >
                {importFromDiscordMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Import from Discord
                  </>
                )}
              </Button>
            )}
            
            {isAuthenticated && (
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Screenshot</DialogTitle>
                  <DialogDescription>
                    Share your builds and creations with the community
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file">Select Image</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Max file size: 10MB. Supported formats: JPEG, PNG, WebP, GIF
                    </p>
                  </div>

                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={resetUploadForm}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="title">Title (Optional)</Label>
                    <Input
                      id="title"
                      placeholder="Give your image a title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your build..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={1000}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadMutation.isPending}
                    className="w-full"
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : images && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden group">
                <div 
                  className="aspect-video relative overflow-hidden bg-muted cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(images.indexOf(image));
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={image.s3Url}
                    alt={image.title || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base">{image.title || "Untitled"}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {image.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                  
                  {/* Discord Reactions */}
                  {image.discordReactions && (() => {
                    try {
                      const reactions = JSON.parse(image.discordReactions);
                      if (reactions.length > 0) {
                        return (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {reactions.map((reaction: { emoji: string; count: number }, idx: number) => (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-sm"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-xs font-medium">{reaction.count}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    } catch (e) {
                      return null;
                    }
                    return null;
                  })()}
                  
                  {/* Admin controls */}
                  {isAuthenticated && (
                    <div className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(image.id)}
                        disabled={deleteMutation.isPending}
                        className="h-7 px-2 text-xs"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No images in the gallery yet
            </p>
            {isAuthenticated && (
              <p className="text-muted-foreground">
                Be the first to share your builds!
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Image Lightbox */}
      {images && images.length > 0 && lightboxOpen && (
        <ImageLightbox
          images={images.map(img => img.s3Url)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
        />
      )}
    </div>
  );
}
