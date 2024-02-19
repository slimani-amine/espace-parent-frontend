import ExamsCardDetails from "../features/exams/ui/ExamsCardDetails";

interface ExamData {
  matiere: string;
  id: string;
  professor: string;
  endDate: string;
  examFileName: string;
  file: string;
  correctionFileName: string;
}
export default function ExamenDetails({ childId }: { childId: string }) {
  console.log("🚀 ~ ExamenDetails ~ childId:", childId);
  const examId = location.pathname.split("/")[4];
  //get exam details by examID
  const dummyData: ExamData = {
    matiere: "Mathematics",
    id: examId,
    professor: "Professeur A",
    endDate: "30/11/2021 20:30",
    examFileName: "Examen.pdf",
    correctionFileName: "correction.pdf",
    file: "",
  };
  return <ExamsCardDetails data={dummyData} />;
}
