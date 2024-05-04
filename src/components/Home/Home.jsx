import React from "react";
import Map from "../Map/Map";
// import ProfileSidebar from "../SideBar/ProfileSidebar";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
function Home() {
  
  return (
    <div>
      <Card>
        <CardBody>
      <Map />
      </CardBody>
      </Card>
    </div>
  );
}
export default Home;
