import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "./contexts/ContextProvider";

export default function Surveys() {
  const { surveys } = useStateContext();
  console.log(surveys);

  const onDeleteClick = () => {
    console.log("on delete click");
  }

  return (
    <PageComponent title="Surveys" >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map(survey => (
          // key не нужно объявлять в пропсах SurveyListItem, потому что это уже предопределено в react
          <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
        ))}
      </div>
    </PageComponent>
  )
}
