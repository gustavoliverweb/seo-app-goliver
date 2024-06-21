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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PotentialCustomerCard } from "./potentialCustomerCard";
import { useEffect, useState } from "react";
import { Customer } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

// draggable structure
// context
// // draggable or sortable

let oldIndexSet = 0;
let newIndexSet = 0;
export default function WrapperSortable({
  itemsData,
}: {
  itemsData: Customer[];
}) {
  const [orderData, setOrderData] = useState(itemsData);
  const [orderObjects, setOrderObjects] = useState<Customer[]>([]);
  const router = useRouter();
  useEffect(() => {
    setOrderData(itemsData);
  }, [itemsData]);

  useEffect(() => {
    console.log("use effect", orderData);
    const itemsChange = [];
    for (let index = 0; index < itemsData.length; index++) {
      const element = itemsData[index];
      const element2 = orderData[index];
      if (element.id !== element2.id) {
        itemsChange.push(element2);
      }
    }
    const setArray = itemsChange.map((item, index) => {
      if (oldIndexSet < newIndexSet) {
        return { ...item, position: oldIndexSet + index + 1 };
      } else {
        return { ...item, position: newIndexSet + index + 1 };
      }
    });

    setOrderObjects(setArray);
  }, [orderData]);

  useEffect(() => {
    if (orderObjects.length > 0) {
      console.log("orderObjects", orderObjects);
      (async () => {
        const response = await fetch("/api/reorderData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderObjects),
        });
        console.log(response);
        router.push(`/dashboard/potential-customer`);
        router.refresh();
      })();
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
    console.log(active, over);
    if (active?.id !== over?.id) {
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
      <SortableContext items={orderData} strategy={verticalListSortingStrategy}>
        {orderData.length > 0 &&
          orderData.map((customer: Customer) => (
            <PotentialCustomerCard
              key={customer.id}
              customers={customer}
              id={customer.id}
            />
          ))}
      </SortableContext>
    </DndContext>
  );
}
