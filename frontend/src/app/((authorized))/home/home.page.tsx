'use client'
import { useHabitList } from "@/app/hooks/fetch/app";
import AppBox from "@/components/common/app.box/app.box";
import GridTemplate from "@/components/common/templates/grid.template/grid.template";

export default function HomePage() {
  const { data: habitList, isLoading: habitListLoading } = useHabitList({
   
  });
  return (
    <main>
      <GridTemplate>
        <AppBox
          description="Add new habit"
          heading={"Click here"}
          //value={data.value}
        />

        {
          Array.from({ length: 9 }, (_, index) => {
            return  <AppBox
            description="abc"
            heading={"Abc"}
            //value={data.value}
          />
          })
        }
      </GridTemplate>
    </main>
  );
}
