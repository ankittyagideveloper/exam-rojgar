import { useNavigate } from "react-router-dom";
import RailwayMockTest from "../component/RailwayMockTest";
import { railwayMockData } from "../data/railwayMockData";

export default function RailwayMockTestPage() {
  const navigate = useNavigate();
  return <RailwayMockTest mockData={railwayMockData} onExit={() => navigate("/")} />;
}
