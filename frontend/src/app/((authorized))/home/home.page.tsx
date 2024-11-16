import AppBox from "@/components/common/app.box/app.box";
import GridTemplate from "@/components/common/templates/grid.template/grid.template";

export default function HomePage() {
  return (
    <main>
      <GridTemplate>
        <AppBox
          description="Add"
          heading={"Add"}
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
