import { Button } from "../components/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import{Sidebar} from "../components/Sidebar"
import "../App.css";
import { CreatecComponent } from "../components/CreateComonent";
import { useState } from "react";

 export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return  <div>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreatecComponent open={modalOpen} onClose={()=>{
        setModalOpen(false);
      }} />
      <div className="flex justify-end gap-4">
        <Button
        onClick={()=>{
          setModalOpen(true);
        }}
          variant="primary"
          text="Add content"
          startIcon={<ShareIcon />}
        ></Button>
        <Button
          variant="secondary"
          text="share"
          startIcon={<PlusIcon />}
        ></Button>
      </div>
      <div className="flex gap-4">
        <Card
          type="twitter"
          link="https://x.com/narendramodi/status/1890238364932272234"
          title="modi ji tweet"
        />
        <Card
          type="youtube"
          link="https://www.youtube.com/watch?v=lBvbNxiVmZA"
          title="Baby i love you sooo much "
        />
      </div>
    </div>
</div> 
}
