import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/stores/useMeStore";
import { Pen, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms";
import { UpdateUserData } from "@/utils/types";
import { apiUpdateUser } from "@/apis/user";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { updateProfileValidator } from "@/utils/validators";
import FormInputFile from "@/components/forms/FormInputFile";
import { z } from "zod";

interface ProfileUpdateDialogProps {
  triggerContent: React.ReactNode;
}

type ProfileFormValues = z.infer<typeof updateProfileValidator>;

const ProfileUpdateDialog = ({ triggerContent }: ProfileUpdateDialogProps) => {
  const { me, getMe } = useMeStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileValidator),
    defaultValues: {
      name: "",
      imageUrl: new File([], ""), // This can be adjusted based on your logic
    },
  });

  useEffect(() => {
    if (me) {
      form.reset({
        name: me.name || "",
        imageUrl: new File([], ""), // Adjust if needed
      });
    }
  }, [me, form]);

  const apiUpdateUserPromise = async (updateUser: UpdateUserData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        apiUpdateUser(updateUser)
          .then((response) => {
            if (response.data.success) {
              resolve({});
            } else {
              reject(new Error("Update user failed"));
            }
          })
          .catch((error) => reject(error));
      }, 1000);
    });
  };

  function onSubmit(data: ProfileFormValues) {
    toast.promise(apiUpdateUserPromise(data), {
      loading: "Updating...",
      success: () => {
        getMe();
        return "User updated successfully!";
      },
      error: (err) => err.message || "Update failed",
    });
  }

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("imageUrl", file);
    } else {
      setPreviewImage(null);
      form.setValue("imageUrl", new File([], ""));
    }
  };

  // Determine which image to display
  const displayImage =
    previewImage || (me?.imageUrl && me.imageUrl[me.imageUrl.length - 1]);

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className="w-[350px] md:w-[524px] bg-[#282828] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Profile details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-[180px_auto] md:grid-rows-[1fr_40px_32px_1fr] gap-4 px-6 pb-6"
          >
            <div className="size-36 md:size-[180px] relative group md:col-start-1 row-start-1 md:row-end-5">
              <div className="flex relative h-full">
                {displayImage ? (
                  <div className="w-full select-none">
                    <img
                      className="size-full object-cover object-center rounded-full"
                      src={displayImage}
                      alt={me?.name}
                      width={180}
                      height={180}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center rounded-full bg-[#282828] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                    <User
                      size={48}
                      className="text-[#b3b3b390] group-hover:hidden"
                    />
                  </div>
                )}
                <div className="hidden group-hover:block cursor-pointer w-full h-full absolute top-0 left-0 rounded-full bg-black/70">
                  <div className="flex flex-col h-full justify-center items-center gap-1">
                    <Pen size={48} />
                    <div onClick={handleUploadClick}>
                      <p className="text-base font-normal hover:underline">
                        Choose photo
                      </p>
                      <FormInputFile
                        inputRef={inputRef}
                        form={form}
                        name="imageUrl"
                        classInput="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative md:col-start-2 row-start-2">
              <FormInput
                form={form}
                name="name"
                placeholder="Add a display name"
                classInput="text-base font-normal p-3 bg-[#FFFFFF1A] placeholder:text-[#818181] placeholder:text-base placeholder:font-medium hover:border-white"
              />
            </div>
            <div className="flex justify-end items-center md:col-start-2 row-start-3">
              <Button type="submit" className="p-0">
                <span className="text-base text-black font-bold bg-white px-6 py-2 rounded-full">
                  Save
                </span>
              </Button>
            </div>
            <p className="col-start-1 col-end-3 row-start-5 font-bold text-[0.6875rem]">
              By proceeding, you agree to give HEthereal access to the image you
              choose to upload. Please make sure you have the right to upload
              the image.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateDialog;
