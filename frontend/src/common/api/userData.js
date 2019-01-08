const userData = axios => async () => {
  const {
    data: { data },
  } = await axios.get("/api/user_data");

  return data;
};

export default userData;
