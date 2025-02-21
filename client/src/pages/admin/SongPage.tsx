import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import FormInputFile from "@/components/forms/FormInputFile";
import { FormInput, FormSelect } from "@/components/forms"; // Assuming FormSelect is defined
import { Button } from "@/components/ui/button";
import { apiCreateSong } from "@/apis/song";

const MAX_MB = 10;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png", "image/jpeg"];
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg"];
const createSongValidator = z.object({
  title: z.string({ required_error: "title is required." }).min(1, { message: "title is required." }),
  imageUrl: z.instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Maximum upload size is ${MAX_MB}MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, and .png images are accepted."),
  audioUrl: z.instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Maximum upload size is ${MAX_MB}MB.`)
    .refine((file) => ACCEPTED_AUDIO_TYPES.includes(file.type), "Only .mp3 audio files are accepted."),
  duration: z.string({ required_error: "duration is required." }),
  isExplicit: z.boolean({ required_error: "isExplicit is required." }),
  type: z.enum(['song', 'podcast'], { required_error: "Choose song or podcast" }).default('song'),
  artists: z.array(z.string()).refine((value) => value.some((item) => item), { message: "Select at least one item." }),
  albums: z.string({ required_error: "albums is required." }).min(1, { message: "albums is required." }),
});

type CreateSongFormValues = z.infer<typeof createSongValidator>;

const SongPage = () => {
  const form = useForm<CreateSongFormValues>({
    resolver: zodResolver(createSongValidator),
    defaultValues: {
      title: "",
      imageUrl: new File([], ""),
      audioUrl: new File([], ""),
      duration: "0",
      isExplicit: false,
      type: "song",
      artists: [],
      albums: "",
    },
  });

  function onSubmit(data: CreateSongFormValues) {
    console.log(data);
    const response = apiCreateSong(data);
    console.log('result: ', response);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col bg-white gap-4 px-6 pb-6">
        <FormInput
          form={form}
          name="title"
          placeholder="Add title"
          classInput="text-base text-black font-normal p-3 bg-[#FFFFFF1A] placeholder:text-[#818181] placeholder:text-base placeholder:font-medium"
        />
        <FormInputFile form={form} name="imageUrl" />
        <FormInputFile form={form} name="audioUrl" />
        <FormInput
          form={form}
          name="duration"
          type="number"
          placeholder="Add duration"
          classInput="text-base text-black font-normal p-3 bg-[#FFFFFF1A] placeholder:text-[#818181] placeholder:text-base placeholder:font-medium hover:border-white"
        />
        <FormSelect
          form={form}
          name="type"
          options={[
            { value: 'song', label: 'Song' },
            { value: 'podcast', label: 'Podcast' },
          ]}
          classSelect="text-base text-black p-3 bg-[#FFFFFF1A]"
        />
        <FormInput
          form={form}
          name="albums"
          classInput="text-base text-black font-normal p-3 bg-[#FFFFFF1A] placeholder:text-[#818181] placeholder:text-base placeholder:font-medium"
          placeholder="Album Name"
        />
        <FormSelect
          form={form}
          name="artists"
          options={[
            { value: '67b53c83ce8e01a03fdce3f7', label: 'James Arthur' },
            { value: '67b5497423c9c96f3eac0804', label: 'Bruno Mars' },
          ]}
          isMulti={true}
          classSelect="text-base text-black p-3 bg-[#FFFFFF1A]"
        />
        <FormInput
          form={form}
          type="checkbox"
          name="isExplicit"
          classInput="text-base text-black font-normal p-3 bg-[#FFFFFF1A] placeholder:text-[#818181] placeholder:text-base placeholder:font-medium"
          placeholder="isExplicit"
        />
        <div className="flex justify-end items-center">
          <Button type="submit" className="p-0">
            <span className="text-base text-black font-bold bg-white px-6 py-2 rounded-full">
              Save
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SongPage;