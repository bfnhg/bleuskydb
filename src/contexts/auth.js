import axios from "axios";

import { JSON_API } from "../services/Constants";

const fetchUserAbilities = async (roles) => {
  try {
    const abilities = [];
    for (const role of roles) {
      const response = await axios.get(`${JSON_API}/accesses/role/${role.id}`);
      abilities.push(...response.data);
    }
    return abilities;
  } catch (error) {
    console.error("Error while fetching user abilities:", error);
    return [];
  }
};
