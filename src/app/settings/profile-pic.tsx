import { ChangeEvent, useState } from "react";
import { UserAvatar } from "@/constants/icons";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { convertFileToUrl } from "@/lib";
import { useUpdateProfilePictureMutation } from "@/server/actions/profile";
import { Input } from "@/components/ui/input";
import Button from "@/components/reuseables/CustomButton";

function ProfilePic({ image }: { image?: string }) {
  const [_file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [updateProfilePicMutation] = useUpdateProfilePictureMutation();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;
    if (!["image/jpeg", "image/png", "image/svg+xml"].includes(selectedFile.type)) {
      toast.info("Please select a JPG, PNG, or SVG file.");
      return;
    }
    if (selectedFile.size > 4 * 1024 * 1024) {
      toast.info("File size must be less than 4MB.");
      return;
    }

    try {
      setIsUploading(true);
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("profile_picture", selectedFile);
      formData.append("_method", "PUT");

      await updateProfilePicMutation(formData).unwrap();
      setPreview(convertFileToUrl(selectedFile));

      toast.success("Profile picture updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload the profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", "");

      await updateProfilePicMutation(formData).unwrap();
      setPreview(null);
      setFile(null);

      toast.success("Profile picture deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete the profile picture.");
    }
  };

  const renderImage = () => {
    if (preview) {
      return (
        <div className="group relative size-22 sm:size-44 aspect-square rounded-2xl max-sm:mx-auto">
          <img
            src={preview!}
            alt="profile"
            className="object-cover size-full border border-border drop-shadow-xl"
          />
        </div>
      );
    }
    if (image) {
      return (
        <div className="group relative size-22 sm:size-44 aspect-square rounded-2xl max-sm:mx-auto">
          <img
            src={image!}
            alt="profile"
            className="object-cover size-full border border-border drop-shadow-xl"
          />
        </div>
      );
    }
    return (
      <div className="relative h-40 w-40">
        <UserAvatar className="w-fit h-full drop-shadow-xl" />
      </div>
    );
  };

  return (
    <div className="row-flex-start gap-6">
      {renderImage()}

      <div className="flex-column gap-2.5 !self-end mb-4">
        <Input
          id="uploadImage"
          type="file"
          accept="image/jpeg, image/png, image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
        />

        <Label
          htmlFor="uploadImage"
          className="cursor-pointer text-base text-center leading-4 border border-secondary py-2.5 text-secondary px-5 rounded-md"
        >
          <span className="font-semibold">{isUploading ? "Uploading..." : "Edit your Photo"}</span>
        </Label>

        {preview && <Button title="Delete" className="w-full" onClick={handleDelete} />}
      </div>
    </div>
  );
}

export default ProfilePic;
