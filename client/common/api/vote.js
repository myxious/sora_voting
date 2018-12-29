const vote = axios => async (logoName, userVote) => {
  const {
    data: { data },
  } = await axios.post("/api/vote", { logo_name: logoName, vote: userVote });

  return data;
};

export default vote;
