import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  // verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import SemrushImage from "./semrushImage";
import { SemrushImages } from "@/app/lib/definitions";

// draggable structure
// context
// // draggable or sortable

let oldIndexSet = 0;
let newIndexSet = 0;
export default function WrapperSortableSemrushImages({
  semrushImages,
  reportId,
}: {
  semrushImages: SemrushImages[];
  reportId: string;
}) {
  const [orderData, setOrderData] = useState(semrushImages);
  const [orderObjects, setOrderObjects] = useState<SemrushImages[]>([]);
  const [isDrag, setIsdrag] = useState(false);
  useEffect(() => {
    setOrderData(semrushImages);
  }, [semrushImages]);

  useEffect(() => {
    console.log("use effect", orderData);
    const itemsChange = [];
    const itemsNotChange = [];
    for (let index = 0; index < semrushImages.length; index++) {
      const element = semrushImages[index];
      const element2 = orderData[index];
      if (element.id !== element2.id) {
        itemsChange.push(element2);
      } else {
        itemsNotChange.push(element);
      }
    }
    const setArray = itemsChange.map((item, index) => {
      if (oldIndexSet < newIndexSet) {
        return { ...item, position: oldIndexSet + index + 1 };
      } else {
        return { ...item, position: newIndexSet + index + 1 };
      }
    });
    const arrayMerge = [...setArray, ...itemsNotChange];
    setOrderObjects(arrayMerge);
  }, [orderData]);
  useEffect(() => {
    if (isDrag) {
      console.log("orderObjects", orderObjects);
      (async () => {
        await fetch(`/api/uploadSemrushToPostgres?reportId=${reportId}`, {
          method: "POST",
          body: JSON.stringify({ images: orderObjects }),
        });
      })();
      setIsdrag(false);
    }
  }, [orderObjects]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setIsdrag(true);
      setOrderData((items) => {
        const oldIndex = items
          .map((item) => item.id)
          .indexOf(active.id as string);
        const newIndex = items
          .map((item) => item.id)
          .indexOf(over?.id as string);
        console.log(oldIndex, newIndex);
        oldIndexSet = oldIndex;
        newIndexSet = newIndex;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderData}
        strategy={horizontalListSortingStrategy}
      >
        {orderData.length > 0 &&
          orderData.map((image) => (
            <SemrushImage key={image.id} image={image} id={image.id} />
          ))}
      </SortableContext>
    </DndContext>
  );
}
