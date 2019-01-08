const cancelVote = axios => async logoName => {
  const {
    data: { data },
  } = await axios.delete(`api/cancelVote/${logoName}`);

  return data;
};

export default cancelVote;
