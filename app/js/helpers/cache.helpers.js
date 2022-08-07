let mapStorage = "fence-estimator",
  mapStorageData = {};

// store paddocks data into session storage
export const storePaddocks = (mapElements) => {
  let fences = [];
  mapElements.forEach((element) => {
    const shape = {
      paths: element.getPath().getArray(),
      paddockIdx: element.paddockIdx,
      paddockName: element.paddockName,
      type: element.type,
    };

    fences.push(shape);
  });

  storeFenceEstimatorData({
    fences,
  });
};

export const initMapStorageData = () => {
  mapStorageData = JSON.parse(localStorage.getItem(mapStorage));
};

export const getMapStorageData = () => {
  initMapStorageData();

  return mapStorageData;
};

export const storeFenceEstimatorData = (data) => {
  if (data) {
    mapStorageData = {
      ...mapStorageData,
      ...data,
    };
  }

  localStorage.setItem(`${mapStorage}`, JSON.stringify(mapStorageData));
};

export const removeFenceEstimatorData = () => {
  localStorage.removeItem(mapStorage);
};
