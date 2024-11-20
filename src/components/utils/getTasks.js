import api from "../axios/api";

const getTasks = async () => {
    try {
      const response = await api.get(`task_tbl/pending-task`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
};

export default getTasks;