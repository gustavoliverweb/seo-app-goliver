import { useSortable } from "@dnd-kit/sortable";
import { CldImage } from "next-cloudinary";
import { CSS } from "@dnd-kit/utilities";
import { SemrushImages } from "@/app/lib/definitions";

export default function SemrushImage({
  image,
  id,
}: {
  image: SemrushImages;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="border border-gray-200 rounded-md overflow-hidden"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CldImage
        className="h-full object-contain"
        width="240"
        height="320"
        src={image.url}
        sizes="100vw"
        alt="Description of my image"
      />
    </div>
  );
}
