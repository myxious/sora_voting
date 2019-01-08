const login = axios => async invite => {
  const {
    data: { data },
  } = await axios.post("/api/login", { invite });

  return data;
};

export default login;
