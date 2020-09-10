const util = {};

util.getHoveredStateData = (statewise, statecode) => {
  let stateInfo = null;
  try {
    stateInfo =
      statewise && statewise.find((state) => state.statecode === statecode);
    console.log("stateInfo ", stateInfo);
  } catch (e) {
    console.log("stateInfo err", e);
  }
  return stateInfo;
};

util.getLast7DaysData = (last7DaysData, status) => {
  const filteredData = last7DaysData.filter(
    (data) => data.status.toLowerCase() === status.toLowerCase()
  );
  return filteredData;
};

export default util;
