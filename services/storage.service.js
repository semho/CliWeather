import { homedir } from "os";
import { join } from "path";

const saveKeyValue = (key, value) => {
  console.log(join(homedir(), "weather-data.json"));
};

export { saveKeyValue };
