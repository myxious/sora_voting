const cancelVote = axios => async logoName => {
  const {
    data: { data },
  } = await axios.delete("/api/cancelVote", { logo_name: logoName });

  return data;
};

export default cancelVote;
