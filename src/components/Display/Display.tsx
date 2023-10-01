import DisplayStyles from "./Display.module.css";
import Sidebar from "../Sidebar/Sidebar";

import Recipe from "../Recipe/Recipe";

function Display() {
  return (
    <aside className={`${DisplayStyles.container} h-full max-h-full  flex items-center  rounded-br-xl`}>
      {/* sidebar */}
      <div className="md:w-1/3 h-full ">
        <Sidebar />
      </div>

      {/* show recipe */}
      <div className="xs:w-full md:w-2/3 h-full ">
        <Recipe />
      </div>
    </aside>
  );
}

export default Display;
