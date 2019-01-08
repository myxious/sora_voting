const logoList = axios => async () => {
  const {
    data: { data },
  } = await axios.get("/api/logoList");

  return data;
};

export default logoList;
